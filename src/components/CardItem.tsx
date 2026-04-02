import cardPlaceholder from "@/assets/cardPlaceholder.png";
import { Box, Text, Card, Image, Badge, Stack } from "@mantine/core";
import type { CardItemType } from "@/types/commonTypes";

function CardItem({
  card = {
    id: "0",
    title: "Название товара",
    price: "15 000 ₽",
    category: "Электроника",
    needsWork: true,
    image: null,
  },
}: {
  card: CardItemType;
}) {
  return (
    <Card key={card.id} w={200} h={268} p={0} withBorder radius="md">
      {/* Фото */}
      <Box w={200} h={150} pos="relative">
        <Image
          src={card.image || cardPlaceholder}
          w={200}
          h={150}
          alt="Карточка"
        />

        {/* Категория ровно по центру между картинкой и текстом */}
        <Badge
          pos="absolute"
          bottom={-11}
          left="50%"
          style={{
            transform: "translateX(-50%)",
            width: "111px",
            height: "22px",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "14px",
          }}
          variant="filled"
          color="gray"
          radius="sm"
        >
          {card.category}
        </Badge>
      </Box>

      {/* Текст (200x118) */}
      <Stack w={200} h={118} p={12} gap={4} mt={8}>
        <Text
          style={{ fontFamily: "Roboto, sans-serif" }}
          fw={400}
          fz={16}
          lh="24px"
          lineClamp={1}
        >
          {card.title}
        </Text>

        <Text fw={600} fz="md" lh="140%">
          {card.price}
        </Text>

        {card.needsWork && (
          <Badge
            color="orange"
            variant="light"
            radius="sm"
            size="lg"
            styles={{
              label: {
                textTransform: "none",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: "14px",
              },
            }}
            leftSection={
              <Box
                w={6}
                h={6}
                style={{
                  backgroundColor: "orange",
                  borderRadius: "50%",
                }}
              />
            }
          >
            Требует доработок
          </Badge>
        )}
      </Stack>
    </Card>
  );
}

export default CardItem;
