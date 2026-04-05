import PageHeader from "@/components/PageHeader";
import SearchToolbar from "@/components/UI/SearchToolbar";
import { SORT_DATA } from "@/config/commonData";
import { Box, Flex, Group, Loader, Center, Text } from "@mantine/core";
import Filter from "@/components/Filter";
import CardItem from "@/components/CardItem";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { useItemsList } from "@/hooks/useItems";
import { useFiltersStore } from "@/store/useFiltersStore";
import { useViewStore } from "@/store/useViewStore";
import { useEffect } from "react";

export function AdsPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "var(--app-bg-ads)";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const { data, isLoading, isError, isFetching } = useItemsList();
  const { params, setParams } = useFiltersStore();
  const { viewMode, setViewMode } = useViewStore();

  const handleViewModeChange = (newMode: "grid" | "list") => {
    setViewMode(newMode);

    setParams({
      limit: newMode === "list" ? 4 : 10,
      skip: 0,
    });
  };

  const limit = params.limit || 10;
  const skip = params.skip || 0;
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageChange = (page: number) => {
    setParams({ skip: (page - 1) * limit });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldShowLoader = isLoading || isFetching;

  return (
    <Box
      w="98vw"
      maw={1399}
      miw={620}
      style={{ padding: "12px 32px", overflowX: "hidden", margin: "0 auto" }}
    >
      <PageHeader
        title="Мои объявления"
        subtitle={data?.total ? `${data.total} объявлений` : "Загрузка..."}
      />
      <SearchToolbar
        sortData={SORT_DATA}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      <Flex mt={16} gap={24} w={1335}>
        <Filter />

        <Box flex={1} style={{ position: "relative" }}>
          {isError ? (
            <Center h={400}>
              <Text color="red">Ошибка при загрузке объявлений</Text>
            </Center>
          ) : data?.items.length === 0 && !shouldShowLoader ? (
            <Center h={400}>
              <Text>Ничего не найдено</Text>
            </Center>
          ) : shouldShowLoader ? (
            <Center h={400}>
              <Loader size="xl" />
            </Center>
          ) : (
            <>
              <Flex
                direction={viewMode === "list" ? "column" : "row"}
                wrap={viewMode === "grid" ? "wrap" : "nowrap"}
                rowGap={12}
                columnGap={13.75}
                w={1055}
              >
                {data?.items.map((item) => {
                  return (
                    <CardItem
                      key={item.id}
                      id={String(item.id)}
                      title={item.title}
                      price={`${item.price} ₽`}
                      category={item.category}
                      needsRevision={item.needsRevision}
                      image={null}
                      viewMode={viewMode}
                    />
                  );
                })}
              </Flex>

              {totalPages > 1 && (
                <Group mt={10} maw="100%" h={32} gap={8}>
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
