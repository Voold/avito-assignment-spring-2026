import { Box, Center, Divider, Loader, Text } from "@mantine/core";
import { ProductHeader } from "@/components";
import { ProductMainInfo } from "@/components";
import { ProductDescription } from "@/components";
import { useParams } from "react-router-dom";
import { useItemDetails } from "@/hooks";

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useItemDetails(Number(id));

  if (isLoading)
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  if (isError || !data)
    return (
      <Center h="100vh">
        <Text>Товар не найден</Text>
      </Center>
    );

  console.log(data);

  return (
    <Box w={1399} mx="auto" p="md" style={{ overflowX: "hidden" }}>
      {" "}
      <ProductHeader
        item={data}
        title={data.title}
        price={data.price}
        publishedDate={data.createdAt}
        editedDate={data.updatedAt}
      />

      <Divider my={32} color="#E0E0E0" w={1335} />
      <ProductMainInfo
        needsRevision={data.needsRevision || false}
        item={data}
      />
      <Box mt={32}>
        <ProductDescription text={data.description} />
      </Box>
    </Box>
  );
}

export default ProductPage;
