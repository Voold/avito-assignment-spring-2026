import { Stack } from "@mantine/core";
import type { Category, ItemParams } from "@/types";
import {
  CATEGORY_FIELDS,
  LABEL_MAP,
  NUMBER_FIELDS,
  FIELD_OPTIONS,
} from "@/config";
import OptionalField from "../FormItems/OptionalField";
import OptionalDropDown from "../FormItems/OptionalDropDown";

interface Props {
  category: Category;
  params: ItemParams;
  onChange: (params: ItemParams) => void;
}

export const FormCharacteristicsSection = ({
  category,
  params,
  onChange,
}: Props) => {
  const fields = CATEGORY_FIELDS[category] ?? [];

  if (!fields.length) return null;

  const normalizeValue = (value: unknown) =>
    value === undefined || value === null ? "" : String(value);

  const handleValueChange = (
    field: string,
    nextValue: string | number | undefined,
  ) => {
    onChange({
      ...params,
      [field]: nextValue,
    } as ItemParams);
  };

  const getFieldOptions = (field: string) => {
    if (field === "type") {
      return (
        FIELD_OPTIONS.type[category as keyof typeof FIELD_OPTIONS.type] || []
      );
    }

    if (field in FIELD_OPTIONS && field !== "type") {
      const options = (FIELD_OPTIONS as Omit<typeof FIELD_OPTIONS, "type">)[
        field as keyof Omit<typeof FIELD_OPTIONS, "type">
      ];
      return options;
    }

    return undefined;
  };

  return (
    <Stack gap={8}>
      {fields.map((field) => {
        const options = getFieldOptions(field);
        const value = normalizeValue(params[field as keyof ItemParams]);
        const isWarning = value === "";
        const label = LABEL_MAP[field] || field;

        if (options) {
          return (
            <OptionalDropDown
              key={field}
              label={label}
              placeholder={label}
              data={options}
              value={value}
              onChange={(val) => handleValueChange(field, val || undefined)}
              isWarning={isWarning}
            />
          );
        }

        return (
          <OptionalField
            key={field}
            label={label}
            placeholder={label}
            type={NUMBER_FIELDS.includes(field) ? "number" : "text"}
            value={params[field as keyof ItemParams] ?? ""}
            onChange={(val) => handleValueChange(field, val)}
            isWarning={isWarning}
          />
        );
      })}
    </Stack>
  );
};
