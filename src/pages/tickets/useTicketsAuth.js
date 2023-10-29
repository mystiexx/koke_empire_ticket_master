import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { generateRandom } from "../../utils/utils";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

const useTicketsAuth = (onClose) => {
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("koke_user"));
  const ticketCollectionRef = collection(db, "tickets");
  const [creating, setCreating] = useState(false);

  const getTickets = async () => {
    try {
      setLoading(true);
      const ticketsQuery = query(
        ticketCollectionRef,
        orderBy("created_at", "desc"),
      );
      const result = await getDocs(ticketsQuery);

      const response = result.docs.map((doc) => {
        const { created_at } = doc.data();
        return {
          ...doc.data(),
          created_at: created_at.toDate(),
          document_id: doc.id,
        };
      });

      return response;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTicket = async (docs, saveTicket) => {
    try {
      setCreating(true);
      delete currentUser["created_at"];
      const passcode = Math.random().toString(36).substring(2, 10);
      const data = {
        _id: generateRandom(10),
        ...docs,
        ticket_type: JSON.parse(docs.ticket_type),
        created_at: new Date(),
        created_by: currentUser,
        checked_in: false,
        invitation_code: passcode,
      };

      const emailForm = {
        send_to: docs.email,
        name: docs.name,
        passcode: passcode,
      };
      const form = document.createElement("form");

      Object.keys(emailForm).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = emailForm[key];
        form.appendChild(input);
      });
      const result = await emailjs.sendForm(
        "service_9habpmt",
        "template_gvv4akt",
        form,
        "16RoAxdl74LyfqcYM",
      );

      if (result.text === "OK") {
        await addDoc(ticketCollectionRef, data);
        saveTicket();
        toast.success("Saved!!!");
        onClose();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCreating(false);
    }
  };

  const hadnleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateCheckIn = async (data, updateCheckInUser) => {
    try {
      const ticketRef = doc(db, "tickets", data.document_id);
      await updateDoc(ticketRef, {
        checked_in: true,
      });
      const docs = {
        ...data,
        checked_in: true,
      };
      toast.success(`${data.name} checked in`);
      updateCheckInUser(docs);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return {
    handleSaveTicket,
    loading,
    creating,
    getTickets,
    hadnleSearch,
    updateCheckIn,
  };
};

export default useTicketsAuth;
