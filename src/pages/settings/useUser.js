import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import {
  addDoc,
  collection,
  orderBy,
  query,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { generateRandom } from "../../utils/utils";

const useUser = (onClose) => {
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("koke_user"));
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const q = query(usersCollectionRef, orderBy("created_at", "desc"));
      const result = await getDocs(q);

      const response = result.docs.map((doc) => {
        const { created_at } = doc.data();
        return {
          ...doc.data(),
          created_at: created_at.toDate(),
          document_id: doc.id,
        };
      });
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    getUsers();
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
      refetch();
      setSearching(false);
    }
  }, [searchTerm]);

  const handleSubmit = async (doc, onClose, updateUsers) => {
    setCreating(true);
    const password = Math.random().toString(36).substring(2, 10);
    try {
      const user = users.find((user) => user.email === doc.email);
      if (user) {
        toast.error("Email already in use");
        return;
      }
      const data = {
        _id: generateRandom(10),
        password: password,
        ...doc,
        created_at: new Date(),
      };
      await addDoc(usersCollectionRef, data);
      updateUsers();
      onClose();
      toast.success("User Added!!!");
    } catch (error) {
      toast.error("An error occurred:", error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteMember = async (docs, handleDelete) => {
    try {
      await deleteDoc(doc(usersCollectionRef, docs.document_id)).then(() => {
        handleDelete(docs);
        toast.success("User Deleted");
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const toggleShow = () => {
    setIsOpen(!isOpen);
  };

  const handlePassword = async (docs) => {
    try {
      setCreating(true);
      const userRef = doc(db, "users", currentUser.document_id);
      await updateDoc(userRef, {
        password: docs.password,
      });
      toast.success("Password Changed!!");
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreating(false);
    }
  };

  return {
    loading,
    creating,
    users,
    handleSubmit,
    handleSearch,
    searching,
    deleteMember,
    toggleShow,
    isOpen,
    refetch,
    currentUser,
    handlePassword,
    getUsers,
  };
};

export default useUser;
