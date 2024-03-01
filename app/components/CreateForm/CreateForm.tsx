"use client";

import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Box,
  Select,
  Accordion,
  AccordionItem,
  AccordionControl,
  NativeSelect,
  AccordionPanel,
  SimpleGrid,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconDevices2 } from "@tabler/icons-react";
import accordionCSS from "./Accordion.module.css";

export default function CreateForm() {
  const form = useForm({
    initialValues: {
      formTitle: "",
      startDate: "",
      endDate: "",
      itemName: "",
      itemSN: "",
      itemAssetTag: "",
      itemCategory: "",
    },
  });

  const [startDateValue] = useState<Date | null>(null);
  const [endDateValue] = useState<Date | null>(null);

  interface itemObj {
    itemName: string;
    itemSN: string;
    itemAssetTag: string;
    itemCategory: string;
  }

  // const itemObjArray: itemObj[] = []
  const [itemObjArray, setItemObjArray] = useState<itemObj[]>([]);

  const [itemForm, setItemForm] = useState({
    itemName: "",
    itemSN: "",
    itemAssetTag: "",
    itemCategory: "",
  });

  function addNewItemToArray() {
    const newItemObj: itemObj = {
      itemName: itemForm.itemName,
      itemSN: itemForm.itemSN,
      itemAssetTag: itemForm.itemAssetTag,
      itemCategory: itemForm.itemCategory,
    };
    setItemObjArray([...itemObjArray, newItemObj]);
    console.log(itemObjArray);
  }

  const items = itemObjArray.map((item: itemObj) => (
    <AccordionItem key={item.itemName} value={item.itemName}>
      <AccordionControl icon={<IconDevices2></IconDevices2>}>
        {item.itemName}
      </AccordionControl>
      <AccordionPanel>
        Serial Number: {item.itemSN}
        <br />
        Asset Tag: {item.itemAssetTag}
        <br />
        Category: {item.itemCategory}
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <SimpleGrid cols={2}>
        <Box ml={50}>
          <TextInput label="Form Title" {...form.getInputProps("formTitle")} />
          <DatePickerInput
            label="Start Date"
            placeholder="Pick date"
            value={startDateValue}
            {...form.getInputProps("startDate")}
          />
          <DatePickerInput
            label="End Date"
            placeholder="Pick date"
            value={endDateValue}
            {...form.getInputProps("endDate")}
          />
          <Button type="submit" color="gray" mt={10}>
            Create Form
          </Button>
        </Box>

        <Box mr={50}>
          <TextInput
            withAsterisk
            label="Item Name"
            value={itemForm.itemName}
            onChange={(e) => {
              setItemForm({ ...itemForm, itemName: e.target.value });
            }}
          />
          <TextInput
            label="Item Serial Number"
            value={itemForm.itemSN}
            onChange={(e) => {
              setItemForm({ ...itemForm, itemSN: e.target.value });
            }}
          />
          <TextInput
            label="Item Asset Tag"
            value={itemForm.itemAssetTag}
            onChange={(e) => {
              setItemForm({ ...itemForm, itemAssetTag: e.target.value });
            }}
          />
          <NativeSelect
            label="Category"
            value={itemForm.itemCategory}
            onChange={(e) => {
              setItemForm({
                ...itemForm,
                itemCategory: e!.currentTarget.value,
              });
            }}
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
          <Button color="gray" mt={10} mb={10} onClick={addNewItemToArray}>
            + Add New Item
          </Button>
          <br />
          <Accordion classNames={accordionCSS} variant="seperate" radius="xl">
            {items}
          </Accordion>
        </Box>
      </SimpleGrid>
    </form>
  );
}
