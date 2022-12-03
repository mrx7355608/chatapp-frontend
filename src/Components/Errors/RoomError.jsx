import React from "react";
import { Text, Button, Flex } from "@chakra-ui/react";
import { useRoom } from "../../Contexts/RoomContext";

export default function RoomError({ error, setRoomPassword }) {
    const { dispatch } = useRoom();

    return (
        <Flex
            direction="column"
            alignItems="center"
            justify="center"
            w="100vw"
            h="80vh"
        >
            <Text fontSize="x-large" mb="5" color="red.500">
                {error.message}
            </Text>
            <Button
                onClick={() => {
                    setRoomPassword("");
                    dispatch({ type: "RETRY" });
                }}
            >
                Retry
            </Button>
        </Flex>
    );
}
