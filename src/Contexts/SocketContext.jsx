import React from "react";

const SocketContext = React.createContext();
export const useSocket = () => React.useContext(SocketContext);

export default function SocketProvider({ children }) {
    const [socket, setSocket] = React.useState(null);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
}
