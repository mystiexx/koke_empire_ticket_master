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
import { ticket_types } from "../../utils/enums";
import { Formik, Form } from "formik";
import commaNumber from "comma-number";
import useTicketsAuth from "../../pages/tickets/useTicketsAuth";

const CreateTicket = ({ isOpen, onClose, updateTickets }) => {
  const { handleSaveTicket, creating } = useTicketsAuth(onClose);
  let initialValues = {
    name: "",
    email: "",
    ticket_type: "",
  };

  const saveTicket = (docs) => {
    handleSaveTicket(docs, updateTickets);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Get Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="24px">
          <Formik initialValues={initialValues} onSubmit={saveTicket}>
            {({ values, handleChange }) => (
              <Form>
                <Box display="flex" gap="15px" flexDir={"column"}>
                  <FormControl isRequired>
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
                  <FormControl isRequired>
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
                  <FormControl isRequired>
                    <FormLabel mb="5px" fontSize={14}>
                      Ticket Type
                    </FormLabel>
                    <Select
                      name="ticket_type"
                      onChange={handleChange}
                      focusBorderColor="#F7DC64"
                    >
                      <option>--Choose ticket type--</option>
                      {ticket_types.map((data, idx) => (
                        <option key={idx} value={JSON.stringify(data)}>
                          {data.name} - {commaNumber(data.price)}
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
                  Get Ticket
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateTicket;
