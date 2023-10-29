import React, { useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import SearchField from "../../../components/users/searchField";
import UserTable from "../../../components/users/table";
import useUser from "../useUser";

const Users = () => {
  const { users, loading, handleSearch, searching, deleteMember } = useUser();

  return (
    <Box>
      <SearchField handleSearch={handleSearch} searching={searching} />
      {loading ? (
        <Box h="90vh" display={"grid"} placeItems={"center"}>
          <Spinner size={"xl"} color="#F7DC64" />{" "}
        </Box>
      ) : (
        <UserTable users={users} deleteUser={deleteMember} />
      )}
    </Box>
  );
};

export default Users;
