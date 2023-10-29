import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import useUser from "../../pages/settings/useUser";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const { handlePassword, creating } = useUser(onClose);

  let initialValues = {
    password: "",
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="24px">
          <Formik initialValues={initialValues} onSubmit={handlePassword}>
            {({ values, handleChange, dirty }) => (
              <Form>
                <Box display="flex" gap="15px" flexDir={"column"}>
                  <FormControl>
                    <FormLabel mb="5px" fontSize={14}>
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        focusBorderColor="#F7DC64"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        required
                      />
                      <InputRightElement>
                        {show ? (
                          <IconButton
                            icon={<AiOutlineEyeInvisible />}
                            bg="transparent"
                            onClick={() => setShow(!show)}
                            _hover={{
                              bg: "transparent",
                            }}
                          />
                        ) : (
                          <IconButton
                            icon={<AiOutlineEye />}
                            bg="transparent"
                            onClick={() => setShow(!show)}
                            _hover={{
                              bg: "transparent",
                            }}
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
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
                  isDisabled={creating || !dirty}
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

export default ChangePassword;
