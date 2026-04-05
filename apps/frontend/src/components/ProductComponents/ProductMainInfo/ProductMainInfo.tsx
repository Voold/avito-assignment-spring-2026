import { Image, Flex, Box, Text, Stack, List, Center } from "@mantine/core";
import type { Item } from "@/types";
import cardPlaceholder from "@/assets/productPhotoPlaceholder.svg";
import React from "react";
import { LABEL_MAP, CATEGORY_FIELDS } from "@/config";

interface Props {
  item: Item;
  needsRevision: boolean;
}

export const ProductMainInfo = ({ item, needsRevision }: Props) => {
  const { category, params } = item;

  const possibleFields =
    CATEGORY_FIELDS[category as keyof typeof CATEGORY_FIELDS] || [];

  const missingFields = possibleFields
    .filter((field) => !params[field as keyof typeof params])
    .map((field) => LABEL_MAP[field] || field);

  if (!item.description) missingFields.push("Описание");

  return (
    <Flex gap={32} style={{ width: "100%" }}>
      <Image
        src={cardPlaceholder}
        alt={item.title}
        style={{
          width: "100%",
          maxWidth: "480px",
          height: "360px",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <Box style={{ width: "100%" }}>
        {needsRevision && (
          <Box
            mb={24}
            p={16}
            style={{
              backgroundColor: "rgba(255, 146, 0, 0.05)",
              borderRadius: "8px",
              display: "flex",
              gap: "12px",
              width: "100%",
              maxWidth: "512px",

              boxShadow: "0px 6px 16px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <Center
              style={{
                minWidth: "18px",
                height: "18px",
                fontSize: "12px",
                backgroundColor: "#FF9200",
                color: "white",
                borderRadius: "50%",
                fontWeight: 600,
              }}
            >
              !
            </Center>
            <Stack gap={4}>
              <Text fw={600} size="md" c="var(--app-text-primary)">
                Требуются доработки
              </Text>

              <Text size="sm" c="#666" component="div">
                У объявления не заполнены поля:
                <List size="sm" withPadding mt={4}>
                  {missingFields.map((field) => (
                    <List.Item key={field}>{field}</List.Item>
                  ))}
                </List>
              </Text>
            </Stack>
          </Box>
        )}

        <Text fw={600} mb={16} style={{ fontSize: "20px" }}>
          Характеристики
        </Text>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "150px 1fr",
            columnGap: "10px",
            rowGap: "10px",
            alignItems: "center",
          }}
        >
          {Object.entries(params).map(([key, value]) => {
            if (!value) return null;
            return (
              <React.Fragment key={key}>
                <Text
                  c="dimmed"
                  size="sm"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {LABEL_MAP[key] || key}
                </Text>
                <Text size="sm">
                  {LABEL_MAP[String(value)] || String(value)}
                  {key === "area" && " м²"}
                  {key === "enginePower" && " л.с."}
                  {key === "mileage" && " км"}
                </Text>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
};
