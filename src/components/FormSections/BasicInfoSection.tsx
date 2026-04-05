import type { Dispatch, SetStateAction } from "react";
import { Divider, Flex } from "@mantine/core";
import AiButton from "@/components/AiButton/AiButton";
import type { EditFormData, RequiredFieldType } from "@/types";
import RequiredField from "../FormItems/RequiredField";

interface Props {
  formData: EditFormData;
  setFormData: Dispatch<SetStateAction<EditFormData>>;
  setTouched: Dispatch<SetStateAction<Record<string, boolean>>>;
  getError: (field: RequiredFieldType) => string;
  onBlur: (field: RequiredFieldType) => void;
}

export const FormBasicInfoSection = ({
  formData,
  setFormData,
  setTouched,
  getError,
  onBlur,
}: Props) => {
  return (
    <Flex gap={16} align="flex-start" wrap="wrap" direction="column">
      <RequiredField
        fieldName="title"
        title="Название"
        placeholder="Название товара"
        formData={formData}
        setFormData={setFormData}
        setTouched={setTouched}
        getError={getError}
        onBlur={onBlur}
      />

      <Divider color="#E0E0E0" mb={0} w="100%" />

      <Flex align="flex-end" gap={24}>
        <RequiredField
          fieldName="price"
          title="Цена"
          placeholder="Введите цену"
          type="number"
          formData={formData}
          setFormData={setFormData}
          setTouched={setTouched}
          getError={getError}
          onBlur={onBlur}
        />

        <AiButton
          mode="price"
          title={formData.title}
          category={formData.category}
          description={formData.description}
          price={formData.price}
          params={formData.params}
          onApply={(result) => {
            if (result.price !== undefined)
              setFormData({ ...formData, price: result.price });
          }}
        />
      </Flex>
    </Flex>
  );
};
