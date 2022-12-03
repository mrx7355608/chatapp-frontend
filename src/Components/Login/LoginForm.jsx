import React from "react";
import { Input, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../Contexts/AuthContext";
import useLogin from "../../Hooks/useLogin";
import LoadingFormButton from "../Custom/LoadingFormButton";

export default function LoginForm() {
    const [loginData, setLoginData] = React.useState({
        username: "",
        password: "",
    });
    const { state } = useAuth();
    const login = useLogin();
    const { error } = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        login(loginData);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} method="post">
            {error.type === "api" && (
                <Text
                    w="full"
                    p="3"
                    rounded="md"
                    bgColor="red.200"
                    color="red.800"
                    pt="3.5"
                    mt="3"
                >
                    {error.message}
                </Text>
            )}
            <Input
                type="text"
                name="username"
                variant="outline"
                pt="1.5"
                size="md"
                mt="3"
                placeholder="Username"
                onChange={(e) => handleChange(e)}
            />
            <Text mt="1" color="red.500">
                {error.type === "username" && error.message}
            </Text>
            <Input
                type="password"
                name="password"
                variant="outline"
                pt="1.5"
                size="md"
                placeholder="Password"
                mt="3"
                onChange={(e) => handleChange(e)}
            />
            <Text mt="1" color="red.500">
                {error.type === "password" && error.message}
            </Text>
            {state.isPending ? (
                <LoadingFormButton btnText="Logging in ..." />
            ) : (
                <Button
                    mt="8"
                    type="submit"
                    size="md"
                    pt="1"
                    w="full"
                    colorScheme="orange"
                >
                    Login
                </Button>
            )}
        </form>
    );
}
