import React from "react";
import { Flex } from "@chakra-ui/react";
import Message from "./Message";

export default function MessagesContainer() {
    return (
        <Flex
            my="3"
            height="400px"
            overflow="scroll"
            alignItems="start"
            direction="column"
        >
            <Message />
        </Flex>
    );
}
