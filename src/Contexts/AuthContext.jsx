/* eslint-disable */
import React from "react";
import MySpinner from "../Components/Custom/MySpinner";
import useGetUser from "../Hooks/useGetUser";

const AuthContext = React.createContext(null);

const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
    const initialState = {
        user: {},
        accessToken: undefined,
        error: undefined,
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
                };

            case "LOGOUT":
                return state;

            case "LOGIN_ERROR":
                return { ...state, isPending: false, error: action.error };
        }
    };
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // const { loading, error } = useGetUser(dispatch);

    // if (error) throw new Error("It seems that the server is down");
    // if (loading) return <MySpinner />;

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };
