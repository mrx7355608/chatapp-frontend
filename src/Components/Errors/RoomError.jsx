/* eslint-disable react/prop-types */
import React from "react";
import { Text, Button } from "@chakra-ui/react";
import { useRoom } from "../../Contexts/RoomContext";

export default function RoomError({ error }) {
    const { dispatch } = useRoom();

    return (
        <>
            <Text>{error.message}</Text>
            <Button
                onClick={() => {
                    dispatch({ type: "RETRY" });
                }}
            >
                Retry
            </Button>
        </>
    );
}
