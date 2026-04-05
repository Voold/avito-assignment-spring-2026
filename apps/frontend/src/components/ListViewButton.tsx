import { Group, UnstyledButton, Divider } from "@mantine/core";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

interface ListViewButtonProps {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

const ListViewButton = ({ viewMode, onChange }: ListViewButtonProps) => {
  return (
    <Group
      gap={0}
      style={{
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "#f4f4f6",
        marginLeft: "8px",
      }}
    >
      <UnstyledButton
        w={36}
        h={32}
        display="flex"
        onClick={() => onChange("grid")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          transition: "color 0.2s ease",
          borderRadius: "0 8px 8px 0",
        }}
      >
        <IconLayoutGrid
          size={18}
          color={viewMode === "grid" ? "#1890FF" : "#000000D9"}
        />
      </UnstyledButton>

      <Divider orientation="vertical" size="sm" h={28} my={2} color="#ffffff" />

      <UnstyledButton
        w={36}
        h={32}
        display="flex"
        onClick={() => onChange("list")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          transition: "color 0.2s ease",
          borderRadius: "0 8px 8px 0",
        }}
      >
        <IconList
          size={18}
          color={viewMode === "list" ? "#1890FF" : "#000000D9"}
        />
      </UnstyledButton>
    </Group>
  );
};

export default ListViewButton;
