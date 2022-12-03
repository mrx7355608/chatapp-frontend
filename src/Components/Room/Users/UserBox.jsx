import React from "react";
import { Image, Flex, Text } from "@chakra-ui/react";

export default function UserBox({ user }) {
    return (
        <Flex bgColor="gray.900" p="3" rounded="lg" my="2" alignItems="center">
            <Image
                w="40px"
                rounded="full"
                src={import.meta.env.VITE_API_URL + user.photo}
            />
            <Text mx="3" as="b">
                {user.username}
            </Text>
        </Flex>
    );
}
