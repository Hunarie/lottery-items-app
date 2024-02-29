"use client";

import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Group, Box, Popover, Select, Accordion } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates'
import { useState } from 'react';
import ItemFields from './ItemFields';

export default function CreateForm() {
    const form = useForm({
        initialValues: {
            formTitle: '',
            startDate: '',
            endDate: '',
        }
    })
    
    const [startDateValue] = useState<Date | null>(null);
    const [endDateValue] = useState<Date | null>(null);

    const [data, setData] = useState([] as JSX.Element[])

    function addToArray() {
        setData(
            [
                ...data,
                <ItemFields key={1} />
            ]
        )
    }

    const items = data.map((item: any) => (
        item
    ));
    
    return (
        <Box mx="auto" maw={800}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput label="Form Title" {...form.getInputProps('formTitle')} />
                <DatePickerInput label="Start Date" placeholder='Pick date' value={startDateValue} {...form.getInputProps('startDate')} />
                <DatePickerInput label="End Date" placeholder='Pick date' value={endDateValue} {...form.getInputProps('endDate')} />
                <Button color='gray' mt={10} miw={800} onClick={addToArray}>+ Add New</Button>
                {items}
                <br />
                <Button type='submit' color="gray" mt={10} mb={10} miw={800}>Create</Button>
            </form>
        </Box>
    )
}