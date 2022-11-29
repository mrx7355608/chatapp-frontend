import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { BsEmojiWink } from "react-icons/bs";
import { useSocket } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/AuthContext";

export default function SendMessage({ setMessages }) {
    const msgRef = React.useRef(null);
    const { state } = useAuth();
    const { socket } = useSocket();

    // Send message handler
    const sendMessage = () => {
        const message = msgRef.current.value;
        socket.emit("room:new-message", message);
        // Update messages array
        const myMessage = {
            sender: {
                username: state.user.username,
                photo: state.user.photo,
            },
            message,
        };
        setMessages((prev) => [...prev, myMessage]);
        msgRef.current.value = "";
    };

    return (
        <Flex>
            <Input
                variant="filled"
                placeholder="Type your message here."
                pt="1"
                size="lg"
                flex="3"
                w="70%"
                ref={msgRef}
            />
            <Button colorScheme="blue" mx="3">
                <BsEmojiWink size="20px" />
            </Button>
            <Button onClick={sendMessage} colorScheme="green">
                Send
            </Button>
        </Flex>
    );
}
