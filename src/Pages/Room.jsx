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
import RoomHeader from "../Components/Room/RoomHeader";
import MessagesContainer from "../Components/Room/Messages/MessagesContainer";
import SendMessage from "../Components/Room/Messages/SendMessage";
import { useAuth } from "../Contexts/AuthContext";
import { useRoom } from "../Contexts/RoomContext";
import RoomError from "../Components/Errors/RoomError";
import AskRoomPassword from "../Components/Room/AskRoomPassword";
import { useSocket } from "../Contexts/SocketContext";
import socketHandler from "../Actions/socketHandler";
import UsersContainer from "../Components/Room/Users/UsersContainer";

export default function Room() {
    const { state } = useAuth();
    const { roomid } = useParams();
    const { colorMode } = useColorMode();
    const { roomData, dispatch } = useRoom();
    const [roomPassword, setRoomPassword] = React.useState("");
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
