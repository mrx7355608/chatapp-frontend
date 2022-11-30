/* eslint-disable no-underscore-dangle */
import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { useAuth } from "../../../Contexts/AuthContext";
import { useSocket } from "../../../Contexts/SocketContext";
import { getRoomMessages } from "../../../Services/roomServices";

export default function MessagesContainer({ messages, setMessages }) {
    const { roomid } = useParams();
    const { socket } = useSocket();
    const { state } = useAuth();
    const msgContainerRef = React.useRef();
    const [loading, setLoading] = React.useState(true);

    // Fetch messages
    React.useEffect(() => {
        getRoomMessages(roomid, state.accessToken)
            .then((resp) => {
                setLoading(false);
                setMessages([...messages, ...resp.data.data]);
            })
            .catch((err) => console.log({ fetchMessagesErr: err.message }));

        // Listen for incoming messages
        socket.on("room:new-message-received", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("room:new-message-received");
        };
    }, []);

    // Auto Scroll the messages container to bottom
    React.useEffect(() => {
        const container = msgContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <Flex
            my="3"
            height="400px"
            overflow="scroll"
            alignItems="start"
            direction="column"
            scrollBehavior="smooth"
            ref={msgContainerRef}
        >
            {loading ? (
                <Spinner />
            ) : (
                messages.map((message) => (
                    <Message key={message._id} messageObj={message} />
                ))
            )}
        </Flex>
    );
}
