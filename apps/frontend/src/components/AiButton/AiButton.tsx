import { useState } from "react";
import { aiService } from "@/api/ai.service";
import { useAiChatStore } from "@/store/useAiChatStore";
import type { AiMessage } from "@/store/useAiChatStore";
import {
  Button,
  Popover,
  Text,
  Stack,
  Group,
  ActionIcon,
  Tooltip,
  Loader,
} from "@mantine/core";
import { IconBulb, IconReload, IconMessageCircle } from "@tabler/icons-react";

import classes from "./AiButton.module.css";

type RequestStatus = "idle" | "loading" | "error";
type AiButtonMode = "price" | "description";

type AiButtonProps = {
  mode?: AiButtonMode;
  title?: string;
  category?: string;
  description?: string;
  price?: number | string;
  params?: Record<string, unknown>;
  onApply?: (result: { price?: number; description?: string }) => void;
};

const AiButton = ({
  mode = "price",
  title,
  category,
  description,
  price,
  params,
  onApply,
}: AiButtonProps) => {
  const { messages, setMessages, openChat } = useAiChatStore();

  const [status, setStatus] = useState<RequestStatus>("idle");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [latestResponse, setLatestResponse] = useState<string>("");
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const buildProductInfo = () => {
    const lines: string[] = [];

    if (title) {
      lines.push(`Название: ${title}`);
    }
    if (category) {
      lines.push(`Категория: ${category}`);
    }
    if (price !== undefined && price !== null && price !== "") {
      lines.push(`Текущая цена: ${price}`);
    }
    if (description) {
      lines.push(`Описание: ${description}`);
    }
    if (params && Object.keys(params).length > 0) {
      const paramsDescription = Object.entries(params)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
      lines.push(`Характеристики: ${paramsDescription}`);
    }

    return lines.join("\n");
  };

  const getRequestAction = () => {
    if (mode === "description") {
      return description?.trim() ? "Улучшить описание" : "Придумать описание";
    }

    return "Узнать рыночную стоимость";
  };

  const hiddenInstructionText =
    "Отвечай без markdown, без эмодзи, без заголовков и без разметки. " +
    "Пиши только чистый текст. Не используй `**`, `##`, `*`, списки, таблицы или маркеры. " +
    "Формулируй ответ серьезно, продающе и компактно.";

  const getInitialPrompt = () => {
    const productInfo = buildProductInfo();
    const action = getRequestAction();

    if (mode === "price") {
      return `${action}.
${productInfo}

Ответь по шаблону:
Средняя цена на {название}:
xxx – xxx ₽ — отличное состояние.
От xxx ₽ — идеал, малый износ АКБ.
xxx – xxx ₽ — срочно или с дефектами.

В конце напиши одно число — цену, которую стоит установить исходя из переданных параметров.`;
    }

    return `${action}.
${productInfo}

Ответь как полноценный текст описания товара без каких-либо заголовков, форматирования или markdown.`;
  };

  const parsePriceFromResponse = (text: string) => {
    const matches = Array.from(text.matchAll(/(\d[\d\s]*)/g)).map((match) =>
      match[1].replace(/\s/g, ""),
    );

    if (!matches.length) {
      return null;
    }

    const lastValue = matches[matches.length - 1];
    const parsed = Number(lastValue);

    return Number.isNaN(parsed) ? null : parsed;
  };

  const handleGenerateByTemplate = async () => {
    if (status === "loading") return;

    setStatus("loading");
    setHasBeenClicked(true);
    setIsPopoverOpen(false);

    const prompt = getInitialPrompt();
    const initialContext: AiMessage[] = [
      { role: "user", content: hiddenInstructionText },
      { role: "user", content: prompt },
    ];

    try {
      const aiResponse = await aiService.send(initialContext);

      setMessages([...messages, aiResponse]);
      setLatestResponse(aiResponse.content);
      setStatus("idle");
      setIsPopoverOpen(true);
    } catch (error) {
      console.error("Ошибка генерации", error);
      setStatus("error");
      setIsPopoverOpen(true);
    }
  };

  const handleApply = () => {
    const result: { price?: number; description?: string } = {};

    if (mode === "price") {
      const parsedPrice = parsePriceFromResponse(latestResponse);
      if (parsedPrice !== null) {
        result.price = parsedPrice;
      }
    } else {
      result.description = latestResponse;
    }

    if (onApply && Object.keys(result).length > 0) {
      onApply(result);
    }

    setIsPopoverOpen(false);
  };

  const handleOpenChat = () => {
    setIsPopoverOpen(false);
    openChat();
  };

  const getButtonProps = () => {
    if (status === "loading") {
      return {
        text: "Выполняется запрос",
        icon: <Loader size={18} color="#FF9200" />,
      };
    }

    // Если была ошибка ИЛИ кнопка уже успешно нажималась ранее
    if (status === "error" || hasBeenClicked) {
      return {
        text: "Повторить запрос",
        icon: <IconReload size={18} />,
      };
    }

    // Состояние по умолчанию (до первого клика)
    return {
      text:
        mode === "description"
          ? description?.trim()
            ? "Улучшить описание"
            : "Придумать описание"
          : "Узнать рыночную цену",
      icon: <IconBulb size={18} />,
    };
  };

  const buttonProps = getButtonProps();

  return (
    <Popover
      opened={isPopoverOpen}
      onChange={setIsPopoverOpen}
      position="bottom-start"
      withArrow
      shadow="md"
      trapFocus
    >
      <Popover.Target>
        <Button
          onClick={handleGenerateByTemplate}
          variant="light"
          color="orange"
          leftSection={buttonProps.icon}
          style={{
            height: "32px",
            width: "fit-content",
            backgroundColor: "rgba(255, 146, 0, 0.1)",
            color: "#FF9200",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
          type="button"
        >
          {buttonProps.text}
        </Button>
      </Popover.Target>

      <Popover.Dropdown className={classes.popover}>
        {status === "error" ? (
          <Stack gap={8}>
            <Text className={classes.errorTitle}>
              Произошла ошибка при запросе к AI
            </Text>
            <Text className={classes.errorText}>
              Попробуйте повторить запрос или закройте уведомление
            </Text>
            <Group justify="flex-start" mt={8}>
              <Button
                variant="subtle"
                color="gray"
                size="sm"
                h={32}
                onClick={() => setIsPopoverOpen(false)}
              >
                Закрыть
              </Button>
            </Group>
          </Stack>
        ) : (
          <Stack gap={12}>
            <Text className={classes.successTitle}>Ответ AI:</Text>
            <Text className={classes.textContent}>{latestResponse}</Text>
            <Group justify="space-between" mt={4} wrap="nowrap">
              <Group gap={8}>
                <Button size="sm" h={32} onClick={handleApply}>
                  Применить
                </Button>
                <Button
                  size="sm"
                  h={32}
                  variant="subtle"
                  color="gray"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  Закрыть
                </Button>
              </Group>
              <Tooltip label="Перейти к чату" position="top" withArrow>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size={32}
                  onClick={handleOpenChat}
                >
                  <IconMessageCircle size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

export default AiButton;
