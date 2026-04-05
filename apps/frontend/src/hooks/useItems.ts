import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemsService } from "@/api/items.service";
import { useFiltersStore } from "@/store/useFiltersStore";
import type { ItemUpdateIn, Item } from "@/types";

// Хук для получения списка
export const useItemsList = () => {
  // Подписываемся на параметры из Zustand
  const params = useFiltersStore((state) => state.params);

  return useQuery({
    queryKey: ["items", params],
    // queryFn принимает объект, из которого мы достаем signal
    queryFn: ({ signal }) => itemsService.getAll(params, signal),
  });
};

// Хук для получения одного элемента
type ItemDetailsQueryOptions = {
  enabled?: boolean;
  onSuccess?: (data: Item) => void;
  [key: string]: unknown;
};

export const useItemDetails = (
  id: number,
  options?: ItemDetailsQueryOptions,
) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: ({ signal }) => itemsService.getById(id, signal),
    enabled: options?.enabled ?? !!id,
    ...options,
  });
};

// Хук для обновления элемента
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ItemUpdateIn }) =>
      itemsService.update(id, payload),
    onSuccess: (_, variables) => {
      // Инвалидируем кэш после успешного апдейта, чтобы данные обновились
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", variables.id] });
    },
  });
};
