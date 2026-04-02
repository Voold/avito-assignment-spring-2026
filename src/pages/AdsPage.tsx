import PageHeader from "@/components/PageHeader";
import SearchToolbar from "@/components/UI/SearchToolbar";
import { sortData } from "@/config/commonData";
import { Box, Flex, Group } from "@mantine/core";
import Filter from "@/components/Filter";
import CardItem from "@/components/CardItem";
import type { CardItemType } from "@/types";
import PaginationComponent from "@/components/PaginationComponent";

const mockCards = Array(10).fill({
  id: "123",
  title: "Название товара",
  price: "15 000 ₽",
  category: "Электроника",
  needsWork: true,
  image: null,
});

export function AdsPage() {
  return (
    <Box w={1399} h={786} mx="auto" p="md" style={{ overflowX: "hidden" }}>
      <PageHeader title={"Мои объявления"} subtitle={"42 объявления"} />
      {/* //TODO - dynamic data */}
      <SearchToolbar sortData={sortData} />

      <Flex mt={16} gap={24} w={1335}>
        <Filter />

        <Box flex={1}>
          <Flex wrap="wrap" rowGap={12} columnGap={13.75} w={1055}>
            {mockCards.map((card, index) => {
              card.id = `${index}`;
              return <CardItem card={card as CardItemType} />;
            })}
          </Flex>

          <Group mt={10} w={310} h={32} gap={8}>
            <PaginationComponent
              total={10}
              page={1}
              onChange={(page) => console.log(page)}
            />
          </Group>
        </Box>
      </Flex>
    </Box>
  );
}
