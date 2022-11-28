/* eslint-disable consistent-return */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Spinner,
    Text,
    Flex,
    useColorMode,
    useToast,
} from "@chakra-ui/react";
import { joinRoom, socketConnection } from "../Services/roomServices";
import RoomHeader from "../Components/RoomHeader";
import MessagesContainer from "../Components/MessagesContainer";
import SendMessage from "../Components/SendMessage";
import { useAuth } from "../Contexts/AuthContext";
import { useRoom } from "../Contexts/RoomContext";
import RoomError from "../Components/Errors/RoomError";
import AskRoomPassword from "../Components/AskRoomPassword";
import SocketProvider, { useSocket } from "../Contexts/SocketContext";
import socketHandler from "../Actions/socketHandler";

export default function Room() {
    const { state } = useAuth();
    const { roomid } = useParams();
    const { colorMode } = useColorMode();
    const { roomData, dispatch } = useRoom();
    const [roomPassword, setRoomPassword] = React.useState(null);
    const navigateTo = useNavigate();
    const toast = useToast();
    const { socket, setSocket } = useSocket();
    const [messages, setMessages] = React.useState([]);

    // Hit api to join room
    React.useEffect(() => {
        if (!roomData.askPassword && roomPassword) {
            joinRoom(roomid, roomPassword, state.accessToken)
                .then((room) => {
                    dispatch({ type: "ROOM_FETCHED", room });
                    // Establish a socket connection
                    const sock = socketConnection();
                    setSocket(sock);
                })
                .catch((error) => {
                    dispatch({ type: "ERROR", error });
                });
        }
    }, [roomData.askPassword]);

    // Emitting socket events
    React.useEffect(() => {
        if (!socket) return;
        socketHandler(socket, state.accessToken, roomid, toast);
        return () => {
            socket.off("room:user-left");
            socket.off("room:new-user-joined");
            socket.off("room:join");
            socket.off("connect_error");
        };
    }, [socket]);

    // Ask for room password
    if (roomData.askPassword) {
        return (
            <AskRoomPassword
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
        <Flex alignItems="center" justify="center" w="100vw">
            <Box
                my="5"
                width="800px"
                p="6"
                bgColor={colorMode === "light" ? "gray.50" : "gray.700"}
                shadow="md"
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
