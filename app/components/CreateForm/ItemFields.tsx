import { Box, Select, Text, TextInput } from "@mantine/core";

export default function ItemFields() {
    return (
        <div>
            <TextInput label="Item Name" mt={10}/>
            <TextInput label="Serial Number" ml={100} />
            <TextInput label="Asset Tag" ml={100} />
            <Select label="Category" mb={70} ml={100} data={["Desktop", "Laptop", "Server", "Networking Equipment", "UPS", "Component", "Other"]} />
        </div>
    )
}