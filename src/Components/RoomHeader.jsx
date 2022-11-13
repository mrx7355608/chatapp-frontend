import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";

export default function RoomHeader() {
    return (
        <Flex justify="space-between" w="full">
            <Heading display="inline">Room</Heading>
            <Button colorScheme="red">Disconnect</Button>
        </Flex>
    );
}
