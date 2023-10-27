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
import painting from "../../assets/painting.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebase";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  let initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (doc) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        doc.email,
        doc.password,
      );
      if (response) {
        console.log(response);
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
        case "auth/user-disabled":
        case "auth/user-not-found":
          toast.error("Invalid email/password");
          break;
        case "auth/wrong-password":
          toast.error("Wrong Password");
      }
    } finally {
      setLoading(false);
    }
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
            <Text
              textAlign={"center"}
              mb="24px"
              fontWeight={700}
              fontSize={24}
              color="#fff"
            >
              Welcome Back!
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, handleChange }) => (
                <Form>
                  <Box display={"flex"} gap="15px" flexDir={"column"}>
                    <FormControl>
                      <FormLabel color="#fff">Email</FormLabel>
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
                      <FormLabel color="#fff">Password</FormLabel>
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
