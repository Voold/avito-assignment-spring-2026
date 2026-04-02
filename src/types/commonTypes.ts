export interface DropDownItemType {
  value: string;
  label: string;
}

export interface CardItemType {
  id: string;
  title: string;
  price: string;
  category: string;
  needsWork: boolean;
  image: null | string;
}

export interface PaginationType {
  total: number;
  page: number;
  onChange: (page: number) => void;
}