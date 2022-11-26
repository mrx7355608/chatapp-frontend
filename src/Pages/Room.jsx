import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Spinner,
    Text,
    Heading,
    Flex,
    Input,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { joinRoom } from "../Services/roomServices";
import RoomHeader from "../Components/RoomHeader";
import MessagesContainer from "../Components/MessagesContainer";
import SendMessage from "../Components/SendMessage";
import { useAuth } from "../Contexts/AuthContext";
import { useRoom } from "../Contexts/RoomContext";
import RoomError from "../Components/Errors/RoomError";
import AskRoomPassword from "../Components/AskRoomPassword";

export default function Room() {
    const { state } = useAuth();
    const { roomid } = useParams();
    const { colorMode } = useColorMode();
    const { roomData, dispatch } = useRoom();
    const [roomPassword, setRoomPassword] = React.useState(null);
    const navigateTo = useNavigate();

    React.useEffect(() => {
        // Hit api to join room
        if (!roomData.askPassword && roomPassword) {
            joinRoom(roomid, roomPassword, state.accessToken)
                .then((room) => {
                    dispatch({ type: "ROOM_FETCHED", room });
                })
                .catch((error) => {
                    dispatch({ type: "ERROR", error });
                });
        }
    }, [roomData.askPassword]);

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
