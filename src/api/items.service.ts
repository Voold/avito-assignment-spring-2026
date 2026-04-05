import { api } from "./instance";
import { ENDPOINTS } from "@/config/";
import type {
  Item,
  ItemsGetOut,
  ItemUpdateIn,
  GetItemsQueryParams,
} from "@/types";

export const itemsService = {
  getAll: async (params?: GetItemsQueryParams, signal?: AbortSignal) => {
    const { data } = await api.get<ItemsGetOut>(ENDPOINTS.getItems(), {
      params,
      signal,
    });
    return data;
  },

  getById: async (id: number, signal?: AbortSignal) => {
    const { data } = await api.get<Item>(ENDPOINTS.getItem(id), {
      signal,
    });
    return data;
  },

  update: async (id: number, payload: ItemUpdateIn) => {
    const { data } = await api.put<Item>(ENDPOINTS.putItem(id), payload);
    return data;
  },
};
