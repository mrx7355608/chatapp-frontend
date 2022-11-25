import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useRoom } from "../Contexts/RoomContext";

export default function RoomHeader() {
    const { roomData } = useRoom();
    const { name } = roomData.room;

    return (
        <Flex justify="space-between" w="full">
            <Heading display="inline">
                {name.substring(0, 1).toUpperCase() + name.substring(1)}
            </Heading>
            <Button colorScheme="red">Disconnect</Button>
        </Flex>
    );
}
