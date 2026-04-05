import { useState, useEffect } from "react";
import { Stack, Divider, Title, Flex, Button, Text } from "@mantine/core";
import {
  FormBasicInfoSection,
  FormDescriptionSection,
  FormCharacteristicsSection,
  FormCategorySection,
} from "@/components";
import { REQUIRED_FIELDS, validateField } from "@/utils";
import type { EditFormData, RequiredFieldType } from "@/types";

interface Props {
  // Добавляем ID объявления, чтобы разделять черновики разных товаров
  adId: string | number;
  initialData: EditFormData;
  onSave: (data: EditFormData) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export const EditProductForm = ({
  adId,
  initialData,
  onSave,
  onCancel,
  isSaving,
}: Props) => {
  // 1. Формируем уникальный ключ для Local Storage
  const draftKey = `ad_edit_draft_${adId}`;

  // 2. Инициализируем стейт. Если в LocalStorage есть данные, берем их, иначе initialData
  const [formData, setFormData] = useState<EditFormData>(() => {
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        // Склеиваем initialData и сохраненный черновик на случай,
        // если в схеме появились новые обязательные поля
        return { ...initialData, ...JSON.parse(savedDraft) };
      }
    } catch (error) {
      console.error("Ошибка при чтении черновика из LocalStorage:", error);
    }
    return initialData;
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [descriptionDiff, setDescriptionDiff] = useState<string>("");

  // 3. Сохраняем любое изменение formData в Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(formData));
    } catch (error) {
      console.error("Ошибка при сохранении черновика:", error);
    }
  }, [formData, draftKey]);

  const handleFieldBlur = (field: RequiredFieldType) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const getFieldError = (field: RequiredFieldType) =>
    touched[field] ? validateField(field, formData[field]) : "";

  const isFormValid = REQUIRED_FIELDS.every(
    (field) => !validateField(field, formData[field]),
  );

  // 4. Обертка над сохранением: чистим сторадж и отправляем данные
  const handleSaveClick = () => {
    localStorage.removeItem(draftKey);
    onSave(formData);
  };

  return (
    <Stack h="100%" maw={1039} gap={18} style={{ margin: "32px auto" }}>
      <Title
        order={1}
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 500,
          fontSize: "30px",
          lineHeight: "40px",
          marginBottom: "-4px",
        }}
      >
        Редактирование объявления
      </Title>

      <FormCategorySection
        formData={formData}
        setFormData={setFormData}
        error={getFieldError("category")}
        onBlur={handleFieldBlur}
      />

      <Divider color="#E0E0E0" mb={-4} />

      <FormBasicInfoSection
        formData={formData}
        setFormData={setFormData}
        setTouched={setTouched}
        getError={getFieldError}
        onBlur={handleFieldBlur}
      />

      <Divider color="#E0E0E0" />

      {formData.category && (
        <>
          <Stack gap={8}>
            <Text
              style={{
                fontFamily: "inherit",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                marginBottom: "2px",
              }}
            >
              Характеристики
            </Text>
            <FormCharacteristicsSection
              category={formData.category}
              params={formData.params}
              onChange={(params) => setFormData({ ...formData, params })}
            />
          </Stack>
          <Divider color="#E0E0E0" />
        </>
      )}

      <FormDescriptionSection
        formData={formData}
        setFormData={setFormData}
        originalDescription={initialData.description}
        diffTooltip={descriptionDiff}
        setDiffTooltip={setDescriptionDiff}
      />

      <Flex gap={6} mt={16}>
        <Button
          color="blue"
          loading={isSaving}
          onClick={handleSaveClick} // Используем новую функцию
          disabled={!isFormValid || isSaving}
          style={{
            height: "40px",
            fontSize: "16px",
            fontWeight: 400,
            padding: "0 12px",
          }}
        >
          Сохранить
        </Button>
        <Button
          color="gray"
          variant="light"
          onClick={onCancel} // При отмене LocalStorage остается нетронутым
          disabled={isSaving}
          style={{ height: "40px", fontSize: "16px", fontWeight: 400 }}
        >
          Отменить
        </Button>
      </Flex>
    </Stack>
  );
};
