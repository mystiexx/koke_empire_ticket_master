import React from "react";
import {
  Box,
  Container,
  Text,
  Button,
  useMediaQuery,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { nav_routes } from "../../utils/enums";
import { Link, NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { HiOutlineMenu } from "react-icons/hi";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import logo from "../../assets/new_logo.png";

const Navbar = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const logOut = () => {
    localStorage.removeItem("koke_admin");
    localStorage.removeItem("koke_user");
    window.location.href = "/sign-in";
  };
  return (
    <Box bg="#222222" py="20px">
      <Container maxW="container.xl">
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display="flex"
            alignItems={"center"}
            gap={isLargerThan800 ? 20 : 2}
          >
            <Box display={isLargerThan800 ? "none" : "block"}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  display={"grid"}
                  placeItems={"center"}
                  bg="transparent"
                  color="#fff"
                >
                  <HiOutlineMenu size={20} />
                </MenuButton>
                <MenuList>
                  {nav_routes.map((nav, idx) => (
                    <MenuItem key={idx}>
                      <Link to={nav.to} style={{ textTransform: "capitalize" }}>
                        {nav.name}
                      </Link>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={logOut} color={"red"}>
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Image src={logo} h="60px" />

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
          <Box display={isLargerThan800 ? "block" : "none"}>
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
