"use client";
import { useState } from "react";
import { Group } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";
import classes from "./Header.module.css";

const links = [
  { link: "/form", label: "Form" },
  { link: "/items", label: "Items" },
];

export function Header() {
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Group className={classes.lftHeader} gap={5} visibleFrom="xs">
        {items}
      </Group>
      <Group
        justify="flex-end"
        className={classes.rtHeader}
        gap={5}
        visibleFrom="xs"
      >
        <IconSun
          onClick={() => {
            console.log("Click");
          }}
        ></IconSun>
      </Group>
    </header>
  );
}
