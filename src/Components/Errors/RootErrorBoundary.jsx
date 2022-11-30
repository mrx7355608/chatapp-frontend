import React from "react";
import { Text, Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function RootErrorBoundary() {
    const error = useRouteError();

    return (
        <>
            <Heading>WhoOps!</Heading>
            <Text>{error.message}</Text>
        </>
    );
}
