import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useState, useEffect } from "react";

function Search({ placeholder }: { placeholder?: string }) {
  const { params, setParams } = useFiltersStore();

  const [searchValue, setSearchValue] = useState(params.q || "");

  const [prevQ, setPrevQ] = useState(params.q);

  if (params.q !== prevQ) {
    setPrevQ(params.q);
    setSearchValue(params.q || "");
  }

  {
    // Можно было бы вынести дебаунс в утилиты, но он только тут используется.
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue !== (params.q || "")) {
        setParams({
          q: searchValue || undefined,
          skip: 0,
        });
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, params.q, setParams]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <TextInput
      placeholder={placeholder}
      rightSection={<IconSearch size={14} />}
      flex={1}
      value={searchValue}
      onChange={(e) => handleSearchChange(e.currentTarget.value)}
      styles={{
        input: {
          padding: "12px",
          backgroundColor: "var(--app-bg-search)",
          border: "none",
          height: "32px",
          minHeight: "32px",
        },
      }}
    />
  );
}

export default Search;
