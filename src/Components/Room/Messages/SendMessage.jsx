import React from "react";
import EmojiPicker from "emoji-picker-react";
import { Flex, Input, Button, useToast, Box } from "@chakra-ui/react";
import { BsEmojiWink } from "react-icons/bs";
import { useSocket } from "../../../Contexts/SocketContext";
import { useAuth } from "../../../Contexts/AuthContext";

export default function SendMessage({ setMessages }) {
    const msgRef = React.useRef(null);
    const [showEmoji, setShowEmoji] = React.useState(false);
    const toast = useToast();
    const { state } = useAuth();
    const { socket } = useSocket();

    // Send message handler
    const sendMessage = () => {
        const message = msgRef.current.value;
        if (!message) {
            return toast({
                title: "Cannot send empty message",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        }
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
        <Flex w="full" alignItems="center">
            <form
                style={{ width: "100%" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
            >
                <Input
                    variant="outline"
                    placeholder="Type your message here."
                    pt="1"
                    size="lg"
                    flex="3"
                    w="83%"
                    ref={msgRef}
                />
                <Box pos="absolute" top="20%" right="10%">
                    {showEmoji && (
                        <EmojiPicker
                            onEmojiClick={({ emoji }) => {
                                msgRef.current.value += emoji;
                            }}
                        />
                    )}
                </Box>
                <Button
                    onClick={() => setShowEmoji(!showEmoji)}
                    colorScheme="orange"
                    mx="3"
                >
                    <BsEmojiWink size="20px" />
                </Button>
                <Button pt="1" type="submit" colorScheme="green">
                    Send
                </Button>
            </form>
        </Flex>
    );
}
