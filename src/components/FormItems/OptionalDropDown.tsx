import { Select } from "@mantine/core";
import { CustomDropArrow } from "./CustomDropArrow";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  data: readonly { readonly value: string; readonly label: string }[];
  onChange: (value: string) => void;
  isWarning?: boolean;
}

const OptionalDropDown = ({
  label,
  placeholder,
  value,
  data,
  onChange,
  isWarning = false,
}: Props) => {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={[{ value: "", label: "Не выбрано" }, ...data]}
      value={value}
      onChange={(val) => onChange(val || "")}
      rightSection={<CustomDropArrow />}
      rightSectionWidth={42}
      styles={{
        label: {
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "140%",
          marginBottom: "8px",
        },
        input: {
          width: "456px",
          height: "32px",
          minHeight: "32px",
          fontFamily: "Roboto, sans-serif",
          fontSize: "14px",
          paddingRight: "40px",
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

export default OptionalDropDown;
