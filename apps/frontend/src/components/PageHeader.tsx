import { Box, Text } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box
      h={74}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 8,
      }}
    >
      <Text fw={500} fz={22} lh="28px" style={{ letterSpacing: "-0.03em" }}>
        {title}
      </Text>
      <Text fz={18} lh="100%" c="dimmed">
        {subtitle}
      </Text>
    </Box>
  );
}

export default PageHeader;
