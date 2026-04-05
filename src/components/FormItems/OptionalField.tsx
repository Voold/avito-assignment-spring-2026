import { ActionIcon, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface Props {
  label: string;
  placeholder?: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string | number | undefined) => void;
  isWarning?: boolean; // Для оранжевой подсветки пустых полей
}

const OptionalField = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  isWarning = false,
}: Props) => {
  const isClearDisabled = value === "" || value == null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange(undefined);
    } else {
      onChange(type === "number" ? Number(val) : val);
    }
  };

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      type={type}
      value={value ?? ""}
      onChange={handleChange}
      rightSection={
        <ActionIcon
          size="14px"
          radius="xl"
          variant="filled"
          color="rgba(0, 0, 0, 0.25)"
          disabled={isClearDisabled}
          onClick={() => onChange(undefined)}
          style={{
            opacity: isClearDisabled ? 0 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <IconX size={12} />
        </ActionIcon>
      }
      rightSectionWidth={36}
      styles={{
        label: {
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "140%",
          marginBottom: "12px",
        },
        input: {
          height: "32px",
          minHeight: "32px",
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
          paddingRight: "44px",
          ...(isWarning && {
            borderColor: "#f08f0f",
            boxShadow: "0 0 0 1px rgba(240, 143, 15, 0.2)",
          }),
        },
        wrapper: {
          maxWidth: "456px",
          width: "100%",
        },
      }}
    />
  );
};

export default OptionalField;
