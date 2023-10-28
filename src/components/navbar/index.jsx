import React from "react";
import { Box, Container, Text, Button } from "@chakra-ui/react";
import { nav_routes } from "../../utils/enums";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { app } from "../../services/firebase";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const auth = getAuth(app);

  const logOut = () => {
    signOut(auth)
      .then((response) => {
        console.log(response);
        localStorage.removeItem("koke_admin");
        window.location.href = "/sign-in";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box bg="#F5F5F5" py="20px">
      <Container maxW="container.xl">
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display="flex" alignItems={"center"} gap={20}>
            <Text fontWeight={700}>Koke Admin</Text>

            <Box display="flex" gap="24px">
              {nav_routes.map((nav, idx) => (
                <NavLink
                  to={nav.to}
                  key={idx}
                  className={({ isActive }) =>
                    isActive ? styles.nav_active : styles.nav
                  }
                >
                  {nav.name}
                </NavLink>
              ))}
            </Box>
          </Box>
          <Box>
            <Button
              fontSize={14}
              bg="transparent"
              onClick={logOut}
              color={"red"}
              _hover={{
                bg: "transparent",
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
