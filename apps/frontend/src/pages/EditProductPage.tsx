// src/pages/EditProductPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Center, Loader, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

import { useItemDetails, useUpdateItem } from "@/hooks/useItems";
import { EditProductForm } from "@/components/UI/EditProductForm";
import { normalizeParams } from "@/utils";
import type { Category, EditFormData } from "@/types";

export const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);

  const { data, isLoading, isError } = useItemDetails(numericId, {
    enabled: !!numericId,
  });
  const updateMutation = useUpdateItem();

  const handleSave = (finalData: EditFormData) => {
    updateMutation.mutate(
      {
        id: numericId,
        payload: {
          ...finalData,
          category: finalData.category as Category,
          price: Number(finalData.price),
          params: normalizeParams(finalData.params),
        },
      },
      {
        onSuccess: () => {
          showNotification({
            title: "Изменения сохранены",
            message: "",
            color: "green",
            icon: <IconCheck size={14} />,
            autoClose: 5000,
            radius: "md",
            position: "top-right",
          });
          navigate(`/ads/${numericId}`);
        },
        onError: () => {
          showNotification({
            title: "Ошибка сохранения",
            message:
              "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
            color: "red",
            icon: <IconX size={24} />,
            autoClose: 7000,
            radius: "md",
            position: "top-right",
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (isError || !data) {
    return (
      <Center h="100vh">
        <Text>Не удалось загрузить объявление для редактирования.</Text>
      </Center>
    );
  }

  const initialData: EditFormData = {
    category: data.category,
    title: data.title,
    description: data.description || "",
    price: data.price,
    params: normalizeParams(data.params),
  };

  return (
    <EditProductForm
      adId={numericId}
      initialData={initialData}
      onSave={handleSave}
      onCancel={() => navigate(-1)}
      isSaving={updateMutation.isPending}
    />
  );
};
