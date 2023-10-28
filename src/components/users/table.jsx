import React from "react";
import {
  TableContainer,
  Table,
  Th,
  Thead,
  Tbody,
  Td,
  Tr,
  IconButton,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

const head = ["name", "email", "role", "password", ""];

const UserTable = ({ users, deleteUser }) => {
  return (
    <TableContainer w="100%" overflowX={"auto"} mt="50px">
      <Table variant={"striped"}>
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
          {users.map((data) => (
            <Tr key={data._id} cursor="pointer">
              <Td textTransform={"capitalize"}>{data.name}</Td>
              <Td>{data.email}</Td>
              <Td textTransform={"capitalize"}>{data.role}</Td>
              <Td>{data.password}</Td>
              <Td display="flex" gap="10px">
                <IconButton
                  bg="transparent"
                  onClick={() => deleteUser(data)}
                  color={"red"}
                  _hover={{ bg: "transparent" }}
                  icon={<AiFillDelete />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
