import React from "react";
import { Box, Container, Text, Avatar } from "@chakra-ui/react";
import { nav_routes } from "../../utils/enums";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
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

            <Box display="flex" gap="10px">
              {nav_routes.map((nav, idx) => (
                <NavLink
                  to={nav.to}
                  key={idx}
                  className={(isActive) =>
                    isActive ? styles.nav_active : styles.nav
                  }
                >
                  {nav.name}
                </NavLink>
              ))}
            </Box>
          </Box>
          <Box>
            <Avatar size={"sm"} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
