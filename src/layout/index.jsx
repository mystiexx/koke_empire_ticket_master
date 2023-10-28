import React from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { Navigate } from "react-router-dom";

const Layout = ({ children }) => {
  const token = localStorage.getItem("koke_admin");

  if (token) {
    return (
      <Box>
        <Navbar />
        <Box>{children}</Box>
      </Box>
    );
  } else {
    localStorage.removeItem("koke_admin");
    return <Navigate to="/sign-in" replace />;
  }
};

export default Layout;
