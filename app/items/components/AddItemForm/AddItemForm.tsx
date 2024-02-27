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
      itemCategory: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/create-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form }),
      });
      if (response.ok) {
        console.log("Successfully added item");
      } else {
        console.error("Did not add item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={classes.addItemForm} mx="auto">
      <form onSubmit={handleSubmit}>
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
          {...form.getInputProps("itemCategory")}
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
          <Button type="submit" color="gray">
            Add Item
          </Button>
        </Group>
      </form>
    </Box>
  );
}
