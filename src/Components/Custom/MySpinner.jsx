import { Spinner, Flex } from "@chakra-ui/react";
import React from "react";

export default function MySpinner() {
    return (
        <Flex alignItems="center" justify="center" w="100vw" h="100vh">
            <Spinner color="#F3664C" />
        </Flex>
    );
}
