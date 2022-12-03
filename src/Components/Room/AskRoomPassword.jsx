import React from "react";
import { Box, Flex, Heading, Input, Button, useToast } from "@chakra-ui/react";
import { useRoom } from "../../Contexts/RoomContext";

export default function AskRoomPassword({
    roomPassword,
    setRoomPassword,
    navigateTo,
}) {
    const { dispatch } = useRoom();
    const toast = useToast();

    return (
        <Flex my="6" mx="auto" gap="3" direction="column" maxWidth="350px">
            <Heading>Join Room</Heading>
            <Input
                type="password"
                placeholder="Room password"
                name="room-password"
                onChange={(e) => setRoomPassword(e.target.value)}
            />
            <Box>
                <Button
                    width="48%"
                    mr="3"
                    colorScheme="orange"
                    onClick={() => {
                        if (!roomPassword) {
                            return toast({
                                title: "Enter room password",
                                status: "error",
                                isClosable: true,
                                duration: 3000,
                            });
                        }
                        dispatch({ type: "ASK_PASSWORD" });
                    }}
                >
                    Join
                </Button>
                <Button
                    width="48%"
                    colorScheme="blue"
                    onClick={() => navigateTo("/")}
                >
                    Cancel
                </Button>
            </Box>
        </Flex>
    );
}
