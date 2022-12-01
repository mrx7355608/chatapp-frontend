import React from "react";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Contexts/SocketContext";
import { useAuth } from "../Contexts/AuthContext";

export default function useSocketHandler() {
    const toast = useToast();
    const { socket } = useSocket();
    const { state } = useAuth();
    const { roomid } = useParams();

    React.useEffect(() => {
        if (!socket) return;
        socket.auth = { token: state.accessToken, roomid };
        socket.connect();

        // Error while connecting to socket server
        socket.on("connect_error", (data) => console.log(data));

        // Join room as socket
        socket.emit("room:join");

        // When a new user joins
        socket.on("room:new-user-joined", (data) => {
            toast({
                title: `${data.username} has joined the room`,
                status: "info",
                duration: 2000,
            });
        });

        // When a user leaves the room
        socket.on("room:user-left", (data) => {
            toast({
                title: `${data.username} disconnected`,
                status: "error",
                duration: 2000,
            });
        });
        return () => {
            socket.off("room:user-left");
            socket.off("room:new-user-joined");
            socket.off("room:join");
            socket.off("connect_error");
        };
    }, [socket]);
}
