import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useRoom } from "../Contexts/RoomContext";
import { useSocket } from "../Contexts/SocketContext";
import { joinRoom, socketConnection } from "../Services/roomServices";

export default function useJoinRoom(roomPassword) {
    const { roomData, dispatch } = useRoom();
    const { state } = useAuth();
    const { setSocket } = useSocket();
    const { roomid } = useParams();

    React.useEffect(() => {
        if (!roomData.askPassword && roomPassword) {
            joinRoom(roomid, roomPassword, state.accessToken)
                .then((room) => {
                    dispatch({ type: "ROOM_FETCHED", room });

                    const sock = socketConnection();
                    setSocket(sock);
                })
                .catch((error) => {
                    dispatch({ type: "ERROR", error });
                });
        }
    }, [roomData.askPassword]);
}
