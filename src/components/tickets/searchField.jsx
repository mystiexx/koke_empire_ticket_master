import React, { useState } from "react";
import { Input, Button, Box, Text } from "@chakra-ui/react";
import CreateTicket from "./createTicket";

const SearchField = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <CreateTicket isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt="24px"
      >
        <Text fontSize={24} fontWeight={700}>
          Tickets
        </Text>
        <Box display={"flex"} gap="10px" alignItems={"center"}>
          <Input
            type="text"
            placeholder="Search Invitation Code or Name..."
            _placeholder={{ fontSize: 14 }}
            w="350px"
          />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            bg="#F7DC64"
            fontSize={14}
            _hover={{
              bg: "#F7DC64",
            }}
          >
            Get Ticket
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SearchField;
