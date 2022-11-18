/* eslint-disable react/prop-types */
import { Text, Heading } from "@chakra-ui/react";
import React from "react";

export default function OutletErrorBoundary({ error }) {
    return (
        <>
            <Heading>WhoOps!</Heading>
            <Text>{error.message}</Text>
        </>
    );
}
