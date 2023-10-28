import React, { useEffect } from "react";
import Layout from "../../layout";
import { Container, Box } from "@chakra-ui/react";
import Users from "./components/users";
import { app } from "../../services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Settings = () => {
  const auth = getAuth(app);

  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        console.log(user);
      });
    };
    getUser();
  }, []);
  return (
    <Layout>
      <Container maxW="container.xl">
        <Users />
      </Container>
    </Layout>
  );
};

export default Settings;
