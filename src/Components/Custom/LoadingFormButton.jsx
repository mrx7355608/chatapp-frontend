/* eslint-disable react/prop-types */
import React from "react";
import { Spinner, Text, Button } from "@chakra-ui/react";

export default function LoadingFormButton({ btnText }) {
    return (
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
            <Text pt="1">{btnText}</Text>
        </Button>
    );
}
