import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};
const myTheme = extendTheme({ config });

export default myTheme;
