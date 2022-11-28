/* eslint-disable react/prop-types */
import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import { useAuth } from "../Contexts/AuthContext";
import { useSocket } from "../Contexts/SocketContext";

export default function MessagesContainer({ messages, setMessages }) {
    const [loading, setLoading] = React.useState(true);
    const { roomid } = useParams();
    const { socket } = useSocket();
    const { state } = useAuth();
    const msgContainerRef = React.useRef();

    React.useEffect(() => {
        // Fetch messages
        const url = `${import.meta.env.VITE_API_URL}/rooms/${roomid}/messages`;
        axios
            .get(url, {
                headers: { authorization: `Bearer ${state.accessToken}` },
            })
            .then((resp) => {
                setLoading(false);
                setMessages([...messages, ...resp.data.data]);
            })
            .catch((err) => console.log(err.message));

        // Listen for incoming messages
        socket.on("room:new-message-received", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("room:new-message-received");
        };
    }, []);

    React.useEffect(() => {
        if (msgContainerRef.current) {
            msgContainerRef.current.scrollTop =
                msgContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (loading) return <Spinner />;

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
            {messages.map((message) => (
                <Message messageObj={message} />
            ))}
        </Flex>
    );
}
