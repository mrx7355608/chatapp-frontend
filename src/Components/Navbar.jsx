import React from "react";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";
// eslint-disable-next-line object-curly-newline
import {
    Button,
    Image,
    useColorMode,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import DarkModeToggle from "./Custom/DarkModeToggle";
import UserContext from "../Contexts/UserContext";
import { setAccessToken } from "../accessToken";
import { logoutUser } from "../requests/authRequests";

export default function Navbar() {
    const { user, setUser } = React.useContext(UserContext);
    const { colorMode } = useColorMode();

    return (
        <Flex
            // bgColor="whiteAlpha.600"
            backdropFilter="blur(2px)"
            position="sticky"
            zIndex="20"
            shadow="sm"
            top="0"
            w="full"
            py="5"
            justify="space-around"
        >
            {/* LOGO */}
            <Flex alignItems="center">
                <FaRocketchat color="#F3664C" size="30px" />
                <Heading
                    color={colorMode === "light" ? "gray.700" : "white"}
                    ml="2"
                    fontSize="xl"
                >
                    Chatclub
                </Heading>
            </Flex>
            {/* NAV LINKS */}
            <Flex alignItems="center" gap="8">
                <Link to="/">
                    <Text
                        color={colorMode === "light" ? "gray.700" : "white"}
                        as="b"
                        fontSize="xs"
                        _hover={{
                            color: "#F3664C",
                        }}
                    >
                        HOME
                    </Text>
                </Link>
                {user ? (
                    <>
                        <Link to="/room">
                            <Text
                                color={
                                    colorMode === "light" ? "gray.700" : "white"
                                }
                                as="b"
                                fontSize="xs"
                                _hover={{
                                    color: "#F3664C",
                                }}
                            >
                                ROOM
                            </Text>
                        </Link>
                        <Flex alignItems="center" gap="2">
                            <Image
                                display="inline"
                                w="40px"
                                rounded="full"
                                src={import.meta.env.VITE_API_URL + user.photo}
                            />
                            <Text
                                color={
                                    colorMode === "light" ? "gray.700" : "white"
                                }
                                as="b"
                                fontSize="sm"
                                _hover={{
                                    color: "#F3664C",
                                }}
                            >
                                {user.fullname}
                            </Text>
                        </Flex>
                        <Button
                            onClick={async () => {
                                const isLoggedOut = await logoutUser();
                                if (!isLoggedOut) return;
                                setUser(null);
                                setAccessToken("");
                            }}
                            p="3"
                            pt="3.5"
                            rounded="lg"
                            bgColor="red.500"
                        >
                            <Text color="white" as="b" fontSize="xs">
                                LOGOUT
                            </Text>
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Text
                                color={
                                    colorMode === "light" ? "gray.700" : "white"
                                }
                                as="b"
                                fontSize="xs"
                                _hover={{
                                    color: "#F3664C",
                                }}
                            >
                                LOGIN
                            </Text>
                        </Link>
                        <Link to="/signup">
                            <Text
                                border="2px"
                                borderColor="#F3664C"
                                px="4"
                                py="2"
                                pt="3"
                                rounded="md"
                                as="b"
                                fontSize="xs"
                                color="#F3664C"
                            >
                                SIGNUP
                            </Text>
                        </Link>
                    </>
                )}
                <DarkModeToggle />
            </Flex>
        </Flex>
    );
}
