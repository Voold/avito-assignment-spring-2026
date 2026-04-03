import cardPlaceholder from "@/assets/cardPlaceholder.png";
import { CATEGORY_MAP } from "@/config";
import { Box, Text, Card, Image, Badge, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  price: string;
  category: string;
  needsRevision: boolean;
  image: string | null;
}

function CardItem({ id, title, price, category, needsRevision, image }: Props) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ads/${id || 0}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      key={id || 0}
      w={200}
      h={268}
      p={0}
      withBorder
      radius="md"
    >
      <Box w={200} h={150} pos="relative">
        <Image src={image || cardPlaceholder} w={200} h={150} alt="Карточка" />

        <Badge
          pos="absolute"
          bottom={-11}
          left="12px"
          bg="inherit"
          style={{
            width: "fit-content",
            height: "22px",
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "22px",
            display: "flex",
            justifyContent: "start",
            textTransform: "none",
            border: "1px solid #D9D9D9",
            color: "rgba(0, 0, 0, 0.85)",
            padding: "0 12px",
          }}
          radius="sm"
        >
          {CATEGORY_MAP[category] || category || "Категория"}
        </Badge>
      </Box>

      <Stack w={200} h={118} p={12} gap={4} mt={8}>
        <Text
          style={{ fontFamily: "Roboto, sans-serif" }}
          fw={400}
          fz={16}
          lh="24px"
          lineClamp={1}
        >
          {title || "Название товара"}
        </Text>

        <Text fw={600} fz="md" lh="140%">
          {price || "Цена"}
        </Text>

        {needsRevision && (
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
