import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Spinner, Text, Flex, useColorMode } from "@chakra-ui/react";
// Contexts
import { useRoom } from "../Contexts/RoomContext";
// Components
import RoomError from "../Components/Errors/RoomError";
import AskRoomPassword from "../Components/Room/AskRoomPassword";
import RoomHeader from "../Components/Room/RoomHeader";
import MessagesContainer from "../Components/Room/Messages/MessagesContainer";
import SendMessage from "../Components/Room/Messages/SendMessage";
import UsersContainer from "../Components/Room/Users/UsersContainer";
// Hooks
import useSocketHandler from "../Hooks/useSocketHandler";
import useJoinRoom from "../Hooks/useJoinRoom";

export default function Room() {
    const { colorMode } = useColorMode();
    const { roomData } = useRoom();
    const [roomPassword, setRoomPassword] = React.useState("");
    const navigateTo = useNavigate();
    const [messages, setMessages] = React.useState([]);

    // If the room password has been asked then,
    // Hit api to join room
    useJoinRoom(roomPassword);

    // Only connects to socket server when there is a socket object
    useSocketHandler();

    // Ask for room password
    if (roomData.askPassword) {
        return (
            <AskRoomPassword
                roomPassword={roomPassword}
                setRoomPassword={setRoomPassword}
                navigateTo={navigateTo}
            />
        );
    }

    if (roomData.loading) {
        return (
            <Box>
                <Spinner mb="3" />
                <Text>Joining room</Text>
            </Box>
        );
    }

    if (roomData.error) {
        return <RoomError error={roomData.error} />;
    }

    return (
        <Flex w="100vw">
            <UsersContainer />
            <Box
                height="full"
                bgColor={colorMode === "light" ? "gray.200" : "gray.700"}
                width="full"
                p="8"
                mx="3"
                rounded="lg"
            >
                <RoomHeader />
                <MessagesContainer
                    messages={messages}
                    setMessages={setMessages}
                />
                <SendMessage setMessages={setMessages} />
            </Box>
        </Flex>
    );
}
