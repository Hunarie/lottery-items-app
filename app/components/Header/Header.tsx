"use client";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./Header.module.css";
import { SessionProvider } from "next-auth/react";
import MSProfilePicture from "./MSProfilePicture";
import { usePathname } from "next/navigation";

const links = [
  { link: "/form", label: "Form" },
  { link: "/items", label: "Items" },
];

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </a>
  ));

  const pathName = usePathname();
  if (pathName != "/sign-in") {
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
          <SessionProvider>
            <MSProfilePicture />
          </SessionProvider>
        </Group>
      </header>
    );
  }
}
