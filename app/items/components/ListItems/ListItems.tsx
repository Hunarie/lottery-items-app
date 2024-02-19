import { Stack, Button, Box } from "@mantine/core";
import classes from "./ListItems.module.css";

export function ListItems() {
  return (
    <Box className={classes.listItems}>
      <Stack bg="var(--mantine-color-body)">
        <Button variant="default">1</Button>
        <Button variant="default">2</Button>
        <Button variant="default">3</Button>
      </Stack>
    </Box>
  );
}
