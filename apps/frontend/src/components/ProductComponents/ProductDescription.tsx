import { Box, Text, Title } from "@mantine/core";

export const ProductDescription = ({ text }: { text: string | undefined }) => {
  return (
    <Box
      style={{
        width: "480px",
        minHeight: "132px",
        boxSizing: "border-box",
      }}
    >
      <Title
        order={2}
        style={{
          margin: 0,
          fontFamily: "inherit",
          fontWeight: 500,
          fontSize: "22px",
          lineHeight: "28px",
          letterSpacing: "-0.04em",
        }}
      >
        Описание
      </Title>

      <Text
        component="p"
        style={{
          margin: 0,
          marginTop: "16px",
          fontFamily: "inherit",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "1.4",
          whiteSpace: "pre-wrap",
          textBoxTrim: "none",
        }}
      >
        {text || "Отсутствует"}
      </Text>
    </Box>
  );
};
