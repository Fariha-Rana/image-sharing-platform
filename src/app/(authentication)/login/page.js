"use client";
import userAuthentication from "@/appwrite/authentication";
import useAuth from "@/context/useAuth";
import { Flex, Box, Text, Input, Button, Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
 
  const Login = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const { setAuthStatus, setUserData } = useAuth();
    const router = useRouter();


  const _login = async (e) => {
    e.preventDefault();
    try {
      const session = await userAuthentication.login(formData);
      if (session) setAuthStatus(true);
      setUserData(session);
      router.replace(`/`)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Flex
    items="center"
    justify="center"
    maxWidth={"98vw"}
    mt={10}
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
        Sign in to your account
      </Text>
      <Text textAlign="center" mb="2" fontSize="base" color="gray.600">
        Don't have any account?{" "}
        <Link href="/signup" color="primary" textDecoration="underline">
          Sign Up
        </Link>
      </Text>
      {error && (
        <Text textAlign="center" color="red.600" mt="8">
          {error}
        </Text>
      )}
      <form onSubmit={_login} mt="8">
        <Box as="label" htmlFor="email" mb="2" fontSize="base" fontWeight="medium" color="gray.900">
          Email address
        </Box>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
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
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          id="password"
          name="password" 
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
          Sign in
        </Button>
      </form>
    </Box>
  </Flex>
  );
};

export default Login;
