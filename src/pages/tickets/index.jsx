import React from "react";
import { Container, Image } from "@chakra-ui/react";
import SearchField from "../../components/tickets/searchField";
import TableComponent from "../../components/tickets/table";
import Layout from "../../layout";
import ticket from "../../assets/ticket.jpg";

const Tickets = () => {
  return (
    <Layout>
      <Image src={ticket} alt="ticket" h="40vh" objectFit={"cover"} w="full" />
      <Container maxW="container.xl" py="100px">
        <SearchField />
        <TableComponent />
      </Container>
    </Layout>
  );
};

export default Tickets;
