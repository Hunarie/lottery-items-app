"use client";
import { Paper, Button, Title, Text, Center } from "@mantine/core";
import classes from "./SignInPage.module.css";
import { IconBrandAzure } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export function SignInPage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to the Lottery!
        </Title>
        <Center>
          <Text size="md" className={classes.loginText} mb={10}>
            Login with
          </Text>
        </Center>
        <Button fullWidth color="gray" onClick={() => signIn("azure-ad")}>
          <IconBrandAzure />
          Microsoft
        </Button>
      </Paper>
    </div>
  );
}
