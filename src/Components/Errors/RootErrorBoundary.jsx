/* eslint-disable react/prop-types */
import React from "react";
import { Text, Heading } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RootErrorBoundary() {
    const error = useRouteError();

    return (
        <>
            {console.log(error)}
            <Heading>Un-expected error occured</Heading>
            <Text>{error.message}</Text>
        </>
    );
}
