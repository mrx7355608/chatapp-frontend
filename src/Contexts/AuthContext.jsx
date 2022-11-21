/* eslint-disable */
import React from "react";
import MySpinner from "../Components/Custom/MySpinner";

const AuthContext = React.createContext(null);

const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
    const initialState = {
        user: {},
        accessToken: undefined,
        error: {},
        isPending: false,
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case "MAKE_REQUEST":
                return { ...state, isPending: true };

            case "LOGIN":
                return {
                    ...state,
                    isPending: false,
                    accessToken: action.token,
                    error: {},
                };

            case "LOGOUT":
                return state;

            case "LOGIN_ERROR":
                return { ...state, isPending: false, error: action.error };
        }
    };
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };
