import type { Dispatch, SetStateAction } from "react";
import type { EditFormData, RequiredFieldType } from "@/types";
import RequiredDropDown from "../FormItems/RequiredDropDown";
import { CATEGORIES } from "@/config";

interface Props {
  formData: EditFormData;
  setFormData: Dispatch<SetStateAction<EditFormData>>;
  error?: string;
  onBlur: (field: RequiredFieldType) => void;
}

export const FormCategorySection = ({
  formData,
  setFormData,
  error,
  onBlur,
}: Props) => {
  return (
    <RequiredDropDown
      fieldName="category"
      title="Категория"
      placeholder="Выберите категорию"
      formData={formData}
      setFormData={setFormData}
      getError={() => error || ""}
      onBlur={onBlur}
      selectorData={CATEGORIES}
    />
  );
};
