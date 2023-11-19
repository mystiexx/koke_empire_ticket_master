import React from "react";
import {
  Input,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  Spinner,
  useMediaQuery,
  Select,
} from "@chakra-ui/react";

const SearchField = ({ handleSearch, searching, handleFilter }) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const filters = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Regular",
      value: "Regular",
    },
    {
      name: "VIP",
      value: "VIP",
    },
    {
      name: "Trybe Table",
      value: "Trybe Table",
    },
  ];

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
          flexDir={isLargerThan800 ? "row" : "column"}
          gap="10px"
          alignItems={"center"}
          mt={isLargerThan800 ? null : "24px"}
        >
          <Select focusBorderColor="#F7DC64" onChange={handleFilter}>
            <option selected disabled>
              Ticket type
            </option>
            {filters.map((data, idx) => (
              <option key={idx} value={data.value}>
                {data.name}
              </option>
            ))}
          </Select>
          <InputGroup>
            <Input
              type="text"
              placeholder="Invitation Code or Name..."
              _placeholder={{ fontSize: 10 }}
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
