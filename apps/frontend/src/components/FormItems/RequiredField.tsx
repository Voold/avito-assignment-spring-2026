import type { EditFormData, RequiredFieldType } from "@/types";
import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { CustomAsterisk } from "./CustomAsterisk";

interface Props {
  fieldName: keyof EditFormData;
  title: string;
  placeholder?: string;
  type?: string;
  formData: EditFormData;
  setFormData: Dispatch<SetStateAction<EditFormData>>;
  setTouched: Dispatch<SetStateAction<Record<string, boolean>>>;
  getError: (field: RequiredFieldType) => string;
  onBlur: (field: RequiredFieldType) => void;
}

const RequiredField = ({
  fieldName,
  title,
  placeholder,
  type = "text",
  formData,
  setFormData,
  setTouched,
  getError,
  onBlur,
}: Props) => {
  const clearField = (field: keyof EditFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const currentValue = formData[fieldName] as string | number | undefined;

  const isClearDisabled = currentValue === "" || currentValue == null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: type === "number" && value !== "" ? Number(value) : value,
    }));
  };

  return (
    <TextInput
      label={
        <Flex
          align="center"
          gap={8}
          style={{ display: "inline-flex" }}
        >
          <CustomAsterisk />
          {title}
        </Flex>
      }
      type={type}
      placeholder={placeholder}
      value={currentValue ?? ""}
      onChange={handleChange}
      onBlur={() => onBlur(fieldName as unknown as RequiredFieldType)}
      error={getError(fieldName as unknown as RequiredFieldType)}
      rightSection={
        <ActionIcon
          size="14px"
          radius="xl"
          variant="filled"
          color="rgba(0, 0, 0, 0.25)"
          disabled={isClearDisabled}
          onClick={() => clearField(fieldName)}
          style={{ opacity: isClearDisabled ? 0.4 : 1 }}
        >
          <IconX size={12} />
        </ActionIcon>
      }
      rightSectionWidth={36}
      styles={{
        label: {
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "140%",
          marginBottom: "8px",
        },
        input: {
          width: "456px",
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

export default RequiredField;
