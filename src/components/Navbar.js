"use client"
import useAuth from "@/context/useAuth";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { HStack, Center, Spacer, Link, Flex, Container, UnorderedList, OrderedList} from "@chakra-ui/react";

const menuItems = [
  {
    name: "Home",
    href: "/",
    icon: <FaHome />,
  },
];

export default function Navbar() {
  const { authStatus } = useAuth();

  return (
    <Center
      justifyContent={"space-between"} 
      alignItems={"center"}
      maxW="99vw"
      bgColor="teal.400"
      color={"white"}
      fontWeight={"bolder"}
      fontStyle={"oblique"}
      p={3}
    >
      <Container>
        <Flex align="center"> 
          <UnorderedList style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            {menuItems.map((item) => (
              <OrderedList key={item.name}>
                <Link href={item.href}>
                  <Flex align="center"> 
                    {item.icon}
                    <i>{item.name}</i>
                  </Flex>
                </Link>
              </OrderedList>
            ))}
          </UnorderedList>
        </Flex>
      </Container>
      <HStack spacing={2} mr={["4", "4", "8"]}>
        <Link href={authStatus ? "/profile" : "/signup"}>
          {authStatus ? (
            <Flex align={"center"} pr={2}>
              <CgProfile />
              <i>Profile</i>
            </Flex>
          ) : (
            <Flex align={"center"} pr={2}>
              <FiLogIn />
              <i> Sign up</i>
            </Flex>
          )}
        </Link>
        <Spacer />
        <Link href={authStatus ? "/logout" : "/login"}>
          {authStatus ? (
            <Flex align={"center"} pr={2}>
              <FiLogOut />
              <i>Logout</i>
            </Flex>
          ) : (
            <Flex align={"center"} pr={2}>
              <FiLogIn />
              <i>Log In</i>
            </Flex>
          )}
        </Link>
      </HStack>
    </Center>
  );     
}
