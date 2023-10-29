import React from "react";
import { Box, Container, Text, Button, useMediaQuery } from "@chakra-ui/react";
import { nav_routes } from "../../utils/enums";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const logOut = () => {
    localStorage.removeItem("koke_admin");
    localStorage.removeItem("koke_user");
    window.location.href = "/sign-in";
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

            <Box display={isLargerThan800 ? "flex" : "none"} gap="24px">
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
