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

  return (
    <Box
      w="100%"
      maw={1399}
      style={{ overflowX: "hidden", margin: "0 auto", padding: "32px" }}
    >
      <ProductHeader
        id={Number(id)}
        title={data.title}
        price={data.price}
        publishedDate={data.createdAt}
        editedDate={data.updatedAt}
      />
      <Divider color="#E0E0E0" w="100%" style={{ margin: "32px 0" }} />
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
