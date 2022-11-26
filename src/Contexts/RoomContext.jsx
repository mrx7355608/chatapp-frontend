/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import roomReducer from "../Actions/Reducers/roomReducer";
import { useAuth } from "./AuthContext";

const initialState = {
    room: {},
    error: undefined,
    loading: true,
    askPassword: true,
};
const RoomContext = React.createContext();
export const useRoom = () => React.useContext(RoomContext);

export default function RoomProvider({ children }) {
    const { state } = useAuth();
    const navigateTo = useNavigate();
    const [roomData, dispatch] = React.useReducer(roomReducer, initialState);

    // If user is not logged in, navigate to homepage
    React.useEffect(() => {
        if (!state.accessToken) navigateTo("/");
    }, [state.accessToken]);

    return (
        <RoomContext.Provider value={{ roomData, dispatch }}>
            {children}
        </RoomContext.Provider>
    );
}
