import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
