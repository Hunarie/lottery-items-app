"use client";

import { Stack, Accordion, Box } from "@mantine/core";
import classes from "./ListItems.module.css";

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

export function ListItems() {
  const items = itemsList.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Box className={classes.listItems}>
      <Accordion variant="contained">{items}</Accordion>
    </Box>
  );
}
