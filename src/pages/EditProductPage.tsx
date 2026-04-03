import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Divider,
  Select,
  TextInput,
  Textarea,
  Button,
  Flex,
  Title,
  Text,
  CloseButton,
  Center,
  Loader,
} from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";
import { useItemDetails, useUpdateItem } from "@/hooks/useItems";
import type { ItemUpdateIn } from "@/types";

export const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const { data, isLoading } = useItemDetails(numericId);
  const updateMutation = useUpdateItem();

  const [formData, setFormData] = useState<ItemUpdateIn | null>(null);

  // Когда данные прилетели с бэка, инициализируем форму
  useEffect(() => {
    if (data) {
      setFormData({
        category: data.category,
        title: data.title,
        description: data.description || "",
        price: data.price,
        params: data.params,
      });
    }
  }, [data]);

  const handleSave = () => {
    if (formData && numericId) {
      updateMutation.mutate(
        { id: numericId, payload: formData },
        {
          onSuccess: () => navigate(-1), // Возвращаемся назад при успехе
        },
      );
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const labelStyles = {
    fontFamily: "inherit",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "140%",
    marginBottom: "8px",
  };

  const subLabelStyles = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "22px",
    marginBottom: "8px",
  };

  const inputStyles = {
    width: "456px",
    height: "32px",
    minHeight: "32px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  };

  if (isLoading || !formData) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Stack
      mx="auto"
      p="md"
      h="100%"
      gap={18}
      style={{ maxWidth: "942px", paddingBottom: "40px" }}
    >
      <Title
        order={1}
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          lineHeight: "40px",
        }}
      >
        Редактирование объявления
      </Title>

      <Select
        label="Категория"
        placeholder="Выберите категорию"
        data={[
          { value: "electronics", label: "Электроника" },
          { value: "auto", label: "Авто" },
          { value: "real_estate", label: "Недвижимость" },
        ]}
        value={formData.category}
        onChange={(val) => setFormData({ ...formData, category: val as any })}
        styles={{ label: labelStyles, input: inputStyles }}
      />

      <Divider color="#E0E0E0" />

      <TextInput
        withAsterisk
        label="Название"
        placeholder="Название товара"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        rightSection={
          <CloseButton
            size="sm"
            onClick={() => setFormData({ ...formData, title: "" })}
            style={{ display: formData.title ? "block" : "none" }}
          />
        }
        styles={{ label: labelStyles, input: inputStyles }}
      />

      <Divider color="#E0E0E0" />

      <Flex align="flex-end" gap={16}>
        <TextInput
          withAsterisk
          label="Цена"
          type="number"
          placeholder="Введите цену"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          styles={{ label: labelStyles, input: inputStyles }}
        />
        <Button
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
      </Flex>

      <Divider color="#E0E0E0" />

      <Stack gap={18}>
        <Text style={labelStyles}>Характеристики</Text>
        <Stack gap={8}>
          {/* Пример характеристик для Электроники. Логику отображения инпутов можно завязать на formData.category */}
          <Select
            label="Тип"
            data={["phone", "laptop", "misc"]}
            value={(formData.params as any).type || ""}
            onChange={(val) =>
              setFormData({
                ...formData,
                params: { ...formData.params, type: val },
              })
            }
            styles={{ label: subLabelStyles, input: inputStyles }}
          />
          <TextInput
            label="Бренд"
            value={(formData.params as any).brand || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                params: { ...formData.params, brand: e.target.value },
              })
            }
            styles={{ label: subLabelStyles, input: inputStyles }}
          />
          <TextInput
            label="Модель"
            value={(formData.params as any).model || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                params: { ...formData.params, model: e.target.value },
              })
            }
            styles={{ label: subLabelStyles, input: inputStyles }}
          />
        </Stack>
      </Stack>

      <Divider color="#E0E0E0" />

      <Stack gap={18} align="flex-start">
        <Textarea
          label="Описание"
          placeholder="Опишите товар подробнее..."
          minRows={5}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          styles={{
            label: labelStyles,
            input: { ...inputStyles, height: "auto" },
          }}
        />
        <Button
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
          Улучшить описание
        </Button>
      </Stack>

      <Flex gap={16} mt={8}>
        <Button
          color="blue"
          loading={updateMutation.isPending} // Показываем лоадер при сохранении
          onClick={handleSave}
          style={{ height: "40px", fontSize: "16px", fontWeight: 400 }}
        >
          Сохранить
        </Button>
        <Button
          color="gray"
          variant="light"
          onClick={handleCancel}
          disabled={updateMutation.isPending}
          style={{ height: "40px", fontSize: "16px", fontWeight: 400 }}
        >
          Отменить
        </Button>
      </Flex>
    </Stack>
  );
};
