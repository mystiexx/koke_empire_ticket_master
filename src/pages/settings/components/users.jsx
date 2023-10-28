import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import SearchField from "../../../components/users/searchField";
import UserTable from "../../../components/users/table";
import { db } from "../../../services/firebase";
import {
  getDocs,
  orderBy,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const Users = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const q = query(usersCollectionRef, orderBy("created_at", "desc"));
        await getDocs(q).then((result) => {
          const response = result.docs.map((doc) => {
            const { created_at } = doc.data();
            let date = "";
            if (created_at) {
              date = created_at.toDate();
            }
            return {
              ...doc.data(),
              created_at: date,
              document_id: doc.id,
            };
          });
          setUsers(response);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const addUser = (doc) => {
    setUsers((prev) => [doc, ...prev]);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      setSearching(true);
      const term = searchTerm.toLowerCase();
      const handler = setTimeout(() => {
        const results = users.filter(
          (data) =>
            data?.name.toLowerCase().includes(term) ||
            data?.email.toLowerCase().includes(term),
        );
        setUsers(results);
        setSearching(false);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      setUsers(users);
      setSearching(false);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteMember = async (docs) => {
    try {
      await deleteDoc(doc(usersCollectionRef, docs.document_id)).then(() => {
        setUsers((prev) => prev.filter((item) => item._id !== docs._id));
        toast.success("User Deleted!!!");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <SearchField
        addUser={addUser}
        handleSearch={handleSearch}
        searching={searching}
      />
      <UserTable users={users} deleteUser={deleteMember} />
    </Box>
  );
};

export default Users;
