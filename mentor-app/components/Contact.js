import React from "react";
// import { Row, Col, Form, Input, InputNumber, Button } from "antd";
import styles from "../styles/Contact.module.css";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Image from "next/image";
import contactImage from "../Images/undraw_contact_us_re_4qqt.svg";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsTwitter, BsPerson } from "react-icons/bs";

export default function contact() {
  return (
    <Container
      bg="#70C1B3"
      maxW="full"
      mt={0}
      p={3}
      centerContent
      overflow="hidden"
    >
      <Flex>
        <Box
          bg="#fff"
          color="black"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 20 }}
          p={{ sm: 5, md: 5, lg: 8 }}
          minW={{ sm: "full", md: "full", lg: "1000px" }}
          maxW="full"
        >
          <Flex
            p={0}
            maxW="full"
            direction={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
          >
            {/* <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }} maxW="full"> */}
            <WrapItem
              maxW="100%"
              minW="50%"
              // mr={0}
              // pr={0}
              centerContent
              justifyContent="center"
              m={4}
            >
              <Box maxW="full" centerContent justifyContent="center">
                <Heading centerContent textAlign={"center"}>
                  Contact
                </Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                  Fill in the form below to contact us
                </Text>
                <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }} maxW="full">
                  <VStack pl={0} spacing={3} alignItems="center" maxW="full">
                    <Button
                      size="md"
                      height="48px"
                      width="200px"
                      variant="ghost"
                      color="gray.700"
                      _hover={{ border: "2px solid #247BA0" }}
                      leftIcon={<MdPhone color="#F25F5C" size="20px" />}
                    >
                      +44-799424429
                    </Button>
                    <Button
                      size="md"
                      height="48px"
                      width="200px"
                      variant="ghost"
                      color="gray.700"
                      _hover={{ border: "2px solid #247BA0" }}
                      leftIcon={<MdEmail color="#F25F5C" size="20px" />}
                    >
                      hello@mentoree.com
                    </Button>
                    <Button
                      size="md"
                      height="48px"
                      width="200px"
                      variant="ghost"
                      color="gray.700"
                      _hover={{ border: "2px solid #247BA0" }}
                      leftIcon={<MdLocationOn color="#F25F5C" size="20px" />}
                    >
                      London, UK
                    </Button>
                  </VStack>
                </Box>
                <HStack
                  mt={{ lg: 10, md: 10 }}
                  spacing={5}
                  px={5}
                  alignItems="flex-start"
                >
                  <IconButton
                    aria-label="facebook"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "#247BA0" }}
                    icon={<MdFacebook size="28px" />}
                  />
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "#247BA0" }}
                    icon={<BsGithub size="28px" />}
                  />
                  <IconButton
                    aria-label="twitter"
                    variant="ghost"
                    size="lg"
                    isRound={true}
                    _hover={{ bg: "#247BA0" }}
                    icon={<BsTwitter size="28px" />}
                  />
                </HStack>
              </Box>
            </WrapItem>
            <WrapItem minW={"50%"} centerContent justifyContent="center">
              <Box bg="white" borderRadius="lg" w={"full"}>
                <Box m={8} color="#0B0E3F">
                  <VStack spacing={5}>
                    <FormControl id="name">
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<BsPerson color="gray.800" />}
                        />
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Mail</FormLabel>
                      <InputGroup borderColor="#E0E1E7">
                        <InputLeftElement
                          pointerEvents="none"
                          children={<MdOutlineEmail color="gray.800" />}
                        />
                        <Input type="text" size="md" />
                      </InputGroup>
                    </FormControl>
                    <FormControl id="name">
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        borderColor="gray.300"
                        _hover={{
                          borderRadius: "gray.300",
                        }}
                        placeholder="message"
                      />
                    </FormControl>
                    <FormControl id="name" float="right">
                      <Button
                        variant="solid"
                        bg="#247BA0"
                        color="white"
                        _hover={{}}
                      >
                        Send Message
                      </Button>
                    </FormControl>
                  </VStack>
                </Box>
              </Box>
            </WrapItem>
            {/* </Wrap> */}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}

// export default function Contact() {
//   const layout = {
//     labelCol: {
//       span: 4,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const validateMessages = {
//     required: "${label} is required!",
//     types: {
//       email: "${label} is not a valid email!",
//       number: "${label} is not a valid number!",
//     },
//     number: {
//       range: "${label} must be between ${min} and ${max}",
//     },
//   };

//   const onFinish = (values) => {
//     console.log(values);
//   };
//   return (
//     <div className={styles.contactContainer}>
//       {" "}
//       <div className={styles.contactImg}>
//         <Image src={contactImage}></Image>
//       </div>
//       <div className={styles.contactForm}>
//         <Form
//           {...layout}
//           name="nest-messages"
//           onFinish={onFinish}
//           validateMessages={validateMessages}
//         >
//           <Form.Item
//             name={["user", "name"]}
//             label="Name"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "email"]}
//             label="Email"
//             rules={[
//               {
//                 type: "email",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item name={["user", "introduction"]} label="Message">
//             <Input.TextArea className={styles.textarea} rows={10} />
//           </Form.Item>
//           <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{ borderRaduis: "45px" }}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }
