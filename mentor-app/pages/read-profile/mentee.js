import React, { useEffect, useState } from "react";
import Link from "next/link";
// import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
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
  const [currentMentee, setCurrentMentee] = useState(null);
  // const [user, loading, error] = useAuthState(firebase.auth())

  // const [apply, setApply] = useState(true)

  // async function handleApply() {

  //   setApply(false)
  //   const data = { mentor_id: currentMentee.loginid, mentee_id: user.uid }
  //   const res = await fetch(`${server}/api/connection`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   const response = await res.json()
  //   console.log(response)
  // }

  useEffect(async () => {
    const loginid = await currentId;
    const res = await fetch(`${server}/api/mentees/${loginid}`);
    const data = await res.json();
    // fetch mentee info
    setCurrentMentee(data[0]);
  }, []);

  if (currentMentee !== null) {
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
                  <div className={styles.ImgContainer}>
                    <Image
                      boxSize="280px"
                      src={currentMentee.photourl}
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
                    {currentMentee.socials ? (
                      <div className={styles.socials}>
                        {Object.keys(currentMentee.socials)[0] ===
                        "linkedin" ? (
                          <LinkedinIcon
                            handle={Object.values(currentMentee.socials)[0]}
                          />
                        ) : null}
                        {Object.keys(currentMentee.socials)[0] === "github" ? (
                          <GithubIcon
                            handle={Object.values(currentMentee.socials)[0]}
                          />
                        ) : null}
                        {Object.keys(currentMentee.socials)[0] === "twitter" ? (
                          <TwitterIcon
                            handle={Object.values(currentMentee.socials)[0]}
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
                      {currentMentee.firstname} {currentMentee.surname}
                    </Heading>
                    <Text
                      fontWeight={600}
                      color={"gray.500"}
                      fontSize="lg"
                      mb={4}
                      pt={4}
                      pl={3}
                    >
                      {currentMentee.jobtitle} at {currentMentee.company}
                    </Text>
                  </HStack>

                  <HStack pt={2}>
                    <Icon as={IoLocationSharp} />
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                      {currentMentee.location}
                    </Text>
                  </HStack>
                  <Stack
                    alignItems={"center left"}
                    justifyContent={"center left"}
                    direction={"row"}

                    // mt={3}
                  >
                    {currentMentee.skills ? (
                      <div className={styles.skills}>
                        {currentMentee.skills.map((skill, index) => (
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
                    {currentMentee.biography}
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
                    {apply ? (
                      <Button onClick={() => handleApply()}>Apply Now</Button>
                    ) : (
                      <p>
                        Thank you for applying, {currentMentee.firstname}{" "}
                        {currentMentee.surname} will reply back witihn 48 hours{" "}
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





//         <div className={css.profileMainArea}>
//           <div className={css.profileLeft}>
//             <img
//               className={css.profileImage}
//               src={currentMentee.photourl}
//             ></img>
//             <div className={css.socialsArea}>
//               {Object.keys(currentMentee.socials)[0] === "linkedin" ? (
//                 <LinkedinIcon
//                   handle={Object.values(currentMentee.socials)[0]}
//                 />
//               ) : null}
//               {Object.keys(currentMentee.socials)[0] === "github" ? (
//                 <GithubIcon handle={Object.values(currentMentee.socials)[0]} />
//               ) : null}
//               {Object.keys(currentMentee.socials)[0] === "twitter" ? (
//                 <TwitterIcon handle={Object.values(currentMentee.socials)[0]} />
//               ) : null}
//             </div>
//           </div>
//           <div className={css.profileRight}>
//             <h1>
//               {currentMentee.firstname} {currentMentee.surname}
//             </h1>
//             <h3>{currentMentee.location}</h3>
//             <h3>{currentMentee.tagline}</h3>
//             <span>
//               <h4 className={css.jobtitle}>{currentMentee.jobtitle} </h4>
//               at <em>{currentMentee.company}</em>
//             </span>
//             <div className={css.skills}>
//               {currentMentee.skills.length > 0
//                 ? currentMentee.skills.map((item) => (
//                     <div className={css.skill}>{item}</div>
//                   ))
//                 : null}
//               {/* <div className={css.skill}>skill</div> */}
//             </div>
//           </div>
//           <div className={css.biographyArea}>
//             <h3>Biography</h3>

//             <p className={css.bio}>{currentMentee.biography}</p>
//           </div>
//         </div>

//         <div className={css.sideDisplay}>
//           <div className={css.rightSquare}>
//             <div className={css.topSquare}></div>
//             <div className={css.lowSquare}></div>
//           </div>
//         </div>
//       </div>
//     );
//   } else return <p>loading data...</p>;
// }
