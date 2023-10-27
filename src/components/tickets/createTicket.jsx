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
import emailjs from "@emailjs/browser";

const CreateTicket = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  let initialValues = {
    name: "",
    email: "",
    ticket_type: "",
  };

  const handleSubmit = async (doc) => {
    setLoading(true);
    const passcode = Math.random().toString(36).substring(2, 10);
    let data = {
      ...doc,
      invitation_code: passcode,
    };

    const emailForm = {
      send_to: doc.email,
      name: doc.name,
      passcode: passcode,
    };
    console.log(data);

    const form = document.createElement("form");

    Object.keys(emailForm).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = emailForm[key];
      form.appendChild(input);
    });

    try {
      const result = await emailjs.sendForm(
        "service_9habpmt",
        "template_gvv4akt",
        form,
        "16RoAxdl74LyfqcYM",
      );
      console.log(result.text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Get Ticket</ModalHeader>
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
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mb="5px" fontSize={14}>
                      Ticket Type
                    </FormLabel>
                    <Select name="ticket_type" onChange={handleChange}>
                      <option>--Choose ticket type--</option>
                      {ticket_types.map((data, idx) => (
                        <option key={idx} value={data.name}>
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
                  isLoading={loading}
                  isDisabled={loading}
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
