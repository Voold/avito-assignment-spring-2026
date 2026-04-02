import type { DropDownItem } from "@/types";

export const sortData: DropDownItem[] = [
  { value: "new", label: "По новизне (сначала новые)" },
  { value: "old", label: "По новизне (сначала старые)" },
  { value: "minCost", label: "По цене (сначала дешевле)" },
  { value: "maxCost", label: "По цене (сначала дороже)" },
  { value: "alphabit", label: "По алфавиту (А -> Я)" },
  { value: "revAlphabit", label: "По алфавиту (Я -> A)" },
];
