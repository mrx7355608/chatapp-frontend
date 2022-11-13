import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// Components
import Navbar from "./Components/Navbar";

function App() {
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box>
    );
}

export default App;
