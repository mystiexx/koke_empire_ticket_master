import React, { useState } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import CreateTicket from "./createTicket";

const SearchField = ({ updateTickets, handleSearch, searching }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <CreateTicket
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        updateTickets={updateTickets}
      />
      <Box
        display={"flex"}
        flexDir={isLargerThan800 ? "row" : "column"}
        justifyContent={"space-between"}
        alignItems={isLargerThan800 ? "center" : null}
        mt="24px"
      >
        <Text fontSize={18} fontWeight={700}>
          Tickets List
        </Text>
        <Box
          display={"flex"}
          gap="10px"
          alignItems={"center"}
          mt={isLargerThan800 ? null : "24px"}
        >
          <InputGroup>
            <Input
              type="text"
              placeholder="Search Invitation Code or Name..."
              _placeholder={{ fontSize: 12 }}
              onChange={handleSearch}
              focusBorderColor="#F7DC64"
              w="full"
            />
            <InputRightElement>
              {searching && <Spinner size={"sm"} color="#F7DC64" />}
            </InputRightElement>
          </InputGroup>

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
