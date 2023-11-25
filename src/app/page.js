"use client"
import PostForm from "@/components/PostForm";
import PostsCard from "@/components/PostsCard";
import { Container } from "@chakra-ui/react";
function Home() {
  return (
    <>
      <PostForm/>
    <Container mt={8}>
      <PostsCard/>
    </Container>
    </>
  );
}

export default Home;
