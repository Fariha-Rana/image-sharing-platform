"use client";
import { useEffect, useState } from "react";
import postDatabase from "@/appwrite/postsDatabase";
import {
  Box,
  Image,
  Flex,
  Text,
  IconButton,
  useToast,
  Center,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Comments from "@/components/Comments";
import { CgProfile } from "react-icons/cg";
import userAuthentication from "@/appwrite/authentication";

const ProfileCard = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userAuthentication.getCurrentUser();
        setUserData(user);
        if (user) {
          const _savedPosts = await postDatabase.getUserPost(user.$id);

          if (_savedPosts) setSavedPosts(_savedPosts.documents);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "an error occured",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <Box maxWidth={"92vw"} maxHeight={"auto"}>
       <Center margin={8} flexDirection={"column"}>
            <Text boxShadow={"md"} border={"ThreeDShadow"} p="2" fontSize={"sm"}>
              <b>username : </b>
              {userData?.name}
            </Text>
            <Text fontSize={"sm"} boxShadow={"md"} border={"ThreeDShadow"} p="2"  >
              <b>user email : </b>
              {userData?.email}
            </Text>
          </Center>
      {savedPosts ? (
        <Container boxShadow={"md"} borderWidth={"1px"} margin={"auto 0"} maxWidth={["95vw", "90vw", "20vw"]}>
          <Grid templateColumns={["1fr", "1fr", "3fr 3fr"]} gap={20} pl={4}>
            {savedPosts.map((post) => (
              <GridItem key={post.$id} colSpan={1}>
                <Image
                  src={post.imageurl}
                  alt="Post Image"
                  width={"100%"}
                  height={"auto"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  objectFit={"cover"}
                  p={2}
                />
                <Flex
                  flexDirection={["column", "row", "row"]}
                  alignItems="center"
                  justifyContent="space-between"
                  m={4}
                >
                  <Flex alignItems="center">
                    <IconButton size="xs" icon={<CgProfile />} mr={2} />
                    <Text fontWeight="bold" fontSize="xs" mr={"4"}>
                      {post.name}
                    </Text>
                  </Flex>
                  <Text fontSize="xx-small">
                    {new Date(post.$createdAt).toLocaleString()}
                  </Text>
                </Flex>
                <Text fontSize={["xs", "sm", "sm"]} mb={4}>
                  {post.caption}
                </Text>
                <Comments comments={post.comments} likes={post.likes} />
              </GridItem>
            ))}
          </Grid>
        </Container>
      ) : (
        <Center>No Post Found</Center>
      )}
    </Box>
  );
};

export default ProfileCard;
