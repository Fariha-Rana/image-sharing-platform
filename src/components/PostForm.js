"use client";
import { useState } from "react";
import {
  Center,
  Box,
  Input,
  Button,
  HStack,
  Spacer,
  Image,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import imageStorage from "@/appwrite/imageStorage";
import postDatabase from "@/appwrite/postsDatabase";
import useAuth from "@/context/useAuth";
const PostForm = () => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const  { userData, authStatus} = useAuth()
  const handleImageChange = (e) => {
    if (!authStatus) {
      toast({
        title: "Error",
        description: "Please log in first.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const file = e.target.files[0];
    setSelectedImage(file);

  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
       const result =  await imageStorage.uploadImage(selectedImage);
       const result2 =  await imageStorage.getFileByUniqueID(result.$id)

        let data = {
          caption: caption || "",
          userid: userData.$id,
          imageurl: result2.href,
          name : userData.name || "anonymous",
        }
        await postDatabase.uploadPostData(data)
      setSelectedImage(null);
      setCaption("");

      toast({
        title: "Success",
        description: "Image uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Center ml={4}  mt={2} 
     width={"94vw"}
    >
      <HStack
        spacing={1}
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        
        <Input
          type="text"
          placeholder="What's on your mind?"
          value={caption}
          onChange={handleCaptionChange}
          fontSize={["0.6em", "0.9em"]}
          maxHeight={"4rem"}
          p={4}
        />
        {selectedImage && (
            <Box ml={2}>
              <Image src={URL.createObjectURL(selectedImage)} alt="Selected" height={8} width={8}  style={{
                          width: "50px",
                          height: "50px",
                           objectFit: 'cover'
                        }} />
            </Box>
          )}

        <InputGroup maxW="2rem" maxH="2rem" ml={2}>
          <InputRightElement
            pointerEvents="none"
            children={<AttachmentIcon color="purple.300" />}
          />

          <Input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{
              opacity: 0,
              cursor: "pointer",
            }}
            
          />
        </InputGroup>
        <Spacer />
        <Button
          width={"min-content"}
          fontSize={"0.8em"}
          colorScheme="teal"
          onClick={handleUpload}

        >
          Post
        </Button>
      </HStack>
    </Center>
  );
};

export default PostForm;
