"use client";

import React from 'react'
import { Popover, Button, TextInput, Select } from "@mantine/core";
import classes from "./ListItems.module.css";
import { useForm } from "@mantine/form";


export function EditButton({ data }: any) {

    const form = useForm({
        initialValues: {
          itemName: data.itemName,
          itemSN: data.itemSN,
          itemAssetTag: data.itemAssetTag,
          itemCategory: data.itemCategory,
        },
      });

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/update-item", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ form }),
            });
            if (response.ok) {
              console.log("Successfully removed item");
            } else {
              console.error("Did not remove item");
            }
          } catch (error) {
            console.error(error);
          }  
    }

    return (
        <>
            <Popover>
                <Popover.Target>
                    <Button className={classes.button} variant="subtle" size="xs" color="gray">Edit</Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <form onSubmit={handleSubmit}>
                        <TextInput label="Item Name" defaultValue={form.values.itemName} {...form.getInputProps("itemName")} />
                        <TextInput label="Serial Number" defaultValue={data.itemSN} {...form.getInputProps("itemSN")} />
                        <TextInput label="Asset Tag" defaultValue={data.itemAssetTag} {...form.getInputProps("itemAssetTag")} />
                        <Select label="Category" data={["Desktop", "Laptop", "Server", "Networking Equipment", "UPS", "Component", "Other"]} defaultValue={form.values.itemCategory} {...form.getInputProps("itemCategory")} />
                        <Button type="submit" variant="light" size="xs" color="gray">Submit</Button>
                    </form>
                </Popover.Dropdown>
            </Popover>
        </>
    )
}