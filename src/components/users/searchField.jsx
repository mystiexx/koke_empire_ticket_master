import React, { useState } from "react";
import {
  Input,
  Button,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import AddUser from "./addUser";

const SearchField = ({ addUser, handleSearch, searching }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AddUser
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        addUser={addUser}
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt="24px"
      >
        <Text fontSize={24} fontWeight={700}>
          Users
        </Text>
        <Box display={"flex"} gap="10px" alignItems={"center"}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Search for Name or Email..."
              onChange={handleSearch}
              _placeholder={{ fontSize: 14 }}
              focusBorderColor="#F7DC64"
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
            Add User
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SearchField;
