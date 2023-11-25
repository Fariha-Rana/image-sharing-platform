"use client";
import userAuthentication from "@/appwrite/authentication";
import useAuth from "@/context/useAuth";
import { Flex, Box, Text, Input, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {useState } from "react";

export default function Signup() {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");

  const { setAuthStatus, setUserData } = useAuth();
  const router = useRouter();


  const createUser = async (e) => {
    e.preventDefault();
    try {
      const userAccount = await userAuthentication.createAccount(userFormData);
      if (userAccount) setAuthStatus(true);
      setUserData(userAccount)
      router.replace(`/`)
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height={["80vh", "70vh", "60vh", "70vh"]}
      mt={[1, 8, 1, 1]}
    >
      <Box
        width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        p="10"
        bg="gray.200"
        rounded="xl"
        boxShadow="md"
      >
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          mb="2"
          color="black"
        >
          Sign up to create account
        </Text>
        <Text textAlign="center" mb="2" fontSize="base" color="gray.600">
          Already have an account?{" "}
          <Link href="/login" color="primary" textDecoration="underline">
            Sign In
          </Link>
        </Text>
        {error && (
          <Text textAlign="center" color="red.600" mt="4">
            {error}
          </Text>
        )}
        <form onSubmit={createUser} mt="8">
          <Box as="label" htmlFor="name" mb="2" fontSize="base" fontWeight="medium" color="gray.900">
            Full Name
          </Box>
          <Input
            type="text"
            placeholder="Full Name"
            id="name"
            value={userFormData.name}
            onChange={(e) =>
              setUserFormData({
                ...userFormData,
                name: e.target.value,
              })
            }
            required
          />
          <Box as="label" htmlFor="email" mt="4" mb="2" fontSize="base" fontWeight="medium" color="gray.900">
            Email address
          </Box>
          <Input
            type="email"
            value={userFormData.email}
            onChange={(e) =>
              setUserFormData({
                ...userFormData,
                email: e.target.value,
              })
            }
            placeholder="Email"
            id="email"
            required
          />
          <Box as="label" htmlFor="password" mt="4" mb="2" fontSize="base" fontWeight="medium" color="gray.900">
            Password
          </Box>
          <Input
            type="password"
            placeholder="Password"
            value={userFormData.password}
            onChange={(e) =>
              setUserFormData({
                ...userFormData,
                password: e.target.value,
              })
            }
            id="password"
            required
          />
          <Button
            type="submit"
            mt="6"
            w="full"
            bg="primary"
            color="blue.800"
            fontWeight="semibold"
            fontSize="sm"
            px="3.5"
            py="2.5"
            rounded="md"
            _hover={{ bg: "primary/80" }}
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Flex>
  );
}