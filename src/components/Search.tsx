import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

function Search({
  placeholder = "Найти объявление...",
}: {
  placeholder?: string;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      rightSection={<IconSearch size={14} />}
      flex={1}
      styles={{ input: { padding: "12px" } }}
    />
  );
}

export default Search;
