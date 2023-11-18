import React, { useEffect, useState } from "react";
import {
  Container,
  useMediaQuery,
  Spinner,
  Box,
  Text,
  Grid,
} from "@chakra-ui/react";
import SearchField from "../../components/tickets/searchField";
import Layout from "../../layout";
import useTicketsAuth from "./useTicketsAuth";
import Summary from "../../components/tickets/summary";
import { GuestCard } from "../../components/tickets/card";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const { getTickets, updateCheckIn, loading, sendInvite, sending } =
    useTicketsAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

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

  const handleInvite = (data) => {
    sendInvite(data, updateCheckInUser);
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
          <Box>
            {tickets?.length <= 0 ? (
              <Box h="40vh" display={"grid"} placeItems={"center"}>
                <Text fontSize={24} fontWeight={700} textAlign={"center"}>
                  No Ticket Sales Yet
                </Text>
              </Box>
            ) : (
              <Box mt="50px">
                <Grid
                  templateColumns={isLargerThan800 ? "repeat(4, 1fr)" : "auto"}
                  gap="24px"
                >
                  {tickets.map((ticket) => (
                    <GuestCard
                      key={ticket._id}
                      data={ticket}
                      ticket={ticket.ticket_type}
                      status={ticket.checked_in}
                      name={ticket?.name}
                      email={ticket.email}
                      code={ticket.invitation_code}
                      phone={ticket.phone}
                      refNumber={ticket.ref}
                      reference={ticket.reference}
                      proof={ticket.proof}
                      quantity={ticket.quantity}
                      paid={ticket.ticket_sent}
                      handleCheckIn={handleCheckIn}
                      handleInvite={handleInvite}
                      sending={sending}
                    />
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default Tickets;
