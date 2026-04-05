import { Pagination } from "@mantine/core";
import type { PaginationType } from "@/types";
import classes from "./Pagination.module.css";

const PaginationComponent = ({ total, page, onChange }: PaginationType) => {
  return (
    <Pagination
      total={total}
      value={page}
      onChange={onChange}
      classNames={{ control: classes.myControl }}
    />
  );
};

export default PaginationComponent;
