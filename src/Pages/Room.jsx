import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import RoomHeader from "../Components/RoomHeader";
import MessagesContainer from "../Components/MessagesContainer";
import SendMessage from "../Components/SendMessage";
import { useAuth } from "../Contexts/AuthContext";

export default function Room() {
    const { colorMode } = useColorMode();
    const { state } = useAuth();
    const navigateTo = useNavigate();

    React.useEffect(() => {
        if (!state.accessToken) navigateTo("/");
    }, []);
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
