// eslint-disable-next-line object-curly-newline
import { Flex, Box, Heading } from "@chakra-ui/react";
import React from "react";
// Components
import CreateRoom from "../Components/CreateRoom";
import JoinRoom from "../Components/JoinRoom";

export default function Home() {
    return (
        <Flex
            direction="column"
            minHeight="85vh"
            alignItems="center"
            justify="center"
        >
            <Heading textAlign="center" fontSize="5xl">
                Lets chat...
            </Heading>
            <Box mt="8" w="max-content" mx="auto">
                <CreateRoom />
                <JoinRoom />
            </Box>
        </Flex>
    );
}
