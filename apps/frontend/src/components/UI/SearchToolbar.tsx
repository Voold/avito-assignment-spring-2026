import { Flex } from "@mantine/core";
import DropDown from "../DropDown";
import type { DropDownItemType } from "@/types";
import Search from "../Search";
import ListViewButton from "../ListViewButton";

interface Props {
  placeholder?: string;
  sortData: DropDownItemType[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

function SearchToolbar({
  placeholder,
  sortData,
  viewMode,
  onViewModeChange,
}: Props) {
  return (
    <Flex
      h={56}
      mt={16}
      gap={16}
      w="100%"
      bg="#ffffff"
      wrap="nowrap"
      style={{
        padding: "12px",
        borderRadius: 8,
        verticalAlign: "center",
      }}
    >
      <Search placeholder={placeholder || "Найти объявление..."} />

      <ListViewButton viewMode={viewMode} onChange={onViewModeChange} />

      <DropDown data={sortData} />
    </Flex>
  );
}

export default SearchToolbar;
