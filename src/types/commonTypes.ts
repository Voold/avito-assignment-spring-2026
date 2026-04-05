export interface PaginationType {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

export interface DropDownItemType {
  value: string;
  label: string;
}

export type Category = "auto" | "real_estate" | "electronics";

export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
};

export type RealEstateItemParams = {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicsItemParams = {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
};

export type ItemParams =
  | AutoItemParams
  | RealEstateItemParams
  | ElectronicsItemParams;

export interface Item {
  needsRevision: boolean;
  updatedAt: string;
  id: number;
  category: Category;
  title: string;
  price: number;
  description?: string;
  params: ItemParams;
  createdAt: string;
}

export interface ItemsGetOut {
  needsRevision: boolean;
  items: (Item & { needsRevision: boolean })[];
  total: number;
}

export interface ItemUpdateIn {
  category: Category;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
}

export interface GetItemsQueryParams {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: string; // Передаем через запятую
  sortColumn?: "title" | "createdAt" | "price";
  sortDirection?: "asc" | "desc";
}

export type EditFormData = Omit<ItemUpdateIn, "price" | "category"> & {
  price?: number | string;
  category?: Category | "";
};

export type RequiredFieldType = "category" | "title" | "price";
