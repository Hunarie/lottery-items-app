import {
  Accordion,
  Box,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
} from "@mantine/core";
import classes from "./ListItems.module.css";

async function getData() {
  const res = await fetch("http://localhost:3000/api/get-items");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const itemsList = [
  {
    emoji: "💻",
    value: "Dell Inc. Latitude 3540",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    emoji: "💻",
    value: "Dell Inc. Inspiron 3671",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    emoji: "💻",
    value: "Dell Inc. Latitude 5530",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
];

export async function ListItems() {
  const data = await getData();
  console.log(data);

  const items = itemsList.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionControl icon={item.emoji}>{item.value}</AccordionControl>
      <AccordionPanel>{item.description}</AccordionPanel>
    </AccordionItem>
  ));

  return (
    <Box className={classes.listItems}>
      <Accordion variant="contained">{items}</Accordion>
    </Box>
  );
}
