import {
  Accordion,
  Box,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import { IconDevices2 } from "@tabler/icons-react";
import classes from "./ListItems.module.css";
import accordianCSS from "./Accordion.module.css";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

async function getData() {
  const res = await fetch("http://localhost:3000/api/get-items", {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function ListItems() {
  const data = await getData();
  console.log(data.response);

  const items = data.response.map((item: any) => (
    <AccordionItem key={item.itemName} value={item.itemName}>
      <AccordionControl icon={<IconDevices2></IconDevices2>}>{item.itemName}</AccordionControl>
      <AccordionPanel>
        Serial Number: {item.itemSN}
        <br />
        Asset Tag: {item.itemAssetTag}
        <br />
        Category: {item.itemCategory}
        <DeleteButton data={item.itemSN} />
        <EditButton data={item}/>
      </AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Box className={classes.listItems} mx="auto">
      <Accordion classNames={accordianCSS} variant="seperate" radius="xl">
        {items}
      </Accordion>
    </Box>
  );
}
