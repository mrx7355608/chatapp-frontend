/* eslint-disable react/no-unescaped-entities */
/* eslint-disable object-curly-newline */
import React from "react";
import {
    Button,
    Container,
    Flex,
    Heading,
    Input,
    useColorMode,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Signup() {
    const { colorMode } = useColorMode();
    const [loading, setLoading] = React.useState(false);

    return (
        <Flex alignItems="center" justify="center" w="100vw" minHeight="100vh">
            <Container
                maxWidth="450px"
                rounded="lg"
                my="4"
                p="6"
                bgColor={colorMode === "light" ? "gray.50" : "gray.700"}
            >
                <Heading textAlign="center" mt="6" mb="8">
                    Signup
                </Heading>
                <Input
                    type="text"
                    variant="filled"
                    bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    pt="1"
                    size="lg"
                    mb="3"
                    placeholder="First name"
                />
                <Input
                    type="text"
                    variant="filled"
                    bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    pt="1"
                    size="lg"
                    mb="3"
                    placeholder="Last name"
                />
                <Input
                    type="text"
                    variant="filled"
                    bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    pt="1"
                    size="lg"
                    mb="3"
                    placeholder="Username"
                />
                <Input
                    type="password"
                    variant="filled"
                    bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    pt="1"
                    size="lg"
                    mb="3"
                    placeholder="Password"
                />
                <Input
                    type="password"
                    bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                    variant="filled"
                    pt="1"
                    size="lg"
                    mb="8"
                    placeholder="Confirm Password"
                />
                {loading ? (
                    <Button
                        disabled
                        size="md"
                        w="full"
                        color="white"
                        bgColor="#F3664C"
                    >
                        <Spinner mr="2" size="sm" />
                        <Text pt="1">Signing up...</Text>
                    </Button>
                ) : (
                    <Button
                        size="md"
                        pt="1"
                        w="full"
                        color="white"
                        bgColor="#F3664C"
                    >
                        Signup
                    </Button>
                )}

                <Text
                    textAlign="center"
                    color={colorMode === "light" ? "gray.700" : "gray.200"}
                    my="5"
                >
                    Already have an account?{" "}
                    <Text as="b" color="red.500">
                        <Link to="/login">Login</Link>
                    </Text>
                </Text>
            </Container>
        </Flex>
    );
}
