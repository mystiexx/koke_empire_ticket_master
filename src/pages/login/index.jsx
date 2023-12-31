import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import painting from "../../assets/mountain.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "./useAuth";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const { loading, handleSubmit } = useAuth();

  let initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box h="100vh" position={"relative"}>
      <Box display={"flex"}>
        <Image
          src={painting}
          alt="painting"
          w="full"
          position={"absolute"}
          zIndex={"-1"}
          h="100vh"
          objectFit={"cover"}
        />

        <Box display={"grid"} placeItems={"center"} h="100vh" w="full">
          <Box w="350px">
            <Text textAlign={"center"} mb="24px" fontWeight={700} fontSize={24}>
              Welcome Back!
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, handleChange }) => (
                <Form>
                  <Box display={"flex"} gap="15px" flexDir={"column"}>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email"
                        focusBorderColor="#F7DC64"
                        bg="#17171742"
                        onChange={handleChange}
                        name="email"
                        value={values.email}
                        border="none"
                        color={"#fff"}
                        _placeholder={{
                          color: "#fff",
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          placeholder="Password"
                          focusBorderColor="#F7DC64"
                          bg="#17171742"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          border="none"
                          color={"#fff"}
                          _placeholder={{
                            color: "#fff",
                          }}
                        />
                        <InputRightElement>
                          {show ? (
                            <IconButton
                              icon={<AiOutlineEyeInvisible />}
                              bg="transparent"
                              color="#fff"
                              onClick={() => setShow(!show)}
                              _hover={{
                                bg: "transparent",
                              }}
                            />
                          ) : (
                            <IconButton
                              icon={<AiOutlineEye />}
                              bg="transparent"
                              color="#fff"
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
                    fontSize={14}
                    mt="24px"
                    bg="#F7DC64"
                    type="submit"
                    isLoading={loading}
                    _hover={{
                      bg: "#F7DC64",
                    }}
                  >
                    Sign in
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
