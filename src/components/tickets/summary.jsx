import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, useMediaQuery } from "@chakra-ui/react";
import useTicketsAuth from "../../pages/tickets/useTicketsAuth";
import Card from "./card";
import commaNumber from "comma-number";

const Summary = ({ tickets }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [regular, setRegular] = useState(0);
  const [standard, setStandard] = useState(0);
  const [vip, setVip] = useState(0);
  const { getTickets } = useTicketsAuth();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTickets();
        const total_revenue = response.reduce(
          (a, b) => a + b.ticket_type.price,
          0,
        );
        const regular = response.filter(
          (data) => data.ticket_type.name === "Regular",
        );
        const standard = response.filter(
          (data) => data.ticket_type.name === "Trybe Table",
        );
        const vip = response.filter((data) => data.ticket_type.name === "VIP");
        setRegular(regular.length);
        setStandard(standard.length);
        setVip(vip.length);
        setTotalTickets(response.length);
        setTotalRevenue(total_revenue);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [tickets]);

  return (
    <Box mb="40px">
      <Grid
        templateColumns={isLargerThan800 ? "repeat(5, 1fr)" : "auto"}
        gap="24px"
      >
        <GridItem>
          <Card
            title={"total revenue"}
            value={`NGN ${commaNumber(totalRevenue)}`}
          />
        </GridItem>
        <GridItem>
          <Card
            title={"total tickets sold"}
            value={`${commaNumber(totalTickets)}`}
          />
        </GridItem>
        <GridItem>
          <Card
            title={"regular tickets sold"}
            value={`${commaNumber(regular)}`}
          />
        </GridItem>

        <GridItem>
          <Card title={"VIP tickets sold"} value={`${commaNumber(vip)}`} />
        </GridItem>
        <GridItem>
          <Card
            title={"Trybe Table  sold"}
            value={`${commaNumber(standard)}`}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Summary;
