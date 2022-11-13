import React from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import RoomHeader from "../Components/RoomHeader";
import MessagesContainer from "../Components/MessagesContainer";
import SendMessage from "../Components/SendMessage";

export default function Room() {
    const { colorMode } = useColorMode();
    return (
        <Flex alignItems="center" justify="center" w="100vw">
            <Box
                my="5"
                // mx="auto"
                width="800px"
                p="6"
                bgColor={colorMode === "light" ? "gray.50" : "gray.700"}
                shadow="md"
                rounded="lg"
            >
                <RoomHeader />
                <MessagesContainer />
                <SendMessage />
            </Box>
        </Flex>
    );
}
