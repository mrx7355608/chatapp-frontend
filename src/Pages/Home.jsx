// eslint-disable-next-line object-curly-newline
import { Flex, Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

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
                <Button pt="0.5" color="white" bgColor="#F3664C" mr="8">
                    Create Room
                </Button>
                <Button pt="0.5" color="white" bgColor="#F3664C">
                    Join Room
                </Button>
            </Box>
        </Flex>
    );
}
