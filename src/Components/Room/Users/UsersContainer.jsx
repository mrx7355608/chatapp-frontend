import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import UserBox from "./UserBox";
import { useSocket } from "../../../Contexts/SocketContext";
import { getRoomUsers } from "../../../Services/roomServices";
import { useAuth } from "../../../Contexts/AuthContext";

export default function UsersContainer() {
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const { socket } = useSocket();
    const { roomid } = useParams();
    const { state } = useAuth();

    React.useEffect(() => {
        // Fetch room users
        getRoomUsers(roomid, state.accessToken)
            .then((resp) => {
                setUsers(resp.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
            });

        socket.on("room:user-left", (user) => {
            setUsers((prev) => [
                ...prev.filter((u) => u.username !== user.username),
            ]);
        });

        socket.on("room:new-user-joined", (user) => {
            const isUser = users.filter((u) => u.username === user.username);
            if (isUser[0]) return;
            setUsers((prev) => [...prev, user]);
        });
    }, []);

    return (
        <Flex
            w="20%"
            minWidth="300px"
            maxWidth="500px"
            direction="column"
            overflow="scroll"
            scrollBehavior="smooth"
            p="4"
            h="100vh"
        >
            {loading ? (
                <Spinner />
            ) : (
                users.map((user) => <UserBox key={user._id} user={user} />)
            )}
        </Flex>
    );
}
