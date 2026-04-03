import { Box } from "@mantine/core";
import classes from "./ProductDescription.module.css";

export const ProductDescription = ({ text }: { text: string }) => {
  return (
    <Box className={classes.wrapper}>
      <h2 className={classes.title}>Описание</h2>
      <p className={classes.text}>{text}</p>
    </Box>
  );
};
