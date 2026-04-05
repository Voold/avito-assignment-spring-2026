import { Select, Text } from "@mantine/core";
import type { DropDownItemType } from "@/types";
import { useFiltersStore } from "@/store/useFiltersStore";
import { SORT_MAPPING } from "@/config";
import { useMemo } from "react";

function DropDown({ data = [] }: { data?: DropDownItemType[] }) {
  const { params, setParams } = useFiltersStore();

  // Вычисляем текущее значение для Select на основе данных из Store
  const currentValue = useMemo(() => {
    const entry = Object.entries(SORT_MAPPING).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, config]) =>
        config.sortColumn === params.sortColumn &&
        config.sortDirection === params.sortDirection,
    );
    return entry ? entry[0] : "new"; // По умолчанию 'new'
  }, [params.sortColumn, params.sortDirection]);

  const handleSortChange = (value: string | null) => {
    if (!value) return;

    const sortConfig = SORT_MAPPING[value];

    if (sortConfig) {
      setParams({
        ...sortConfig,
        skip: 0,
      });
    }
  };

  return (
    <Select
      w={240}
      h={22}
      value={currentValue}
      data={data}
      onChange={handleSortChange}
      rightSection={
        <Text color="#2563EB" size="sm" style={{ lineHeight: 1 }}>
          {
            // Можно вынести в файл или найти иконку, но
            // пока вот так, но я не дурак
          }
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.68582 3.14261C1.74269 3.14266 1.79592 3.17111 1.82938 3.21683L5.00028 7.58694L8.17117 3.21683C8.20458 3.17118 8.25796 3.14274 8.31473 3.14261H9.15262C9.22491 3.14293 9.26735 3.22615 9.22391 3.28519L5.28836 8.70999C5.14661 8.90639 4.85406 8.90641 4.71121 8.70999L0.775666 3.28519C0.733255 3.22603 0.776363 3.14261 0.848908 3.14261H1.68582Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
        </Text>
      }
      rightSectionWidth={38}
      styles={{
        input: {
          border: "4px solid #F4F4F6",
          paddingLeft: "12px",
          paddingRight: "34px",
          height: "32px",
          minHeight: "32px",
          letterSpacing: "-0.03em",
        },
      }}
    />
  );
}

export default DropDown;
