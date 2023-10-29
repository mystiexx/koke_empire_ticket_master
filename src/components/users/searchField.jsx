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
import AddUser from "./addUser";

const SearchField = ({ handleSearch, searching, updateUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const toggleShow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <AddUser isOpen={isOpen} onClose={toggleShow} updateUsers={updateUsers} />
      <Box
        display={"flex"}
        flexDir={isLargerThan800 ? "row" : "column"}
        justifyContent={"space-between"}
        alignItems={isLargerThan800 ? "center" : null}
        mt="24px"
      >
        <Text fontSize={24} fontWeight={700}>
          Users
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
            onClick={toggleShow}
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
