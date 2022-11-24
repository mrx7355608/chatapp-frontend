import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Heading,
    Flex,
    Box,
    useColorMode,
    Input,
    Button,
} from "@chakra-ui/react";
import RoomHeader from "../Components/RoomHeader";
import MessagesContainer from "../Components/MessagesContainer";
import SendMessage from "../Components/SendMessage";
import { useAuth } from "../Contexts/AuthContext";
import useRoom from "../Hooks/useRoom";

export default function Room() {
    const [roomPassword, setRoomPassword] = React.useState(null);
    const [askPassword, setAskPassword] = React.useState(true);
    const { colorMode } = useColorMode();
    const { state } = useAuth();
    const navigateTo = useNavigate();
    const getRoomData = useRoom();
    const { roomid } = useParams();

    // If user is not logged in, navigate to homepagej
    React.useEffect(() => {
        if (!state.accessToken) navigateTo("/");
    }, []);

    // Fetch room data
    React.useEffect(() => {
        if (!askPassword && roomPassword) {
            getRoomData(roomid, roomPassword);
        }
    }, [askPassword, roomPassword]);

    // Establish a socket connection
    React.useEffect(() => {
        if (!askPassword && roomPassword) {
            console.log("Connecting to socket server");
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
