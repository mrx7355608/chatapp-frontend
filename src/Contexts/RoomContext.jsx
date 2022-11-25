import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const initialState = {
    room: {},
    error: undefined,
    loading: true,
};
const RoomContext = React.createContext();
export const useRoom = () => React.useContext(RoomContext);

export default function RoomProvider({ children }) {
    const { state } = useAuth();
    const navigateTo = useNavigate();
    const [roomData, setRoomData] = React.useState(initialState);

    // If user is not logged in, navigate to homepage
    React.useEffect(() => {
        if (!state.accessToken) navigateTo("/");
        console.log("auth");
    }, [state.accessToken]);

    return (
        <RoomContext.Provider value={{ roomData, setRoomData }}>
            {children}
        </RoomContext.Provider>
    );
}
