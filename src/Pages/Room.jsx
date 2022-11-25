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

export default function Room() {
    const { roomData, setRoomData } = useRoom();
    const d = useRoom();
    const navigateTo = useNavigate();
    const { colorMode } = useColorMode();
    const { state } = useAuth();
    const { roomid } = useParams();
    const [askPassword, setAskPassword] = React.useState(true);
    const [roomPassword, setRoomPassword] = React.useState(null);

    React.useEffect(() => {
        // Hit api to join room
        if (!askPassword && roomPassword) {
            joinRoom(roomid, roomPassword, state.accessToken)
                .then((room) => {
                    console.log(room);
                    setRoomData({ ...roomData, loading: false, room });
                })
                .catch((err) => console.log(err.message));
        }
    }, [askPassword, roomPassword]);

    // Ask for room password
    if (askPassword) {
        return (
            <Flex>
                <Heading>Join Room</Heading>
                <Input
                    placeholder="Room password"
                    onChange={(e) => setRoomPassword(e.target.value)}
                />
                <Button onClick={() => setAskPassword(false)}>Join</Button>
                <Button onClick={() => navigateTo("/")}>Cancel</Button>
            </Flex>
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
