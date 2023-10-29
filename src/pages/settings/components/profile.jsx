import React, { useState } from "react";
import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import useUser from "../useUser";
import Avatar, { genConfig } from "react-nice-avatar";
import ChangePassword from "../../../components/profile/changePassword";

const Profile = () => {
  const { currentUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const config = genConfig(currentUser.name);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <ChangePassword isOpen={isOpen} onClose={toggle} />
      <Box borderBottom={"1px solid #D9D8DA"} pb="50px" mb="50px" mt="50px">
        <Text fontSize={24} fontWeight={700}>
          Profile
        </Text>

        <Box
          display={"flex"}
          flexDir={isLargerThan800 ? "row" : "column"}
          justifyContent={"space-between"}
          alignItems={isLargerThan800 ? "center" : null}
          mt="40px"
        >
          <Box display={"flex"} alignItems={"center"} gap="20px">
            <Box>
              <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
            </Box>
            <Box>
              <Text fontSize={18} fontWeight={700} textTransform={"capitalize"}>
                {currentUser.name}
              </Text>
              <Text color={"#605D66"} fontSize={16}>
                {currentUser.email}
              </Text>
              <Text>{currentUser.role}</Text>
            </Box>
          </Box>

          <Button
            bg="#F7DC64"
            fontSize={14}
            _hover={{ bg: "#F7DC64" }}
            onClick={toggle}
            mt={isLargerThan800 ? null : "24px"}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
