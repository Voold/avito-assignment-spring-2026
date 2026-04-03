import type { DropDownItemType } from "@/types";

export const sortData: DropDownItemType[] = [
  { value: "new", label: "По новизне (сначала новые)" },
  { value: "old", label: "По новизне (сначала старые)" },
  { value: "minCost", label: "По цене (сначала дешевле)" },
  { value: "maxCost", label: "По цене (сначала дороже)" },
  { value: "alphabit", label: "По алфавиту (А -> Я)" },
  { value: "revAlphabit", label: "По алфавиту (Я -> A)" },
];

export const CATEGORY_FIELDS: Record<string, string[]> = {
  auto: [
    "brand",
    "model",
    "yearOfManufacture",
    "transmission",
    "mileage",
    "enginePower",
  ],
  real_estate: ["type", "address", "area", "floor"],
  electronics: ["type", "brand", "model", "condition", "color"],
};

export const LABEL_MAP: Record<string, string> = {
  brand: "Бренд",
  model: "Модель",
  yearOfManufacture: "Год выпуска",
  transmission: "КПП",
  mileage: "Пробег",
  enginePower: "Мощность",
  type: "Тип",
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
  condition: "Состояние",
  color: "Цвет",
  automatic: "Автомат",
  manual: "Механика",
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
  new: "Новое",
  used: "Б/У",
};

export const CATEGORY_MAP: Record<string, string> = {
  auto: "Авто",
  electronics: "Электроника",
  real_estate: "Недвижимость",
};
