"use client";
import { useState } from "react";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./Header.module.css";

const links = [
  { link: "/form", label: "Form" },
  { link: "/items", label: "Items" },
];

export function Header() {
  const [active, setActive] = useState(links[0].link);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

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
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
      </Group>
    </header>
  );
}
