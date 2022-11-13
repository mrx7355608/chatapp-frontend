import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";

export default function Message() {
    return (
        <Flex
            alignItems="center"
            _even={{
                justify: "end",
            }}
        >
            <Image w="30px" rounded="full" src="/bg.svg" mr="3" />
            <Box bgColor="red.400" px="3" py="2" pt="3" my="2" rounded="lg">
                <Text color="white" as="b">
                    Message fjasdklfjaskl;dfjkl;
                </Text>
            </Box>
        </Flex>
    );
}
