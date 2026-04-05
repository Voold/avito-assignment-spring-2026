import {
  Portal,
  Paper,
  Stack,
  Text,
  Group,
  TextInput,
  ActionIcon,
  Loader,
  ScrollArea,
  CloseButton,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { useAiChatStore } from "@/store/useAiChatStore";
import { aiService } from "@/api/ai.service";

const AiChatModal = () => {
  const {
    isOpen,
    closeChat,
    messages,
    addMessage,
    setMessages,
    isLoading,
    setLoading,
  } = useAiChatStore();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const hiddenInstructionText =
    "Отвечай без markdown, без эмодзи, без заголовков и без разметки. " +
    "Не используй смайлики, не применяй специальное форматирование и не вставляй символы типа `**`, `##`, `*`. " +
    "Пиши только чистый текст, серьезно и продающе.";

  const hasHiddenInstruction =
    messages.length > 0 && messages[0].content === hiddenInstructionText;

  const visibleMessages = hasHiddenInstruction ? messages.slice(1) : messages;

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg = { role: "user" as const, content: inputValue };
    setInputValue("");
    setLoading(true);

    const hiddenInstruction: typeof newUserMsg = {
      role: "user",
      content: hiddenInstructionText,
    };

    const contextToSend = hasHiddenInstruction
      ? [...messages, newUserMsg]
      : [hiddenInstruction, ...messages, newUserMsg];

    if (!hasHiddenInstruction) {
      setMessages([hiddenInstruction, ...messages, newUserMsg]);
    } else {
      addMessage(newUserMsg);
    }

    try {
      const response = await aiService.send(contextToSend);
      addMessage(response);
    } catch (error) {
      console.error(error);
      addMessage({
        role: "assistant",
        content: "Произошла ошибка при обращении к AI.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <Paper
        shadow="xl"
        radius="lg"
        withBorder
        p={0}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 360,
          height: 480,
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Group justify="apart" align="center" px="md" py="sm" wrap="nowrap">
          <Stack gap={2}>
            <Text size="sm" fw={600}>
              Ассистент GigaChat
            </Text>
            <Text size="xs" color="dimmed">
              История запросов сохранена
            </Text>
          </Stack>
          <CloseButton onClick={closeChat} size="sm" />
        </Group>

        <ScrollArea style={{ flex: 1 }} p="md" viewportRef={scrollRef}>
          <Stack gap="sm">
            {visibleMessages.map((msg, idx) => (
              <Group
                key={idx}
                justify={msg.role === "user" ? "flex-end" : "flex-start"}
                align="flex-start"
                wrap="nowrap"
              >
                <Paper
                  p="sm"
                  radius="lg"
                  bg={msg.role === "user" ? "blue.6" : "gray.1"}
                  c={msg.role === "user" ? "white" : "black"}
                  style={{ maxWidth: "85%" }}
                >
                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </Text>
                </Paper>
              </Group>
            ))}
            {isLoading && (
              <Group justify="flex-start">
                <Loader size="sm" variant="dots" />
              </Group>
            )}
          </Stack>
        </ScrollArea>

        <Paper withBorder p="sm" style={{ borderTop: "1px solid #eee" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <TextInput
              placeholder="Спросить что-то еще..."
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              disabled={isLoading}
              rightSection={
                <ActionIcon
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  color="blue"
                >
                  <IconSend size={16} />
                </ActionIcon>
              }
            />
          </form>
        </Paper>
      </Paper>
    </Portal>
  );
};

export default AiChatModal;
