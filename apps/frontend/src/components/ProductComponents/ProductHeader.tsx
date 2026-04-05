import { Button, Flex, Stack, Text, Box } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { dateFormatOptions } from "@/config";

interface Props {
  id: number;
  title: string;
  price: number;
  publishedDate: string;
  editedDate: string;
}

export const ProductHeader = ({
  id,
  title,
  price,
  publishedDate,
  editedDate,
}: Props) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/ads/${id}/edit`);
  };

  return (
    <Flex
      w="100%"
      h={92}
      justify="space-between"
      direction="column"
      style={{ boxSizing: "border-box" }}
    >
      <Flex w="100%" gap={0} justify="space-between" align="flex-start">
        <Text
          component="h1"
          style={{
            margin: 0,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "30px",
            lineHeight: "40px",
            letterSpacing: "0%",
            textBoxTrim: "none",
          }}
        >
          {title || "Название товара"}
        </Text>

        <Text
          component="h1"
          style={{
            margin: 0,
            fontFamily: "Roboto, sans-serif",
            fontWeight: 500,
            fontSize: "30px",
            lineHeight: "40px",
            letterSpacing: "0%",
            textBoxTrim: "none",
          }}
        >
          {price || "Цена не указана"} ₽
        </Text>
      </Flex>

      <Flex
        h={38}
        gap={0}
        justify="space-between"
        style={{ verticalAlign: "bottom" }}
      >
        <Button
          onClick={handleEditClick}
          radius={8}
          h="38px"
          px={10}
          py={8}
          styles={{
            root: {
              backgroundColor: "#1890ff",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              height: "38px",
              fontSize: "16px",
              fontWeight: 400,
            },
          }}
          rightSection={
            <Stack gap={2} align="center" style={{ display: "flex" }}>
              <IconPencil size={18} stroke={1.5} />
              <Box w={14} h={1} style={{ backgroundColor: "currentColor" }} />
            </Stack>
          }
        >
          Редактировать
        </Button>

        <Stack gap={0} align="flex-end">
          <Text
            c="dimmed"
            fz={16}
            fw={400}
            lh="normal"
            style={{ fontFamily: "Inter, sans-serif", textAlign: "right" }}
          >
            Опубликовано:{" "}
            {new Date(publishedDate).toLocaleDateString(
              "ru-RU",
              dateFormatOptions,
            ) || "Дата не указана"}
          </Text>

          {publishedDate !== editedDate && (
            <Text
              c="dimmed"
              fz={16}
              fw={400}
              lh="normal"
              style={{ fontFamily: "Inter, sans-serif", textAlign: "right" }}
            >
              Отредактировано:{" "}
              {new Date(editedDate).toLocaleDateString(
                "ru-RU",
                dateFormatOptions,
              ) || "Дата не указана"}
            </Text>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};
