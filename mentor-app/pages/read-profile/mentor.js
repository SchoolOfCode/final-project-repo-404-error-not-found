import React, { useEffect, useState, useLayoutEffect } from "react";
import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import css from "./mentor.module.css";
import { server } from "../../config";
import { Button } from "react-bootstrap";
import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";
import styles from "../../styles/AllMentors.module.css";
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

export async function getServerSideProps(context) {
  return {
    props: {
      currentId: context.query.loginid,
    },
  };
}

export default function Profile(props) {
  const { currentId } = props;
  const [currentMentor, setCurrentMentor] = useState(null);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [apply, setApply] = useState(true);
  const [userRole, setUserRole] = useState("default");

  // const [userIsLoaded, setUserIsLoaded] = useState(false);

  // useEffect(() => {
  //   setUserIsLoaded(!userIsLoaded);
  // }, [user]);

  useEffect(async () => {
    if (user) {
      const res = await fetch(`${server}/api/mentors/${user.uid}`);
      const response = await res.json();
      console.log(response);

      if (response[0]) {
        setUserRole("mentor");
      } else {
        setUserRole("mentee");
      }
      console.log("User role is", userRole);
    }
  }, [loading, user]);

  async function handleApply() {
    setApply(false);
    const data = { mentor_id: currentMentor.loginid, mentee_id: user.uid };
    const res = await fetch(`${server}/api/connection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    console.log(response);
  }

  useEffect(async () => {
    const loginid = await currentId;
    console.log("about to send GET request!");
    const res = await fetch(`${server}/api/mentors/${loginid}`);
    const data = await res.json();
    setCurrentMentor(data[0]);
  }, []);

  if (currentMentor !== null) {
    return (
      <div className={css.profileFullArea}>
        <h1>Mentor Profile</h1>
        {/* <p>You are currently logged in as a {userRole}.</p> */}

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
              minWidth={{ sm: "480px", md: "60rem" }}
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
                  <div className={styles.ImgContainer}>
                    <Image
                      className={styles.profilePic}
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
                  p={{ sm: 2, md: 4, lg: 8 }}
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
                    textAlign={{
                      sm: "left",
                    }}
                    color={useColorModeValue("gray.700", "gray.400")}
                    overflow={"hidden"}
                    pr={6}
                    pt={3}
                    fontSize={{ sm: "1.3em" }}
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
                    {userRole === "mentor" ? null : apply ? (
                      <Button onClick={() => handleApply()}>Apply Now</Button>
                    ) : (
                      <p>
                        Thank you for applying, {currentMentor.firstname}{" "}
                        {currentMentor.surname} will reply back witihn 48 hours{" "}
                      </p>
                    )}
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
