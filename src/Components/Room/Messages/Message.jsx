import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../../../Contexts/AuthContext";

export default function Message({ messageObj }) {
    const { message, sender } = messageObj;
    const { state } = useAuth();

    return (
        <Flex
            alignSelf={
                sender.username === state.user.username ? "end" : "start"
            }
            direction={
                sender.username === state.user.username ? "row-reverse" : "row"
            }
            alignItems="center"
        >
            <Image
                w="30px"
                rounded="full"
                src={import.meta.env.VITE_API_URL + sender.photo}
            />

            <Box
                maxWidth="350px"
                mx="3"
                my="2"
                bgColor="red.400"
                px="3"
                py="1.5"
                pt="2"
                rounded="lg"
            >
                <Text color="gray.800" as="b">
                    {message}
                </Text>
            </Box>
        </Flex>
    );
}
