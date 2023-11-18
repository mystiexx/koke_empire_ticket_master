import React from "react";
import {
  Input,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";

const SearchField = ({ handleSearch, searching }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <>
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
        </Box>
      </Box>
    </>
  );
};

export default SearchField;
