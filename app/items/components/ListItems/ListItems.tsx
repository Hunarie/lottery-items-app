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
import GET from "../../../api/get-items/route";

export async function ListItems() {
  const data = await GET();
  console.log(data);

  const items = data.map((item: any) => (
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
        <DeleteButton data={item.itemSN} />
        <EditButton data={item} />
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
