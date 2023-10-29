import React, { useEffect, useState } from "react";
import { Container, Image, Spinner, Box, Text } from "@chakra-ui/react";
import SearchField from "../../components/tickets/searchField";
import TableComponent from "../../components/tickets/table";
import Layout from "../../layout";
import useTicketsAuth from "./useTicketsAuth";
import Summary from "../../components/tickets/summary";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const { getTickets, updateCheckIn, loading } = useTicketsAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  const updateTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateCheckInUser = async (data) => {
    const response = tickets.map((ticket) => {
      if (ticket._id === data._id) {
        return { ...ticket, ...data };
      }
      return ticket;
    });
    setTickets(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTickets();
        setTickets(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const search = async () => {
    if (searchTerm !== "") {
      setSearching(true);
      const term = searchTerm.toLowerCase();
      const handler = setTimeout(() => {
        const results = tickets.filter(
          (data) =>
            data?.invitation_code.toLowerCase().includes(term) ||
            data?.name.toLowerCase().includes(term),
        );
        setTickets(results);
        setSearching(false);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      const response = await getTickets();
      setTickets(response);
    }
  };

  useEffect(() => {
    search();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckIn = (data) => {
    updateCheckIn(data, updateCheckInUser);
  };

  return (
    <Layout>
      <Container maxW="container.xl" py="50px">
        <Text fontSize={24} fontWeight={700} mb="24px">
          Tickets
        </Text>
        <Summary tickets={tickets} />
        <SearchField
          updateTickets={updateTickets}
          handleSearch={handleSearch}
          searching={searching}
        />
        {loading ? (
          <Box h="90vh" display={"grid"} placeItems={"center"}>
            <Spinner size={"xl"} color="#F7DC64" />{" "}
          </Box>
        ) : (
          <TableComponent tickets={tickets} handleCheckIn={handleCheckIn} />
        )}
      </Container>
    </Layout>
  );
};

export default Tickets;
