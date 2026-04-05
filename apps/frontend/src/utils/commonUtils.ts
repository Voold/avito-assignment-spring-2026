import type { Category, ItemParams } from "@/types";
import type { RequiredFieldType } from "@/types";

export const NUMERIC_FIELDS = [
  "yearOfManufacture",
  "mileage",
  "enginePower",
  "area",
  "floor",
] as const;
export const REQUIRED_FIELDS: RequiredFieldType[] = ["title", "price"];

export const createEmptyParams = (category: Category): ItemParams => {
  switch (category) {
    case "auto":
    case "real_estate":
    case "electronics":
    default:
      return {};
  }
};

export const normalizeParams = (params: ItemParams): ItemParams => {
  return NUMERIC_FIELDS.reduce(
    (acc, field) => {
      const value = acc[field as keyof ItemParams];
      if (typeof value === "string" && value !== "") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
          acc = { ...acc, [field]: parsed } as ItemParams;
        }
      }
      return acc;
    },
    { ...params } as ItemParams,
  );
};

export const validateField = (
  field: RequiredFieldType,
  value: unknown,
): string => {
  if (field === "category") return value ? "" : 'Не заполнено поле "Категория"';
  if (field === "title")
    return value && String(value).trim() ? "" : 'Не заполнено поле "Название"';
  if (field === "price") {
    return value !== undefined &&
      value !== null &&
      value !== "" &&
      !Number.isNaN(Number(value))
      ? ""
      : 'Не заполнено поле "Цена"';
  }
  return "";
};

export const calculateDescriptionDiff = (
  oldText: string,
  newText: string,
): string => {
  const oldWords = oldText.trim().split(/\s+/).filter(Boolean);
  const newWords = newText.trim().split(/\s+/).filter(Boolean);
  const wordsDiff = newWords.length - oldWords.length;
  const charDiff = newText.length - oldText.length;

  const parts: string[] = [];
  if (wordsDiff > 0) parts.push(`Добавлено ${wordsDiff} слов`);
  else if (wordsDiff < 0) parts.push(`Удалено ${Math.abs(wordsDiff)} слов`);

  if (charDiff > 0) parts.push(`+${charDiff} символов`);
  else if (charDiff < 0) parts.push(`${charDiff} символов`);

  return parts.length > 0 ? parts.join(", ") : "Без изменений";
};
