"use client";
import { Box, Image, Flex, Text, IconButton, Alert } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import postDatabase from "@/appwrite/postsDatabase";
import { appwrite } from "@/appwrite/config";
import Comments from "./Comments";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = appwrite.subscribe(
      `databases.${databaseId}.collections.${collectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setPosts((prevState) => [...prevState, response.payload]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          setPosts((prevState) => {
            const updatedPosts = prevState.map((post) =>
              post.$id === response.payload.$id
                ? { ...post, likes: response.payload.likes, isLiked: response.payload.isLiked, comments: response.payload.comments}
                : post
            );
            return updatedPosts;
          });


        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  
  const loadPosts = async () => {
    try {
      await postDatabase.loadPostData();
      const postData = postDatabase.getPostData();
      setPosts(postData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (error) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <>
      {posts.map((post, index) => (
        <Box
          maxWidth={"90vw"}
          alignItems={"center"}
          justifyContent={"center"}
          key={index}
          borderWidth="1px"
          p={4}
          mb={4}
          borderRadius="md"
          boxShadow={"lg"}
          bg={"white"}
        >
          <Flex mb={4} alignItems={"center"} justifyContent={"center"}  style={{ width: "50%", height: "50%"}}>
            <Image
              src={post.imageurl}
              alt="Post Image"
              width={400}
              height={400}
              style={{ width: "50%", height: "50%", objectFit: "cover" }}
            />
          </Flex>
          <Flex mt="2" ml={"1"} flexDirection={"row"}>
            <IconButton size={"xs"} icon={<CgProfile />} mr={2} />
            <Text fontWeight={"bolder"} mt={1} mr={2} fontSize={"x-small"}>
              {post.name}
            </Text>
            <Text fontSize={"xx-small"} mt={1}>
              {new Date(post.$createdAt).toLocaleString()}
            </Text>
          </Flex>
          <Flex flexDirection={"column"}>
            <Text h={"auto"} fontSize={["xs", "sm"]} w={"auto"} ml={2} mt={1}>
              {post.caption}
            </Text>
          </Flex>
          <Comments
            comments={post.comments}
            likes={post.likes}
            isLiked={post.isLiked}
            documentIdentity={post.$id}
          />
        </Box>
      ))}
    </>
  );
};

export default PostCard;
