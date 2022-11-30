import React from "react";
import { Flex, Heading, Input, Button, useToast } from "@chakra-ui/react";
import { useRoom } from "../../Contexts/RoomContext";

export default function AskRoomPassword({
    roomPassword,
    setRoomPassword,
    navigateTo,
}) {
    const { dispatch } = useRoom();
    const toast = useToast();

    return (
        <Flex>
            <Heading>Join Room</Heading>
            <Input
                placeholder="Room password"
                type="text"
                name="room-password"
                onChange={(e) => setRoomPassword(e.target.value)}
            />
            <Button
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
            <Button onClick={() => navigateTo("/")}>Cancel</Button>
        </Flex>
    );
}
