import React from "react";
import { Badge, Box, Button, Text } from "@chakra-ui/react";

const Card = ({ title, value }) => {
  return (
    <Box
      py="28px"
      px="16px"
      border="0.5px solid #D9D8DA"
      borderRadius={"10px"}
      bg="#fff"
    >
      <Text fontSize={12} color="#605D66" textTransform={"capitalize"}>
        {title}
      </Text>
      <Text fontSize={18} fontWeight={600} mt="7px">
        {value}
      </Text>
    </Box>
  );
};

export default Card;

export const GuestCard = ({
  status,
  ticket,
  email,
  name,
  code,
  paid,
  handleCheckIn,
  handleInvite,
  data,
  sending,
  checking,
}) => {
  return (
    <Box p="16px" boxShadow={"sm"} bg="#fff" borderRadius={"4px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Text fontSize={12}>Ticket: {ticket.name}</Text>
        </Box>
        {status ? (
          <Badge bg="#CFEEE1" color={"#10AA69"}>
            Checked In
          </Badge>
        ) : (
          <Badge bg="#FCD1D1" color="#EE1717">
            Not Checked In
          </Badge>
        )}
      </Box>

      <Box mt="24px">
        <Text textTransform={"capitalize"} fontWeight={600}>
          {name}
        </Text>
        <Text fontSize={14}>{email}</Text>
        {code && <Text>Invitation code: {code}</Text>}
      </Box>

      <Box display={"flex"} justifyContent={"flex-end"} mt="24px">
        <Box display="flex" gap="10px">
          {data.checked_in === false && (
            <Button
              bg="#F7DC64"
              fontSize={12}
              onClick={() => handleCheckIn(data)}
              isLoading={checking}
              _hover={{
                bg: "#F7DC64",
              }}
            >
              Check in Guest
            </Button>
          )}

          {paid === false && (
            <Button
              bg="none"
              onClick={() => handleInvite(data)}
              isLoading={sending}
              border="1px solid #F7DC64"
              fontSize={12}
              _hover={{
                bg: "#F7DC64",
              }}
            >
              Send Invite
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
