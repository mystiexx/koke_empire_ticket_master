import React from "react";
import { TableContainer, Table, Th, Thead, Tbody, Td } from "@chakra-ui/react";

const head = ["invitation code", "name", "email"];

const TableComponent = () => {
  return (
    <TableContainer w="100%" overflowX={"auto"} mt="50px">
      <Table>
        <Thead>
          {head.map((data, idx) => (
            <Th key={idx} textTransform={"capitalize"}>
              {data}
            </Th>
          ))}
        </Thead>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
