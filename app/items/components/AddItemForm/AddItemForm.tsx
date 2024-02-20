"use client";
import { useForm } from "@mantine/form";
import { TextInput, Box, Group, Button, Select } from "@mantine/core";
import classes from "./AddItemForm.module.css";

export function AddItemForm() {
  const form = useForm({
    initialValues: {
      itemName: "",
      itemSN: "",
      itemAssetTag: "",
    },
  });

  return (
    <Box className={classes.addItemForm} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Item Name"
          {...form.getInputProps("itemName")}
        />
        <TextInput
          label="Item Serial Number"
          {...form.getInputProps("itemSN")}
        />
        <TextInput
          label="Item Asset Tag"
          {...form.getInputProps("itemAssetTag")}
        />
        <Select
          label="Category"
          placeholder="Pick category"
          data={[
            "Desktop",
            "Laptop",
            "Server",
            "Networking Equipment",
            "UPS",
            "Component",
            "Other",
          ]}
        />
        <Group justify="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
