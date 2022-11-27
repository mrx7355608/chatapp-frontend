import axios from "axios";
import { io } from "socket.io-client";

const joinRoom = async (roomid, roomPassword, accessToken) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/rooms/join`;
        const resp = await axios.post(
            url,
            { roomid, roomPassword },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return resp.data.data.room;
    } catch (err) {
        if (err.response) throw new Error(err.response.data.message);
        throw new Error("It seems that the server is down");
    }
};
const getRoomData = () => {};
const createRoom = () => {};
const socketConnection = () => {
    const apiurl = import.meta.env.VITE_API_URL;
    const socket = io(apiurl, { autoConnect: false });
    return socket;
};

export { joinRoom, getRoomData, createRoom, socketConnection };
