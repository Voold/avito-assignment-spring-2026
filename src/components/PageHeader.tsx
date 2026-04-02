import { Box, Text } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box w={1335} h={74}>
      <Text fw={500} fz={22} lh="28px">
        {title}
      </Text>
      <Text fz={18} lh="100%" c="dimmed">
        {subtitle}
      </Text>
    </Box>
  );
}

export default PageHeader;
