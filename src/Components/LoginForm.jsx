/* eslint-disable react/prop-types */
import React from "react";
import { Input, Text, useColorMode, Spinner, Button } from "@chakra-ui/react";
import { Form } from "react-router-dom";

export default function LoginForm({ loginErrors, navigation }) {
    const { colorMode } = useColorMode();

    return (
        <Form method="post">
            {loginErrors?.apiError && (
                <Text
                    w="full"
                    p="3"
                    rounded="md"
                    bgColor="red.200"
                    color="red.800"
                    pt="3.5"
                    mt="3"
                >
                    {loginErrors?.apiError}
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
            />
            {loginErrors?.username && (
                <Text mt="1" fontSize="sm" as="b" color="red.500">
                    {loginErrors.username}
                </Text>
            )}
            <Input
                type="password"
                name="password"
                variant="filled"
                bgColor={colorMode === "light" ? "gray.200" : "gray.600"}
                pt="1.5"
                size="md"
                placeholder="Password"
                mt="3"
            />
            {loginErrors?.password && (
                <Text mt="1" fontSize="sm" as="b" color="red.500">
                    {loginErrors.password}
                </Text>
            )}
            {navigation.state === "submitting" ? (
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
        </Form>
    );
}
