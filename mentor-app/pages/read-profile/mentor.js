import React, { useEffect, useState } from "react";
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
import { IoLocationSharp } from "react-icons/io5";
import {
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
} from "@chakra-ui/react";

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
        <h1>Mentor profile</h1>
        <br />
        <Center p={20}>
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: "100%", md: "55%" }}
            minHeight={{ sm: "480px", md: "20rem" }}
            minWidth={{ sm: "480px", md: "70rem" }}
            direction={{ base: "column", md: "row" }}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            padding={3}
            overflow={"hidden"}
            alignContent={"center"}
            alignItems={"center"}
            justifyContent={"center"}
            justifyItems={"center"}
          >
            <Stack
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"1rem"}
            >
              <div className={styles.ImgContainer}>
                <Image boxSize="280px" src={currentMentor.photourl} alt="" />
              </div>

              <Text fontWeight={600} color={"gray.500"} size="sm" mb={4} pb={4}>
                {currentMentor.socials ? (
                  <div className={styles.socials}>
                    {Object.keys(currentMentor.socials)[0] === "linkedin" ? (
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

            <Stack
              flex={1}
              flexDirection="column"
              justifyContent="center left"
              alignItems="center left"
              p={1}
              pt={2}
            >
              <Heading
                fontSize={"3xl"}
                fontFamily={"body"}
                alignText={"center left"}
              >
                {currentMentor.firstname} {currentMentor.surname}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                {currentMentor.jobtitle} at {currentMentor.company}
              </Text>
              <HStack>
                <Image boxSize="30px" icon={<IoLocationSharp />} alt="" />
                <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                  {currentMentor.location}
                </Text>
              </HStack>

              <Text
                textAlign={"center left"}
                color={useColorModeValue("gray.700", "gray.400")}
                // px={3}
                overflow={"hidden"}
                pr={6}
                // maxWidth={"9ch"}
              >
                <h2>Biography</h2>
                {currentMentor.biography}
              </Text>

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
                      {" "}
                      Thank you for applying, {currentMentor.firstname}{" "}
                      {currentMentor.surname} will reply back witihn 48 hours{" "}
                    </p>
                  )}
                </div>

                <Link href="/allMentors">
                  <Button>Back to Main</Button>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Center>
      </div>
    );
  } else return <p>loading data...</p>;
}
