/* eslint-disable operator-linebreak */
import React from "react";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";
import { Button, Image, Flex, Heading, Text } from "@chakra-ui/react";
import useLogout from "../../Hooks/useLogout";
import { useAuth } from "../../Contexts/AuthContext";

export default function Navbar() {
    const { state } = useAuth();
    const logout = useLogout();

    return (
        <Flex
            position="sticky"
            zIndex="20"
            top="0"
            w="full"
            py="7"
            justify="space-around"
        >
            {/* LOGO */}
            <Flex alignItems="center">
                <FaRocketchat color="#d53f8c" size="30px" />
                <Heading color="white" ml="2" fontSize="xl">
                    Chatclub
                </Heading>
            </Flex>
            {/* NAV LINKS */}
            <Flex alignItems="center" gap="8">
                <Link to="/">
                    <Text color="white" as="b" fontSize="xs">
                        HOME
                    </Text>
                </Link>
                {Object.keys(state.user).length ? (
                    <>
                        <Flex alignItems="center" gap="2">
                            <Image
                                display="inline"
                                w="40px"
                                rounded="full"
                                src={
                                    import.meta.env.VITE_API_URL +
                                    state.user.photo
                                }
                            />
                            <Text color="white" as="b" fontSize="sm">
                                {state.user.fullname}
                            </Text>
                        </Flex>
                        <Button
                            p="3"
                            colorScheme="purple"
                            rounded="lg"
                            onClick={logout}
                        >
                            <Text as="b" fontSize="xs">
                                LOGOUT
                            </Text>
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Text color="white" as="b" fontSize="xs">
                                LOGIN
                            </Text>
                        </Link>
                        <Link to="/signup">
                            <Button
                                colorScheme="pink"
                                px="4"
                                py="2"
                                pt="2"
                                rounded="md"
                                as="b"
                                fontSize="xs"
                            >
                                SIGNUP
                            </Button>
                        </Link>
                    </>
                )}
            </Flex>
        </Flex>
    );
}
