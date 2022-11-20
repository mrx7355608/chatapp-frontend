import React from "react";
import { Input, Text, useColorMode, Spinner, Button } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

export default function LoginForm() {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: "",
    });
    const { colorMode } = useColorMode();
    const { state, dispatch } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: "MAKE_REQUEST" });
        const apiUrl = `${import.meta.env.VITE_API_URL}/auth/login`;
        axios
            .post(apiUrl, loginData, { withCredentials: true })
            .then((resp) => console.log(resp.json()))
            .catch((err) => {
                if (err.response) {
                    // other than 2xx status code errors
                    const errorMessage = err.response.data.message;
                    dispatch({ type: "LOGIN_ERROR", error: errorMessage });
                } else if (err.request) {
                    // Didn't received a response
                    dispatch({
                        type: "LOGIN_ERROR",
                        error: "There was a problem while making request to the server",
                    });
                } else {
                    // Some error that occured while setting up the request
                    dispatch({
                        type: "LOGIN_ERROR",
                        error: "There was a problem while making request to the server",
                    });
                }
            });
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} method="post">
            {state.error && (
                <Text
                    w="full"
                    p="3"
                    rounded="md"
                    bgColor="red.200"
                    color="red.800"
                    pt="3.5"
                    mt="3"
                >
                    {state.error}
                </Text>
            )}
            <Input
                type="text"
                name="username"
                variant="filled"
                bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                pt="1.5"
                size="md"
                mt="3"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
            />
            {/* {loginErrors?.username && (
                <Text mt="1" fontSize="sm" as="b" color="red.500">
                    {loginErrors.username}
                </Text>
            )} */}
            <Input
                type="password"
                name="password"
                variant="filled"
                bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                pt="1.5"
                size="md"
                placeholder="Password"
                mt="3"
                onChange={(e) => handleChange(e)}
            />
            {/* {loginErrors?.password && (
                <Text mt="1" fontSize="sm" as="b" color="red.500">
                    {loginErrors.password}
                </Text>
            )} */}
            {state.isPending ? (
                <Button
                    mt="8"
                    disabled
                    size="md"
                    w="full"
                    color="white"
                    type="button"
                    bgColor="#F3664C"
                >
                    <Spinner mr="2" size="sm" />
                    <Text pt="1">Logging in...</Text>
                </Button>
            ) : (
                <Button
                    mt="8"
                    type="submit"
                    size="md"
                    pt="1"
                    w="full"
                    color="white"
                    bgColor="#F3664C"
                >
                    Login
                </Button>
            )}
        </form>
    );
}
