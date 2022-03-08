import styles from "../../styles/AllMentors.module.css";
import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";
import Link from "next/link";
import { server } from "../../config";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

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
          <div key={userid}>
            <Center py={6}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "55%" }}
                minHeight={{ sm: "480px", md: "20rem" }}
                direction={{ base: "column", md: "row" }}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                padding={4}
              >
                <Stack flex={1}>
                  <div className={styles.ImgContainer}>
                    <Image boxSize="280px" src={photourl} alt="" />
                  </div>
                </Stack>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  pt={2}
                >
                  <HStack spacing="24px">
                    <Heading fontSize={"3xl"} fontFamily={"body"}>
                      {firstname} {surname}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                      {jobtitle} at {company}
                    </Text>
                  </HStack>
                  {/* <Text fontWeight={600} color={"gray.600"} size="sm" mb={4}>
                    {email}
                  </Text> */}
                  <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                    {location}
                  </Text>
                  <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
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
                  <Text
                    noOfLines={10}
                    textAlign={"center"}
                    color={useColorModeValue("gray.700", "gray.400")}
                    px={3}
                    //overflow={"hidden"}
                    text-overflow={"ellipsis"}
                    max-width={"13ch"}
                  >
                    {biography}
                  </Text>

                  <Stack
                    align={"center"}
                    justify={"center"}
                    direction={"row"}
                    mt={6}
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
                      mt={"2rem"}
                      direction={"row"}
                      padding={2}
                      justifyContent={"space-between"}
                      alignItems={"center"}
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

{
  /* //             <a className={styles.mentorCard}> */
}
//               {/* <div className={styles.profileLeft}> */}
//                 {/* <img
//                   className={styles.profilePic}
//                   src={photourl}
//                   // style={{ width: 100, height: 100, borderRadius: "50%" }}
//                 ></img> */}

//                 {/* {socials ? (
//                   <div className={styles.socials}>
//                     {Object.keys(socials)[0] === "linkedin" ? (
//                       <LinkedinIcon handle={Object.values(socials)[0]} />
//                     ) : null}
//                     {Object.keys(socials)[0] === "github" ? (
//                       <GithubIcon handle={Object.values(socials)[0]} />
//                     ) : null}
//                     {Object.keys(socials)[0] === "twitter" ? (
//                       <TwitterIcon handle={Object.values(socials)[0]} />
//                     ) : null}
//                   </div>
//                 ) : null} */}
{
  /* //               </div> */
}
{
  /* //               <div className={styles.cardTextArea}>
//                 <div className={styles.profileRight}>
//                   <h3>
//                     {firstname} {surname}
//                   </h3>
//                   <span>
//                     <h4 className={styles.jobtitle}>{jobtitle} </h4>
//                     at <em>{company}</em>
//                   </span>

//                   <p className={styles.location}>{location}</p>
//                   <p>Email: {email}</p>
//                   {/* <p className={styles.bio}>{biography}</p> */
}
//                 </div>

//                 {skills ? ( */}
//                   <div className={styles.skills}>
//                     {skills.map((skill, index) => (
//                       <p className={styles.skill} key={index}>
//                         {skill}
//                       </p>
//                     ))}
//                   </div>
//                 ) : null}
//               </div>

//               {/* <Link
//                 href={{
//                   pathname: "/read-profile/mentor",
//                   query: {
//                     loginid: loginid,
//                   },
//                 }}
//               >
//                 <Button variant="outline-success">View Profile</Button>
//               </Link> */}
//             {/* </a> */}
//           {/* </div> */}
//         {/* ) : null; */}
//       })}
//     </div>
//   );
// };

export default AllMentors;
