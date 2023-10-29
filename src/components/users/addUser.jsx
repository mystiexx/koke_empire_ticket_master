import React from "react";
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
import useUser from "../../pages/settings/useUser";

const AddUser = ({ isOpen, onClose, updateUsers }) => {
  const { creating, handleSubmit } = useUser(onClose);

  let initialValues = {
    name: "",
    email: "",
    role: "",
  };

  const handleSave = (doc) => {
    handleSubmit(doc, onClose, updateUsers);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="24px">
          <Formik initialValues={initialValues} onSubmit={handleSave}>
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
                  isLoading={creating}
                  isDisabled={creating}
                  _hover={{
                    bg: "#F7DC64",
                  }}
                >
                  Save
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
