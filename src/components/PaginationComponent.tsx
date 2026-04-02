import { Pagination } from "@mantine/core";
import type { PaginationType } from "@/types";

const PaginationComponent = ({ total, page, onChange }: PaginationType) => {
  return (
    <Pagination
      total={total}
      value={page}
      onChange={onChange}
      size="sm"
      styles={{
        control: {
          fontFamily: "Roboto",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
        },
      }}
    />
  );
};

export default PaginationComponent;
