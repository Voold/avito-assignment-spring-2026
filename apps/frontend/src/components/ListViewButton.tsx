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
        backgroundColor: "var(--app-bg-search)",
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
          color={viewMode === "grid" ? "#1890FF" : "var(--app-text-primary)"}
        />
      </UnstyledButton>

      <Divider
        orientation="vertical"
        size="sm"
        h={28}
        my={2}
        color="#var(--app-bg-ads)"
      />

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
          color={viewMode === "list" ? "#1890FF" : "var(--app-text-primary)"}
        />
      </UnstyledButton>
    </Group>
  );
};

export default ListViewButton;
