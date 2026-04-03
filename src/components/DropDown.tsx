import { Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { DropDownItemType } from "@/types";

function DropDown({
  data = [{ value: "new", label: "По новизне (сначала новые)" }],
}: {
  data?: DropDownItemType[];
}) {
  return (
    <Select
      w={252}
      h={32}
      defaultValue="new"
      data={data}
      rightSection={<IconChevronDown size={10} />}
      styles={{
        input: {
          borderWidth: "4px",
          paddingLeft: "12px",
          paddingRight: "30px",
        },
      }}
    />
  );
}

export default DropDown;
