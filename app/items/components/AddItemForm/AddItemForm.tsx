"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Box, Group, Button } from "@mantine/core";

export function AddItemForm() {
  const form = useForm({
    initialValues: {
      itemName: "",
      itemSN: "",
      itemAssetTag: "",
    },
  });

  return (
    <Box maw={500} mx="auto">
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
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
