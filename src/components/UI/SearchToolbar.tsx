import { Group } from "@mantine/core";
import DropDown from "../DropDown";
import type { DropDownItemType } from "@/types";
import Search from "../Search";
import ListViewButton from "../ListViewButton";

function SearchToolbar({
  placeholder = "Найти объявление...",
  sortData = [{ value: "new", label: "По новизне (сначала новые)" }],
}: {
  placeholder?: string;
  sortData?: DropDownItemType[];
}) {
  return (
    <Group w={1335} h={56} mt={16} wrap="nowrap">
      <Search placeholder={placeholder} />

      <ListViewButton />

      <DropDown data={sortData} />
    </Group>
  );
}

export default SearchToolbar;
