import type { Dispatch, SetStateAction } from "react";
import { Flex, Select } from "@mantine/core";

import { createEmptyParams } from "@/utils";
import type { Category, EditFormData, RequiredFieldType } from "@/types";
import { CustomAsterisk } from "./CustomAsterisk";
import { CustomDropArrow } from "./CustomDropArrow";

interface Props {
  fieldName: keyof EditFormData;
  title: string;
  placeholder?: string;
  formData: EditFormData;
  selectorData: { value: string; label: string }[];
  setFormData: Dispatch<SetStateAction<EditFormData>>;
  getError: (field: RequiredFieldType) => string;
  onBlur: (field: RequiredFieldType) => void;
}

const RequiredDropDown = ({
  fieldName,
  title,
  placeholder,
  formData,
  selectorData,
  setFormData,
  getError,
  onBlur,
}: Props) => {
  const handleChange = (val: string | null) => {
    setFormData((prev) => {
      const newData = { ...prev, [fieldName]: val || "" };

      if (fieldName === "category") {
        return {
          ...newData,
          params: val ? createEmptyParams(val as Category) : prev.params,
        };
      }

      return newData;
    });
  };

  return (
    <Select
      label={
        <Flex align="center" gap={4} style={{ display: "inline-flex" }}>
          <CustomAsterisk />
          {title}
        </Flex>
      }
      placeholder={placeholder}
      data={selectorData}
      value={(formData[fieldName] as string) || ""}
      onChange={handleChange}
      onBlur={() => onBlur(fieldName as unknown as RequiredFieldType)}
      error={getError(fieldName as unknown as RequiredFieldType)}
      rightSection={<CustomDropArrow />}
      rightSectionWidth={42}
      styles={{
        label: {
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "140%",
          marginBottom: "8px",
        },
        input: {
          height: "32px",
          minHeight: "32px",
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
          paddingRight: "44px",
        },
        wrapper: {
          maxWidth: "456px",
          width: "100%",
        },
      }}
    />
  );
};

export default RequiredDropDown;
