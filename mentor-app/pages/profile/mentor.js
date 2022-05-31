import React, { useEffect, useState } from "react";
import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import css from "../read-profile/mentor.module.css";
import { server } from "../../config";
import { Button } from "react-bootstrap";
import styles from "../../styles/AllMentors.module.css";

import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";

import { createBreakpoints } from "@chakra-ui/theme-tools";
import { Icon } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import {
  Box,
  HStack,
  Badge,
  Button as ButtonCh,
  Center,
  Flex,
  Heading,
  Image,
  Link as LinkCh,
  Stack,
  Text,
  useColorModeValue,
  extendTheme,
} from "@chakra-ui/react";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

const theme = extendTheme({ breakpoints });

export default function Profile() {
  //currentMentor is the mentor pulled from our database
  const [currentMentor, setCurrentMentor] = useState(null);
  // user is the user provided by firebase
  const [user, loading, error] = useAuthState(firebase.auth());
  // console.log("testing: " + { ...firebase });
  //takes the firebase uid and fetches the corresponding mentor from database, then assigns it to currentMentor
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid;
      // const loginid = 'hJAvwClURqXX0aiqsKsIlXqNa0R2'
      console.log("about to send GET request!");

      const res = await fetch(`${server}/api/mentors/${loginid}`);

      const data = await res.json();
      setCurrentMentor(data[0]);
      console.log(user);
    }
  }, [user]);
  console.log("testing: ", currentMentor);
  //render page only if currentMentor is loaded, otherwise show loading text

  if (currentMentor !== null) {
    // let socialsKey = Object.keys(currentMentor.socials);
    console.log("check here!");
    console.log(currentMentor);
    return (
      <div className={css.profileFullArea}>
        <h1>Your profile</h1>
        <br />
        <Center p={15}>
          <Box
            justifyContent={"center"}
            display={{ md: "flex" }}
            width={{ base: "100%", sm: "50%", md: "25%" }}
          >
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: "100%", md: "55%" }}
              minHeight={{ sm: "480px", md: "20rem" }}
              minWidth={{ sm: "480px", md: "70rem" }}
              direction={{ base: "column", md: "row" }}
              bg={useColorModeValue("white", "gray.900")}
              boxShadow={"2xl"}
              padding={9}
              overflow={"hidden"}
              alignContent={"center"}
              alignItems={"center"}
              justifyContent={"center"}
              justifyItems={"center"}
            >
              <Box flexShrink="0">
                <Stack
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mt={"1rem"}
                >
                  <div className={css.ImgContainer}>
                    <Image
                      className={css.profilePic}
                      boxSize="280px"
                      src={currentMentor.photourl}
                      alt=""
                    />
                  </div>

                  <Text
                    fontWeight={600}
                    color={"gray.500"}
                    size="sm"
                    mb={4}
                    pb={4}
                  >
                    {currentMentor.socials ? (
                      <div className={styles.socials}>
                        {Object.keys(currentMentor.socials)[0] ===
                        "linkedin" ? (
                          <LinkedinIcon
                            handle={Object.values(currentMentor.socials)[0]}
                          />
                        ) : null}
                        {Object.keys(currentMentor.socials)[0] === "github" ? (
                          <GithubIcon
                            handle={Object.values(currentMentor.socials)[0]}
                          />
                        ) : null}
                        {Object.keys(currentMentor.socials)[0] === "twitter" ? (
                          <TwitterIcon
                            handle={Object.values(currentMentor.socials)[0]}
                          />
                        ) : null}
                      </div>
                    ) : null}
                  </Text>
                </Stack>
              </Box>

              <Box>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center left"
                  alignItems="center left"
                  p={9}
                  pt={2}
                >
                  <HStack>
                    <Heading
                      fontSize={"4xl"}
                      fontFamily={"body"}
                      alignText={"center left"}
                    >
                      {currentMentor.firstname} {currentMentor.surname}
                    </Heading>
                    <Text
                      fontWeight={600}
                      color={"gray.500"}
                      fontSize="lg"
                      mb={4}
                      pt={4}
                      pl={3}
                    >
                      {currentMentor.jobtitle} at {currentMentor.company}
                    </Text>
                  </HStack>

                  <HStack pt={2}>
                    <Icon as={IoLocationSharp} />
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                      {currentMentor.location}
                    </Text>
                  </HStack>
                  <Stack
                    alignItems={"center left"}
                    justifyContent={"center left"}
                    direction={"row"}

                    // mt={3}
                  >
                    {currentMentor.skills ? (
                      <div className={styles.skills}>
                        {currentMentor.skills.map((skill, index) => (
                          <p className={styles.skill} key={index}>
                            {skill}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </Stack>

                  <Text
                    textAlign={"center left"}
                    color={useColorModeValue("gray.700", "gray.400")}
                    overflow={"hidden"}
                    pr={6}
                    pt={3}
                    fontSize={"1.3em"}
                  >
                    {/* <Heading
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      alignText={"center left"}
                      fontWeight={500}
                      py={4}
                    >
                      Biography
                    </Heading> */}
                    {currentMentor.biography}
                  </Text>
                </Stack>
              </Box>

              <Box>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center left"
                  alignItems="center left"
                  p={1}
                  pt={2}
                >
                  <div className={css.topSquare}>
                    <p>Description of what is offered</p>
                  </div>
                  <div className={css.lowSquare}>
                    <Link href="/edit-profile/mentor">
                      <Button>Edit Profile</Button>
                    </Link>
                  </div>

                  <Link href="/allMentors">
                    <ButtonCh
                      flex={1}
                      fontSize={"lg"}
                      size={"md"}
                      height="48px"
                      width="200px"
                      border="2px"
                      colorScheme="teal"
                      variant="ghost"
                      // rounded={"full"}
                      // bg={"gray.500"}
                      // color={"white"}
                      boxShadow={
                        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                      }
                      _hover={{
                        bg: "blue.500",
                        borderColor: "blue.500",
                        color: "white",
                      }}
                      _focus={{
                        bg: "blue.500",
                      }}
                    >
                      View all Mentors
                    </ButtonCh>
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Center>
      </div>
    );
  } else return <p>loading data...</p>;
}
