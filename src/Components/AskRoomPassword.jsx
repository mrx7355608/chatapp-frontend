/* eslint-disable react/prop-types */
import React from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { useRoom } from "../Contexts/RoomContext";

export default function AskRoomPassword({ setRoomPassword, navigateTo }) {
    const { dispatch } = useRoom();

    return (
        <Flex>
            <Heading>Join Room</Heading>
            <Input
                placeholder="Room password"
                type="text"
                name="room-password"
                onChange={(e) => setRoomPassword(e.target.value)}
            />
            <Button onClick={() => dispatch({ type: "ASK_PASSWORD" })}>
                Join
            </Button>
            <Button onClick={() => navigateTo("/")}>Cancel</Button>
        </Flex>
    );
}
