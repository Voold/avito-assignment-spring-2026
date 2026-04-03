import PageHeader from "@/components/PageHeader";
import SearchToolbar from "@/components/UI/SearchToolbar";
import { sortData } from "@/config/commonData";
import { Box, Flex, Group, Loader, Center, Text } from "@mantine/core";
import Filter from "@/components/Filter";
import CardItem from "@/components/CardItem";
import PaginationComponent from "@/components/PaginationComponent";
import { useItemsList } from "@/hooks/useItems";
import { useFiltersStore } from "@/store/useFiltersStore";

export function AdsPage() {
  // Достаем и данные запроса, и стейт фильтров
  const { data, isLoading, isError } = useItemsList();
  const { params, setParams } = useFiltersStore();

  // Вычисляем данные для пагинации
  const limit = params.limit || 10;
  const skip = params.skip || 0;
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageChange = (page: number) => {
    setParams({ skip: (page - 1) * limit });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box w={1399} mx="auto" p="md" style={{ overflowX: "hidden" }}>
      <PageHeader
        title="Мои объявления"
        subtitle={data?.total ? `${data.total} объявлений` : "Загрузка..."}
      />
      <SearchToolbar sortData={sortData} />

      <Flex mt={16} gap={24} w={1335}>
        <Filter />

        <Box flex={1}>
          {isLoading ? (
            <Center h={400}>
              <Loader size="xl" />
            </Center>
          ) : isError ? (
            <Center h={400}>
              <Text color="red">Ошибка при загрузке объявлений</Text>
            </Center>
          ) : data?.items.length === 0 ? (
            <Center h={400}>
              <Text>Ничего не найдено</Text>
            </Center>
          ) : (
            <>
              <Flex wrap="wrap" rowGap={12} columnGap={13.75} w={1055}>
                {data?.items.map((item) => {
                  return (
                    <CardItem
                      key={item.id}
                      id={String(item.id)}
                      title={item.title}
                      price={`${item.price.toLocaleString("ru-RU")} ₽`}
                      category={item.category}
                      needsRevision={item.needsRevision}
                      image={null}
                    />
                  );
                })}
              </Flex>

              {totalPages > 1 && (
                <Group mt={10} w={310} h={32} gap={8}>
                  <PaginationComponent
                    total={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Group>
              )}
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
