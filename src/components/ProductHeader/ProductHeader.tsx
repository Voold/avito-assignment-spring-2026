import { Button, Flex, Stack, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import classes from "./ProductHeader.module.css";

interface Props {
  title: string;
  price: number;
  publishedDate: string;
  editedDate: string;
}

export const ProductHeader = ({
  title,
  price,
  publishedDate,
  editedDate,
}: Props) => {
  return (
    <Flex className={classes.wrapper} justify="space-between">
      <Stack gap={0} justify="space-between" align="flex-start">
        <h1 className={classes.title}>{title || "Название товара"}</h1>
        <Button
          className={classes.editButton}
          rightSection={
            <div className={classes.iconWrapper}>
              <IconPencil size={18} stroke={1.5} />
              <div className={classes.iconUnderline} />
            </div>
          }
        >
          Редактировать
        </Button>
      </Stack>

      <Stack gap={0} justify="space-between" align="flex-end">
        <h1 className={classes.price}>{price || "Цена не указана"} ₽</h1>
        <div className={classes.dates}>
          <Text c="dimmed">
            Опубликовано: {publishedDate || "Дата не указана"}
          </Text>
          <Text c="dimmed">
            Отредактировано: {editedDate || "Дата не указана"}
          </Text>
        </div>
      </Stack>
    </Flex>
  );
};
