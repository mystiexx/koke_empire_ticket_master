import React from "react";
import { Box, Text } from "@chakra-ui/react";

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
