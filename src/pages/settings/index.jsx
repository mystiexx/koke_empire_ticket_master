import React from "react";
import Layout from "../../layout";
import { Container } from "@chakra-ui/react";
import Users from "./components/users";
import Profile from "./components/profile";
import useUser from "./useUser";

const Settings = () => {
  const { currentUser } = useUser();
  return (
    <Layout>
      <Container maxW="container.xl">
        <Profile />
        {currentUser.role === "admin" && <Users />}
      </Container>
    </Layout>
  );
};

export default Settings;
