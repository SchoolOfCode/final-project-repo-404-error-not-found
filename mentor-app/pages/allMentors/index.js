import styles from "../../styles/AllMentors.module.css";
import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";
import Link from "next/link";
import { server } from "../../config";

import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Icon } from "@chakra-ui/react";
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

export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/mentors`);
  const data = await res.json();

  return {
    props: { mentors: data },
  };
};

const AllMentors = ({ mentors }) => {
  return (
    <motion.div
      className={styles.body}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {mentors.map((mentor) => {
        const {
          loginid,
          biography,
          firstname,
          surname,
          email,
          socials,
          photourl,
          location,
          userid,
          skills,
          jobtitle,
          company,
        } = mentor;
        return firstname ? (
          <div
            key={userid}
            className={styles.mentorDisplayCard}
            data-cy={`mentorDisplayCard`}
          >
            <Center py={6}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "55%" }}
                minHeight={{ sm: "480px", md: "20rem" }}
                direction={{ base: "column", md: "row" }}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                padding={3}
                overflow={"hidden"}
              >
                <Stack
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                  mt={"1rem"}
                >
                  <div className={styles.ImgContainer}>
                    <Image boxSize="280px" src={photourl} alt="" />
                  </div>
                  <Text
                    fontWeight={600}
                    color={"gray.500"}
                    size="sm"
                    mb={4}
                    pb={4}
                  >
                    {socials ? (
                      <div className={styles.socials}>
                        {Object.keys(socials)[0] === "linkedin" ? (
                          <LinkedinIcon handle={Object.values(socials)[0]} />
                        ) : null}
                        {Object.keys(socials)[0] === "github" ? (
                          <GithubIcon handle={Object.values(socials)[0]} />
                        ) : null}
                        {Object.keys(socials)[0] === "twitter" ? (
                          <TwitterIcon handle={Object.values(socials)[0]} />
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
                    {firstname} {surname}
                  </Heading>
                  <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    {jobtitle} at {company}
                  </Text>

                  {/* <Text fontWeight={600} color={"gray.600"} size="sm" mb={4}>
                    {email}
                  </Text> */}
                  <HStack>
                    <Icon as={IoLocationSharp} />
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                      {location}
                    </Text>
                  </HStack>
                  {/* <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    {socials ? (
                      <div className={styles.socials}>
                        {Object.keys(socials)[0] === "linkedin" ? (
                          <LinkedinIcon handle={Object.values(socials)[0]} />
                        ) : null}
                        {Object.keys(socials)[0] === "github" ? (
                          <GithubIcon handle={Object.values(socials)[0]} />
                        ) : null}
                        {Object.keys(socials)[0] === "twitter" ? (
                          <TwitterIcon handle={Object.values(socials)[0]} />
                        ) : null}
                      </div>
                    ) : null}
                  </Text> */}
                  <Text
                    noOfLines={3}
                    textAlign={"center left"}
                    color={useColorModeValue("gray.700", "gray.400")}
                    // px={3}
                    overflow={"hidden"}
                    text-overflow={"ellipsis"}
                    pr={6}
                    // maxWidth={"9ch"}
                  >
                    {biography}
                  </Text>

                  <Stack
                    alignItems={"center left"}
                    justifyContent={"center left"}
                    direction={"row"}

                    // mt={3}
                  >
                    {skills ? (
                      <div className={styles.skills}>
                        {skills.map((skill, index) => (
                          <p className={styles.skill} key={index}>
                            {skill}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </Stack>
                  <div>
                    <Stack
                      width={"100%"}
                      mt={"0.5rem"}
                      direction={"row"}
                      pt={2}
                      pb={2}
                      // justifyContent={"space-between"}
                      // alignItems={"center left"}
                    >
                      <Link
                        href={{
                          pathname: "/read-profile/mentor",
                          query: {
                            loginid: loginid,
                          },
                        }}
                      >
                        <Button
                          flex={1}
                          fontSize={"sm"}
                          rounded={"full"}
                          _focus={{
                            bg: "gray.200",
                          }}
                        >
                          View Profile
                        </Button>
                      </Link>
                    </Stack>
                  </div>
                </Stack>
              </Stack>
            </Center>
          </div>
        ) : null;
      })}
    </motion.div>
  );
};

export default AllMentors;
