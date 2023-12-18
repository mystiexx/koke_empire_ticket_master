import React, { useState, useEffect } from "react";
import { app, db } from "../../services/firebase";
import { getDocs, query, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const q = query(usersCollectionRef);
        await getDocs(q).then((result) => {
          const response = result.docs.map((doc) => {
            return {
              ...doc.data(),
              document_id: doc.id,
            };
          });
          setUsers(response);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleSubmit = (doc) => {
    setLoading(true);
    try {
      const user = users.find((user) => user.email === doc.email);
      if (user) {
        if (user.password === doc.password) {
          delete user["password"];
          localStorage.setItem("koke_admin", user._id);
          localStorage.setItem("koke_user", JSON.stringify(user));
          setTimeout(() => {
            navigate("/tickets");
          }, 1000);
        } else {
          toast.error("Wrong password");
        }
      } else {
        toast.error("Invalid email/password");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSubmit };
};

export default useAuth;
