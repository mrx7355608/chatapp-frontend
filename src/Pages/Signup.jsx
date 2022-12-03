/* eslint-disable react/no-unescaped-entities */
/* eslint-disable object-curly-newline */
import React from "react";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SignupForm from "../Components/Signup/SignupForm";
import useIsLoggedIn from "../Hooks/useIsLoggedIn";

export default function Signup() {
    useIsLoggedIn(); // if user is already logged in, navigate to the homepage

    return (
        <Flex alignItems="center" justify="center" w="100vw" minHeight="80vh">
            <Container maxWidth="350px" rounded="lg" p="4">
                <Heading textAlign="center" mb="3">
                    Signup
                </Heading>
                <SignupForm />
                <Text textAlign="center" my="5">
                    Already have an account?
                    <Text as="b" color="orange.400">
                        <Link to="/login"> Login</Link>
                    </Text>
                </Text>
            </Container>
        </Flex>
    );
}
