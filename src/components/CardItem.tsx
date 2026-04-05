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
  viewMode: "grid" | "list";
}

function CardItem({
  id,
  title,
  price,
  category,
  needsRevision,
  image,
  viewMode,
}: Props) {
  const navigate = useNavigate();
  const isList = viewMode === "list";

  const handleCardClick = () => {
    navigate(`/ads/${id || 0}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      key={id || 0}
      w={isList ? 1055 : 200}
      h={isList ? 132 : 268}
      p={0}
      radius="md"
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: isList ? "row" : "column",
        border: "1px solid #F0F0F0",
      }}
    >
      <Box
        w={isList ? 179 : 200}
        h={isList ? 132 : 150}
        pos="relative"
        style={{ flexShrink: 0 }}
      >
        <Image
          src={image || cardPlaceholder}
          w="100%"
          h="100%"
          alt="Карточка"
          style={{ objectFit: "cover" }}
        />

        {!isList && (
          <Badge
            pos="absolute"
            bottom={-11}
            left="9px"
            bg="white"
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
              borderRadius: "6px",
            }}
            radius="sm"
          >
            {CATEGORY_MAP[category] || category || "Категория"}
          </Badge>
        )}
      </Box>

      <Stack
        p={isList ? "12px 16px" : 12}
        gap={4}
        mt={isList ? 0 : 8}
        style={{ flex: 1 }}
      >
        {isList && (
          <Text
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              color: "gray",
            }}
          >
            {CATEGORY_MAP[category] || category || "Категория"}
          </Text>
        )}

        <Text
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "26px",
          }}
          lineClamp={1}
        >
          {title || "Название товара"}
        </Text>

        <Text
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "140%",
            color: "#00000073",
          }}
        >
          {price || "Цена"}
        </Text>

        {needsRevision && (
          <Badge
            color="#F9F1E6"
            variant="light"
            radius="8px"
            size="lg"
            w="fit-content"
            styles={{
              label: {
                textTransform: "none",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: "14px",
                color: "#FAAD14",
              },
              root: {
                marginLeft: "2px",
                padding: "2px 6px",
              },
            }}
            leftSection={
              <Box
                w={6}
                h={6}
                style={{
                  margin: "0 2px",
                  backgroundColor: "#FAAD14",
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
