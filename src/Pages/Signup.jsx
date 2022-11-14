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
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

export default function Signup() {
    const navigation = useNavigation();
    const { colorMode } = useColorMode();

    const signupErrors = useActionData();

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
                    Signup
                </Heading>

                <Form method="post">
                    {signupErrors?.apiError && (
                        <Text
                            w="full"
                            p="3"
                            rounded="md"
                            bgColor="red.200"
                            color="red.800"
                            pt="3.5"
                            mt="3"
                        >
                            {signupErrors?.apiError}
                        </Text>
                    )}
                    <Input
                        type="text"
                        name="fname"
                        variant="filled"
                        bgColor={
                            colorMode === "light" ? "gray.200" : "gray.600"
                        }
                        pt="1.5"
                        size="md"
                        mt="3"
                        placeholder="First name"
                        border={signupErrors?.fname && "2px"}
                    />
                    {signupErrors?.fname && (
                        <Text mt="1" fontSize="sm" as="b" color="red.500">
                            {signupErrors.fname}
                        </Text>
                    )}
                    <Input
                        type="text"
                        name="lname"
                        variant="filled"
                        bgColor={
                            colorMode === "light" ? "gray.200" : "gray.600"
                        }
                        pt="1.5"
                        size="md"
                        mt="3"
                        placeholder="Last name"
                    />
                    {signupErrors?.lname && (
                        <Text mt="1" fontSize="sm" as="b" color="red.500">
                            {signupErrors.lname}
                        </Text>
                    )}
                    <Input
                        type="text"
                        name="username"
                        variant="filled"
                        bgColor={
                            colorMode === "light" ? "gray.200" : "gray.600"
                        }
                        pt="1.5"
                        size="md"
                        mt="3"
                        placeholder="Username"
                    />
                    {signupErrors?.username && (
                        <Text mt="1" fontSize="sm" as="b" color="red.500">
                            {signupErrors.username}
                        </Text>
                    )}
                    <Input
                        type="password"
                        name="password"
                        variant="filled"
                        bgColor={
                            colorMode === "light" ? "gray.200" : "gray.600"
                        }
                        pt="1.5"
                        size="md"
                        placeholder="Password"
                        mt="3"
                    />
                    {signupErrors?.password && (
                        <Text mt="1" fontSize="sm" as="b" color="red.500">
                            {signupErrors.password}
                        </Text>
                    )}
                    <Input
                        type="password"
                        name="confirm_password"
                        bgColor={
                            colorMode === "light" ? "gray.200" : "gray.600"
                        }
                        variant="filled"
                        pt="1.5"
                        size="md"
                        mt="3"
                        placeholder="Confirm Password"
                    />
                    {signupErrors?.confirmPassword && (
                        <Text mt="1" fontSize="sm" as="b" color="red.500">
                            {signupErrors.confirmPassword}
                        </Text>
                    )}
                    {navigation.state === "loading" ? (
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
                            <Text pt="1">Signing up...</Text>
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
                            Signup
                        </Button>
                    )}
                </Form>

                <Text
                    textAlign="center"
                    color={colorMode === "light" ? "gray.700" : "gray.200"}
                    my="5"
                >
                    Already have an account?
                    <Text as="b" color="red.500">
                        <Link to="/login"> Login</Link>
                    </Text>
                </Text>
            </Container>
        </Flex>
    );
}
