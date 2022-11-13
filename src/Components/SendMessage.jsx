import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { BsEmojiWink } from "react-icons/bs";

export default function SendMessage() {
    return (
        <Flex>
            <Input
                variant="filled"
                placeholder="Type your message here."
                pt="1"
                size="lg"
                flex="3"
                w="70%"
            />
            <Button bgColor="transparent" mx="3">
                <BsEmojiWink size="20px" color="#C62368" />
            </Button>
            <Button color="white" bgColor="green.500">
                Send
            </Button>
        </Flex>
    );
}
