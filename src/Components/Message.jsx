/* eslint-disable react/prop-types */
import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../Contexts/AuthContext";

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
                mx="3"
                my="2"
                bgColor="red.400"
                px="3"
                py="2"
                pt="3"
                rounded="lg"
            >
                <Text color="white" as="b">
                    {message}
                </Text>
            </Box>
        </Flex>
    );
}
