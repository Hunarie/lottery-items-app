import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { ListItems } from "./components/ListItems/ListItems";
import { Group } from "@mantine/core";

export default function ItemsPage() {
  return (
    <Group>
      <AddItemForm />
      <ListItems />
    </Group>
  );
}
