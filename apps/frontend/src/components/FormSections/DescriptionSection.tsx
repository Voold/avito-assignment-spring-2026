import type { Dispatch, SetStateAction } from "react";
import {
  Textarea,
  Stack,
  Text,
  Group,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import AiButton from "@/components/AiButton/AiButton";
import { calculateDescriptionDiff } from "@/utils";
import type { EditFormData } from "@/types";

interface FormDescriptionSectionProps {
  formData: EditFormData;
  setFormData: Dispatch<SetStateAction<EditFormData>>;
  originalDescription?: string;
  diffTooltip: string;
  setDiffTooltip: Dispatch<SetStateAction<string>>;
}

export const FormDescriptionSection = ({
  formData,
  setFormData,
  originalDescription,
  diffTooltip,
  setDiffTooltip,
}: FormDescriptionSectionProps) => {
  const isDescriptionEmpty = !formData.description?.trim();
  const descriptionLength = formData.description?.length || 0;

  return (
    <Stack
      gap={6}
      maw={942}
      align="stretch"
      style={{ width: "100%", position: "relative" }}
    >
      <Textarea
        style={{ width: "100%" }}
        label={
          <Group align="center">
            <Text
              style={{
                fontFamily: "inherit",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "140%",
                marginBottom: "0px",
              }}
            >
              Описание
            </Text>
            {diffTooltip && (
              <Tooltip label={diffTooltip} withArrow position="top">
                <ActionIcon variant="light" color="blue" size="sm">
                  <IconInfoCircle size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        }
        placeholder="Опишите товар подробнее..."
        minRows={5}
        maxLength={1000}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        styles={{
          label: {
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "140%",
            marginBottom: "8px",
          },
          input: {
            ...{
              width: "100%",
              height: "60px",
              minHeight: "60px",
              fontFamily: "Roboto, sans-serif",
              fontSize: "14px",
              paddingRight: "44px",
              resize: "vertical",
            },
            height: "auto",
            ...(isDescriptionEmpty
              ? {
                  borderColor: "#f08f0f",
                  boxShadow: "0 0 0 1px rgba(240, 143, 15, 0.2)",
                }
              : {}),
          },
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "14px",
          color: "#666",
          position: "absolute",
          bottom: "0px",
          right: "0px",
          transform: "translateY(-75%)",
        }}
      >
        {`${descriptionLength} / 1000`}
      </div>
      <AiButton
        mode="description"
        title={formData.title}
        category={formData.category}
        description={formData.description}
        price={formData.price}
        params={formData.params}
        onApply={(result) => {
          if (result.description !== undefined) {
            setDiffTooltip(
              calculateDescriptionDiff(
                originalDescription || "",
                result.description,
              ),
            );
            setFormData({ ...formData, description: result.description });
          }
        }}
      />
    </Stack>
  );
};
