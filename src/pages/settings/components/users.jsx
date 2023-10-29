import React, { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import SearchField from "../../../components/users/searchField";
import UserTable from "../../../components/users/table";
import useUser from "../useUser";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { loading, handleSearch, searching, deleteMember, getUsers } =
    useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (err) {
        toast.error(error.messaage);
      }
    };
    fetchData();
  }, []);

  const updateUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = (doc) => {
    setUsers((prev) => prev.filter((item) => item._id !== doc._id));
  };

  return (
    <Box>
      <SearchField
        handleSearch={handleSearch}
        searching={searching}
        updateUsers={updateUsers}
      />
      {loading ? (
        <Box h="90vh" display={"grid"} placeItems={"center"}>
          <Spinner size={"xl"} color="#F7DC64" />{" "}
        </Box>
      ) : (
        <UserTable
          users={users}
          deleteUser={deleteMember}
          handleDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default Users;
