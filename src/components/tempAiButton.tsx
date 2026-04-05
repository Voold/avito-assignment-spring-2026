import { aiService } from "@/api/ai.service";
import { useAiChatStore } from "@/store/useAiChatStore";
import { Button } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";

const tempAiButton = () => {
  const { setMessages, openChat, messages } = useAiChatStore();

  const handleGenerateByTemplate = async () => {
    const fieldsData = { title: "iPhone 15", category: "Смартфоны" }; // Данные из твоей формы

    const initialPrompt = `Напиши красивое описание для объявления. Название: ${fieldsData.title}, Категория: ${fieldsData.category}`;

    const initialContext = [{ role: "user" as const, content: initialPrompt }];

    try {
      // 1. Показываем лоадер где-то в UI (можно локальный стейт)
      const aiResponse = await aiService.send(initialContext);

      // 2. Сохраняем и запрос, и ответ в Zustand
      setMessages([
        ...initialContext,
        aiResponse, // { role: 'assistant', content: '...' }
      ]);

      console.log(aiResponse.content);
    } catch {
      console.error("Ошибка генерации");
    }
  };

  return (
    <Button
      onClick={handleGenerateByTemplate}
      variant="light"
      color="orange"
      leftSection={<IconBulb size={18} />}
      style={{
        height: "32px",
        backgroundColor: "rgba(255, 146, 0, 0.1)",
        color: "#FF9200",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        fontSize: "14px",
      }}
    >
      Узнать рыночную цену
    </Button>
  );
};

export default tempAiButton;
