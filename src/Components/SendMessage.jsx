import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { BsEmojiWink } from "react-icons/bs";
import { useSocket } from "../Contexts/SocketContext";

export default function SendMessage() {
    const msgRef = React.useRef(null);
    const { socket } = useSocket();

    // Send message handler
    const sendMessage = () => {
        const message = msgRef.current.value;
        console.log(message);
        socket.emit("room:new-message", message);
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
