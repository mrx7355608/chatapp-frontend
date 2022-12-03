/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Container, Flex, Heading, useColorMode, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";
import useIsLoggedIn from "../Hooks/useIsLoggedIn";

export default function Signup() {
    useIsLoggedIn(); // if user is already logged in, navigate to the homepage
    const { colorMode } = useColorMode();

    return (
        <Flex alignItems="center" justify="center" w="100vw" minHeight="80vh">
            <Container maxWidth="350px" rounded="lg" p="4">
                <Heading textAlign="center" mb="3">
                    Login
                </Heading>
                {/* LOGIN FORM */}
                <LoginForm />
                <Text
                    textAlign="center"
                    color={colorMode === "light" ? "gray.700" : "gray.200"}
                    my="5"
                >
                    Don't have an account?
                    <Text as="b" color="orange.400">
                        <Link to="/signup"> Signup</Link>
                    </Text>
                </Text>
            </Container>
        </Flex>
    );
}
