import type { DropDownItemType } from "@/types";

export const SORT_DATA: DropDownItemType[] = [
  { value: "new", label: "По новизне (сначала новые)" },
  { value: "old", label: "По новизне (сначала старые)" },
  { value: "minCost", label: "По цене (сначала дешевле)" },
  { value: "maxCost", label: "По цене (сначала дороже)" },
  { value: "alphabit", label: "По алфавиту (А -> Я)" },
  { value: "revAlphabit", label: "По алфавиту (Я -> A)" },
];

export const FILTER_CATEGORIES: DropDownItemType[] = [
  { value: "auto", label: "Авто" },
  { value: "electronics", label: "Электроника" },
  { value: "real_estate", label: "Недвижимость" },
];

export const SORT_MAPPING: Record<
  string,
  { sortColumn: "title" | "createdAt" | "price"; sortDirection: "asc" | "desc" }
> = {
  new: { sortColumn: "createdAt", sortDirection: "desc" },
  old: { sortColumn: "createdAt", sortDirection: "asc" },
  minCost: { sortColumn: "price", sortDirection: "asc" },
  maxCost: { sortColumn: "price", sortDirection: "desc" },
  alphabit: { sortColumn: "title", sortDirection: "asc" },
  revAlphabit: { sortColumn: "title", sortDirection: "desc" },
};

export const CATEGORIES: DropDownItemType[] = [
  { value: "electronics", label: "Электроника" },
  { value: "auto", label: "Авто" },
  { value: "real_estate", label: "Недвижимость" },
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
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Прочее",
};

export const CATEGORY_MAP: Record<string, string> = {
  auto: "Авто",
  electronics: "Электроника",
  real_estate: "Недвижимость",
};

export const NUMBER_FIELDS = [
  "yearOfManufacture",
  "mileage",
  "enginePower",
  "area",
  "floor",
];

export const FIELD_OPTIONS = {
  transmission: [
    { value: "automatic", label: "Автомат" },
    { value: "manual", label: "Механика" },
  ],
  condition: [
    { value: "new", label: "Новое" },
    { value: "used", label: "Б/У" },
  ],
  type: {
    electronics: [
      { value: "phone", label: "Телефон" },
      { value: "laptop", label: "Ноутбук" },
      { value: "misc", label: "Прочее" },
    ],
    real_estate: [
      { value: "flat", label: "Квартира" },
      { value: "house", label: "Дом" },
      { value: "room", label: "Комната" },
    ],
  },
} as const;
