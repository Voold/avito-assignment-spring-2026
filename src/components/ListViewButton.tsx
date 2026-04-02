import { Group, UnstyledButton, Divider } from "@mantine/core";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";

const ListViewButton = () => {
  // TODO - active state
  return (
    <Group
      gap={0}
      style={{
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid #e9ecef",
      }}
    >
      <UnstyledButton
        w={36}
        h={32}
        display="flex"
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <IconLayoutGrid size={18} />
      </UnstyledButton>
      <Divider orientation="vertical" size="sm" h={28} my={2} />
      <UnstyledButton
        w={36}
        h={32}
        display="flex"
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <IconList size={18} />
      </UnstyledButton>
    </Group>
  );
};

export default ListViewButton;
