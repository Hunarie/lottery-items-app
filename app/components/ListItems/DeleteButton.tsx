"use client";
import React from "react";
import { Button } from "@mantine/core";
import classes from "./ListItems.module.css";

export function DeleteButton({ data }: any) {
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/delete-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (response.ok) {
        console.log("Successfully removed item");
      } else {
        console.error("Did not remove item");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleSubmit}
        className={classes.button}
        variant="subtle"
        size="xs"
        color="gray"
      >
        Delete
      </Button>
    </>
  );
}
