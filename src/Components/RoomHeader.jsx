import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../Contexts/RoomContext";
import { useSocket } from "../Contexts/SocketContext";

export default function RoomHeader() {
    const navigateTo = useNavigate();
    const { roomData } = useRoom();
    const { name } = roomData.room;
    const { socket, setSocket } = useSocket();

    const disconnect = () => {
        socket.disconnect();
        setSocket(null);
        return navigateTo("/");
    };

    return (
        <Flex justify="space-between" w="full">
            <Heading display="inline">
                {name.substring(0, 1).toUpperCase() + name.substring(1)}
            </Heading>
            <Button onClick={disconnect} colorScheme="red">
                Disconnect
            </Button>
        </Flex>
    );
}
