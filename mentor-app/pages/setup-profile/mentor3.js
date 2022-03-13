import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import { server } from "../../config";

import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import * as Yup from "yup";

import {
  Box,
  ButtonGroup,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { Formik } from "formik";

import { InputControl, SubmitButton } from "formik-chakra-ui";

const url = process.env.REACT_APP_BACKEND_URL;

//add location and profile pic url fields

function Mentor() {
  const [user, loading, error] = useAuthState(firebase.auth());

  const loginid = user ? user.uid : "";

  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [biography, setBiography] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [tagline, setTagline] = useState("");
  const [skills, setSkills] = useState([]);
  const [socialMediaType, setSocialMediaType] = useState("");
  const [socialMediaUserName, setSocialMediaUserName] = useState("");
  const [socials, setSocials] = useState({});

  const [isLogIn, setLogIn] = useState(null);

  // useEffect(() => {
  //   setLogIn(user);
  // }, [user]);

  useEffect(async () => {
    if (user !== null) {
      //create 1 page for set up
      //create one page for sign in
      const data = { loginid: user.uid };
      console.log("about to send post request!");

      const res = await fetch(`${server}/api/mentors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
    }
  }, [user]);

  //update social media object whenever the type or username changes
  useEffect(() => {
    setSocials({ [socialMediaType]: socialMediaUserName });
  }, [socialMediaType, socialMediaUserName]);

  function updateSkills(e) {
    console.log(`${e.target.id} = ${e.target.checked}`);
    //add skill to skills array when box is checked
    if (e.target.checked) {
      setSkills([...skills, e.target.id]);
    } else if (e.target.checked === false) {
      //remove skill from skillls array when box is unchecked
      setSkills([...skills.filter((item) => item !== e.target.id)]);
    }
  }

  //   const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const body = {
      firstname,
      surname,
      email,
      //no job title in db yet --DONE
      jobtitle,
      // no company in db yet --DONE
      company,
      location,
      biography,
      photourl,
      tagline,
      //skills array will neeed constructing --DONE
      skills,
      //social media object will need constructing --DONE (for single social media entry)
      socials,
    };
    //patch request to update mentor at id
    // const data = { loginid: user.uid };
    const loginid = user.uid;

    const response = await fetch(`${server}/api/mentors/${loginid}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(JSON.stringify(body));
    router.push("/profile/mentor");
  };

  const onSubmit = async () => {
    const body = {
      firstname,
      surname,
      email,
      //no job title in db yet --DONE
      jobtitle,
      // no company in db yet --DONE
      company,
      location,
      biography,
      photourl,
      tagline,
      //skills array will neeed constructing --DONE
      skills,
      //social media object will need constructing --DONE (for single social media entry)
      socials,
    };
    //patch request to update mentor at id
    // const data = { loginid: user.uid };
    const loginid = user.uid;

    const response = await fetch(`${server}/api/mentors/${loginid}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(JSON.stringify(body));
    router.push("/profile/mentor");
  };

  const initialValues = {
    firstname: "",
    surname: "",
    email: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required(),
    surname: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Container
            bg="#9DC4FB"
            maxW="full"
            mt={0}
            centerContent
            overflow="hidden"
            as={"form"}
            onSubmit={handleSubmit}
          >
            <Flex>
              <Box
                bg="#02054B"
                color="white"
                borderRadius="lg"
                m={{ sm: 4, md: 16, lg: 10 }}
                p={{ sm: 5, md: 5, lg: 16 }}
              >
                <Box p={4}>
                  <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                    <VStack>
                      <WrapItem>
                        <Box>
                          <Heading mb={"1rem"}>Setup Profile</Heading>
                          {/* <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack
                        pl={0}
                        spacing={3}
                        alignItems="flex-start"
                      ></VStack>
                    </Box> */}
                          {/* <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    ></HStack> */}
                        </Box>
                      </WrapItem>

                      <WrapItem>
                        <Box bg="white" borderRadius="lg">
                          <Box m={8} color="#0B0E3F">
                            <HStack>
                              <Box mr={6}>
                                <VStack spacing={5}>
                                  <InputControl
                                    name="firstname"
                                    label="First Name"
                                    onChange={(e) =>
                                      setFirstname(e.target.value)
                                    }
                                  />
                                  <InputControl
                                    name="surname"
                                    label="Surname"
                                    onChange={(e) => setSurname(e.target.value)}
                                  />
                                  <InputControl
                                    name="email"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />

                                  <FormControl id="name">
                                    <FormLabel>Job Title</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                      <InputLeftElement pointerEvents="none" />

                                      <Input
                                        type="text"
                                        size="md"
                                        id="jobtitle"
                                        value={jobtitle}
                                        onChange={(e) =>
                                          setJobtitle(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormControl>
                                  <FormControl id="name">
                                    <FormLabel>Company</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                      <InputLeftElement pointerEvents="none" />

                                      <Input
                                        type="text"
                                        size="md"
                                        id="company"
                                        value={company}
                                        onChange={(e) =>
                                          setCompany(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormControl>
                                  <FormControl id="name">
                                    <FormLabel>Location</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                      <InputLeftElement pointerEvents="none" />

                                      <Input
                                        type="text"
                                        size="md"
                                        id="location"
                                        value={location}
                                        placeholder="City"
                                        onChange={(e) =>
                                          setLocation(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormControl>
                                </VStack>
                              </Box>

                              <Box ml={6}>
                                <VStack spacing={5}>
                                  <FormControl id="name">
                                    <FormLabel>Biography</FormLabel>
                                    <Textarea
                                      id="biography"
                                      value={biography}
                                      onChange={(e) =>
                                        setBiography(e.target.value)
                                      }
                                      maxLength="600ch"
                                      borderColor="gray.300"
                                      _hover={{
                                        borderRadius: "gray.300",
                                      }}
                                    />
                                  </FormControl>
                                  <FormControl id="name">
                                    <FormLabel>Tagline</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                      <InputLeftElement pointerEvents="none" />

                                      <Input
                                        type="text"
                                        size="md"
                                        id="tagline"
                                        placeholder="One sentence about yourself"
                                        value={tagline}
                                        onChange={(e) =>
                                          setTagline(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormControl>

                                  <FormControl id="name">
                                    <FormLabel>Skills</FormLabel>
                                    <CheckboxGroup>
                                      <Stack
                                        spacing={[1, 5]}
                                        direction={["column", "row"]}
                                      >
                                        <Checkbox
                                          id="frontend"
                                          value="frontend"
                                          onChange={updateSkills}
                                          spacing="3em"
                                        >
                                          Frontend
                                        </Checkbox>
                                        <Checkbox
                                          id="fullstack"
                                          value="fullstack"
                                          onChange={updateSkills}
                                        >
                                          Fullstack
                                        </Checkbox>
                                        <Checkbox
                                          id="backend"
                                          value="backend"
                                          onChange={updateSkills}
                                        >
                                          Backend
                                        </Checkbox>
                                        <Checkbox
                                          id="ux-ui"
                                          value="ux-ui"
                                          onChange={updateSkills}
                                        >
                                          UX/UI
                                        </Checkbox>
                                      </Stack>
                                    </CheckboxGroup>
                                  </FormControl>

                                  <FormControl id="name">
                                    <FormLabel>Social Media Handle</FormLabel>
                                    <InputGroup borderColor="#E0E1E7">
                                      <InputLeftElement pointerEvents="none" />

                                      <Input
                                        type="text"
                                        size="md"
                                        id="socialmediausername"
                                        placeholder="@"
                                        value={socialMediaUserName}
                                        onChange={(e) =>
                                          setSocialMediaUserName(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                  </FormControl>

                                  <FormControl id="name">
                                    <Select placeholder="Select Social Media Type">
                                      <option value="github">Github</option>
                                      <option value="linkedin">LinkedIn</option>
                                      <option value="twitter">Twitter</option>
                                    </Select>
                                  </FormControl>

                                  <ButtonGroup>
                                    <SubmitButton>Submit</SubmitButton>
                                  </ButtonGroup>
                                </VStack>
                              </Box>
                            </HStack>
                          </Box>
                        </Box>
                      </WrapItem>
                    </VStack>
                  </Wrap>
                </Box>
              </Box>
            </Flex>
          </Container>
        )}
      </Formik>
    </>
  );
}

export default Mentor;
