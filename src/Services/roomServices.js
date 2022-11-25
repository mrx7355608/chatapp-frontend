import axios from "axios";

const joinRoom = async (roomid, roomPassword, accessToken) => {
    try {
        console.log({ roomid, roomPassword, accessToken });
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

export { joinRoom, getRoomData, createRoom };
