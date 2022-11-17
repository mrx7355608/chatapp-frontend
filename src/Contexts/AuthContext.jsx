/* eslint-disable */
import React from "react";
import MySpinner from "../Components/Custom/MySpinner";
import useGetUser from "../Hooks/useGetUser";

const AuthContext = React.createContext(null);

const useAuth = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
    const reducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
                return action.user;
            case "LOGOUT":
                return null;
            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(reducer, null);

    // TODO: Handle api errors
    const { loading, error } = useGetUser(dispatch);

    if (loading) return <MySpinner />;

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { useAuth, AuthProvider };
