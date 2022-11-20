/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Container, Flex, Heading, useColorMode, Text } from "@chakra-ui/react";
import { Link, useNavigation, useNavigate } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import { useAuth } from "../Contexts/AuthContext";

export default function Signup() {
    const { colorMode } = useColorMode();

    return (
        <Flex alignItems="center" justify="center" w="100vw" minHeight="100vh">
            <Container
                maxWidth="400px"
                rounded="lg"
                my="4"
                p="4"
                bgColor={colorMode === "light" ? "gray.50" : "gray.700"}
            >
                <Heading textAlign="center" mt="6" mb="8">
                    Login
                </Heading>
                <LoginForm />
                <Text
                    textAlign="center"
                    color={colorMode === "light" ? "gray.700" : "gray.200"}
                    my="5"
                >
                    Don't have an account?
                    <Text as="b" color="red.500">
                        <Link to="/signup"> Signup</Link>
                    </Text>
                </Text>
            </Container>
        </Flex>
    );
}
