import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Box,
  Container,
  Grid,
  Input,
  Spinner,
  Text,
  useMediaQuery,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import toast from "react-hot-toast";
import { GuestCard } from "../../components/tickets/card";
import axios from "axios";

const baseUrl = "https://koke-emailing.onrender.com/api/send-email";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const vendorsCollectionRef = collection(db, "vendors");
  const [loading, setLoading] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [searching, setSearching] = useState(false);
  const [checking, setChecking] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const vendorsQuery = query(
        vendorsCollectionRef,
        orderBy("created_at", "desc"),
      );
      const result = await getDocs(vendorsQuery);
      const response = result.docs.map((doc) => {
        const { created_at } = doc.data();
        return {
          ...doc.data(),
          created_at: created_at.toDate(),
          document_id: doc.id,
        };
      });
      setVendors(response);
      return response;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    if (value) {
      setSearching(true);
      const handler = setTimeout(() => {
        const results = vendors.filter(
          (data) =>
            data?.invitation_code
              ?.toLowerCase()
              .includes(value.toLowerCase()) ||
            data?.business_name?.toLowerCase().includes(value.toLowerCase()),
        );
        setVendors(results);
        setSearching(false);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    } else {
      const res = await fetchData();
      setVendors(res);
    }
  };

  const updateCheckInVendor = (data) => {
    const response = vendors.map((vendor) => {
      if (vendor._id === data._id) {
        return { ...vendor, ...data };
      }
      return vendor;
    });
    setVendors(response);
  };

  const handleCheckIn = async (data) => {
    try {
      setChecking(true);
      const vendorsRef = doc(db, "vendors", data.document_id);
      await updateDoc(vendorsRef, {
        checked_in: true,
      });
      const docs = {
        ...data,
        checked_in: true,
      };
      toast.success("Vendor Checked In");
      updateCheckInVendor(docs);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setChecking(false);
    }
  };

  const sendInvite = async (result) => {
    try {
      setSending(true);
      const passcode = Math.random().toString(36).substring(2, 10);
      const vendorsRef = doc(db, "vendors", result.document_id);
      let data = {
        ...result,
        ticket_sent: true,
        invitation_code: passcode,
      };
      const sendEmail = {
        send_to: result.email,
        templateType: "Vendor",
        subject: "Your Ticket is here!!!!!",
        templateData: {
          fullName: result.business_name,
          passcode,
        },
      };
      await axios.post(baseUrl, sendEmail);
      await updateDoc(vendorsRef, {
        ticket_sent: true,
        invitation_code: passcode,
      });
      updateCheckInVendor(data);
      toast.success("Invite Sent!!!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <Layout>
      <Container maxW="container.xl" py="50px">
        <Box
          display={"flex"}
          w="full"
          justifyContent={"space-between"}
          flexDir={isLargerThan800 ? "row" : "column"}
          alignItems={"center"}
          mb="24px"
        >
          <Text fontSize={24} fontWeight={700}>
            Vendors
          </Text>
          <Box>
            <InputGroup>
              <Input
                w={isLargerThan800 ? "auto" : "full"}
                type="text"
                placeholder="Search Invitation Code or Name..."
                _placeholder={{ fontSize: 12 }}
                onChange={handleSearch}
              />
              <InputRightElement>
                {searching && <Spinner size={"sm"} color="#F7DC64" />}
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        {loading && (
          <Box h="90vh" display={"grid"} placeItems={"center"}>
            <Spinner size={"xl"} color="#F7DC64" />
          </Box>
        )}

        {vendors?.length <= 0 && (
          <Box h="40vh" display={"grid"} placeItems={"center"}>
            <Text fontSize={24} fontWeight={700} textAlign={"center"}>
              No Vendors Yet
            </Text>
          </Box>
        )}

        <Box mt="50px">
          <Grid
            templateColumns={isLargerThan800 ? "repeat(4, 1fr)" : "auto"}
            gap="24px"
          >
            {vendors.map((vendor) => (
              <GuestCard
                key={vendor._id}
                name={vendor?.business_name}
                code={vendor.invitation_code}
                paid={vendor.ticket_sent}
                email={vendor.email}
                status={vendor.checked_in}
                ticket={vendor.business_nature}
                data={vendor}
                checking={checking}
                handleCheckIn={handleCheckIn}
                sending={sending}
                handleInvite={sendInvite}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default Vendors;
