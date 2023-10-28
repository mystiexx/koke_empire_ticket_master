import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
// import emailjs from "@emailjs/browser";
import { roles } from "../../utils/enums";
import { app, db } from "../../services/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const AddUser = ({ isOpen, onClose, addUser }) => {
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");

  const auth = getAuth(app);

  let initialValues = {
    name: "",
    email: "",
    role: "",
  };

  const handleSubmit = async (doc) => {
    setLoading(true);
    const password = Math.random().toString(36).substring(2, 10);
    try {
      await createUserWithEmailAndPassword(auth, doc.email, password).then(
        async (response) => {
          const data = {
            _id: response?.user?.uid,
            password: password,
            created_at: new Date(),
            ...doc,
          };
          await addDoc(usersCollectionRef, data);
          addUser(data);
          toast.success("Invite Sent!!!!");
          onClose();
        },
      );
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          toast.error(err.message);
          break;
        case "auth/weak-password":
          toast.error(err.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="24px">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
              <Form>
                <Box display="flex" gap="15px" flexDir={"column"}>
                  <FormControl>
                    <FormLabel mb="5px" fontSize={14}>
                      Name
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter Full Name"
                      focusBorderColor="#F7DC64"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mb="5px" fontSize={14}>
                      Email Address
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter Email Address"
                      focusBorderColor="#F7DC64"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mb="5px" fontSize={14}>
                      Ticket Type
                    </FormLabel>
                    <Select
                      name="role"
                      onChange={handleChange}
                      focusBorderColor="#F7DC64"
                      textTransform={"capitalize"}
                    >
                      <option>--Choose Role--</option>
                      {roles.map((data, idx) => (
                        <option key={idx} value={data}>
                          {data}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  w="full"
                  borderRadius={"5px"}
                  mt="24px"
                  type="submit"
                  bg="#F7DC64"
                  fontSize={14}
                  isLoading={loading}
                  isDisabled={loading}
                  _hover={{
                    bg: "#F7DC64",
                  }}
                >
                  Send Invite
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;
