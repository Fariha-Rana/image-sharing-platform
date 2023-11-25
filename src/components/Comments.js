import { useState} from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Avatar,
  useToast
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import postDatabase from '@/appwrite/postsDatabase';
import useAuth from '@/context/useAuth';

const Comments = ({likes, comments, isLiked, documentIdentity }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [usercomment, setUserComment] = useState("");
  const toast = useToast()
  const { authStatus } = useAuth()
  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const updateLikes = async (e) => {
    if(!authStatus){
        toast({
          title: "Error",
          description: "Please log in first.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
    }
    e.preventDefault();
    const updatedLikes = isLiked ? --likes : ++likes;
    if(updatedLikes >= 0){
      const likesCount = {
        likes: updatedLikes ,
        isLiked: isLiked ? false : true,
      };
      await postDatabase._updateDocument(likesCount, documentIdentity);
    }
  };

  const updateComments = async (e) => {
    e.preventDefault();
    if(!authStatus){
      toast({
        title: "Error",
        description: "Please log in first.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
  }
    if(usercomment){
      const commentArray = {
        ["comments"]: [usercomment],
      }
      await postDatabase._updateDocument(commentArray, documentIdentity);
      setUserComment("")
    }

  };
  
  return (
    <Box maxW="600px" w="100%" overflow="hidden">
  <Flex p={2} justify="space-between" align="center">
    <Flex align="center">
      <IconButton size={"xs"} icon={<AiFillHeart />} mr={2} colorScheme={isLiked ? "teal" : "teal"} onClick={updateLikes} />
      <Text fontSize={"xs"}>{likes ? likes + " likes" : "0 likes"}</Text>
    </Flex>
    <Flex align="center">
      <IconButton
        size={"sm"}
        icon={<AiOutlineComment />}
        mr={2}
        onClick={handleCommentClick}
      />
      <Text fontSize={"xs"}>
        {comments?.length + " " + "comments"}
      </Text>
    </Flex>
  </Flex>

  <Modal isOpen={isCommentModalOpen} onClose={handleCloseCommentModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Comments</ModalHeader>
      <ModalCloseButton onClick={handleCloseCommentModal} />
      <ModalBody>
        {comments?.map((comment, index) => (
          <Text fontSize={"sm"} key={index}><Avatar size={"xs"}/>{" "}<b>anonymous user</b> : {comment}</Text>
        ))}
      </ModalBody>
      <ModalBody>
        <Textarea
          value={usercomment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Add a comment..."
        />
      </ModalBody>
      <ModalFooter>
        <Button size={"sm"} colorScheme="teal" onClick={updateComments}>
          Add Comment
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</Box>
  )
};

export default Comments;
