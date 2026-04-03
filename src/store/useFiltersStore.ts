import { create } from "zustand";
import type { GetItemsQueryParams } from "@/types";

interface FiltersState {
  params: GetItemsQueryParams;
  setParams: (newParams: Partial<GetItemsQueryParams>) => void;
  resetParams: () => void;
}

const defaultParams: GetItemsQueryParams = {
  limit: 10,
  skip: 0,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  params: defaultParams,
  setParams: (newParams) =>
    set((state) => ({ params: { ...state.params, ...newParams } })),
  resetParams: () => set({ params: defaultParams }),
}));
