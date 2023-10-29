import React from "react";
import {
  TableContainer,
  Table,
  Th,
  Thead,
  Tbody,
  Td,
  Tr,
  Badge,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import commaNumber from "comma-number";

const head = [
  "invitation code",
  "name",
  "email",
  "ticket",
  "price",
  "status",
  "",
];

const TableComponent = ({ tickets, handleCheckIn }) => {
  return (
    <>
      {tickets.length <= 0 ? (
        <Box h="40vh" display={"grid"} placeItems={"center"}>
          <Text fontSize={24} fontWeight={700} textAlign={"center"}>
            No Ticket Sales Yet
          </Text>
        </Box>
      ) : (
        <TableContainer w="100%" overflowX={"auto"} mt="50px">
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                {head.map((data, idx) => (
                  <Th key={idx} textTransform={"capitalize"}>
                    {data}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {tickets?.map((data) => (
                <Tr key={data._id} cursor={"pointer"}>
                  <Td>{data.invitation_code}</Td>
                  <Td textTransform={"capitalize"}>{data.name}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.ticket_type.name}</Td>
                  <Td>NGN {commaNumber(data.ticket_type.price)}</Td>
                  <Td>
                    {data.checked_in ? (
                      <Badge bg="#CFEEE1" color={"#10AA69"}>
                        Checked In
                      </Badge>
                    ) : (
                      <Badge bg="#FCD1D1" color="#EE1717">
                        Not Checked In
                      </Badge>
                    )}
                  </Td>
                  <Td>
                    {!data.checked_in && (
                      <Button fontSize={14} onClick={() => handleCheckIn(data)}>
                        Check in Guest
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TableComponent;
