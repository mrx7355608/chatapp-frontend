/* eslint-disable */
import React from "react";
import MySpinner from "../Components/Custom/MySpinner";
import authReducer from "../Actions/Reducers/authReducer";

const AuthContext = React.createContext(null);
// Hook for using AuthContext
const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
    const initialState = {
        user: {},
        accessToken: undefined,
        error: {},
        isPending: false,
    };
    const [state, dispatch] = React.useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };
