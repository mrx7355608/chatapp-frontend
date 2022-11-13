import React from "react";
import { Button, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkModeToggle() {
    const { colorMode, setColorMode } = useColorMode();
    const toggleColorMode = () => {
        const mode = colorMode === "light" ? "dark" : "light";
        setColorMode(mode);
    };

    return (
        <Button
            bgColor="transparent"
            ml="-3"
            onClick={toggleColorMode}
            rounded="full"
            p="1"
        >
            {colorMode === "light" ? (
                <FaMoon color="#F3664C" />
            ) : (
                <FaSun color="#F3664C" />
            )}
        </Button>
    );
}
