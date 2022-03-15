import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { server } from "../../config";

import React, { useEffect } from "react";
import { useState } from "react";
import css from "./mentor.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
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

function EditMentor() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [mentor, setMentor] = useState(null);
  const [skills, setSkills] = useState([]); //
  const [socialMediaType, setSocialMediaType] = useState(""); //
  const [socialMediaUserName, setSocialMediaUserName] = useState(""); //
  const [socials, setSocials] = useState({}); //

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMentor({ ...mentor, [name]: value });
  }
  //update social media object whenever the type or username changes
  useEffect(() => {
    setSocials({ [socialMediaType]: socialMediaUserName });
    setMentor({ ...mentor, socials: socials });
  }, [socialMediaType, socialMediaUserName]);

  function updateSkills(e) {
    if (e.target.checked) {
      setSkills([...skills, e.target.id]);
      setMentor({ ...mentor, skills: skills });
    } else if (e.target.checked === false) {
      setSkills([...skills.filter((item) => item !== e.target.id)]);
    }
  }
  //GET USER DATA
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid;

      const res = await fetch(`${server}/api/mentors/${loginid}`);

      const data = await res.json();
      setMentor(data[0]);
    }
  }, [user]);

  //SEND EDIT MENTOR DATA
  const onSubmit = async (e) => {
    const body = mentor;
    const loginid = user.uid;

    const res = await fetch(`${server}/api/mentors/${loginid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    router.push("/profile/mentor");
  };

  const initialValues = {
    Firstname: "",
    Surname: "",
    Email: "",
  };

  const validationSchema = Yup.object({
    Firstname: Yup.string().required("First Name required"),
    Surname: Yup.string().required("Surname required"),
    Email: Yup.string().email("Invalid Email").required("Email required"),
  });

  //RENDER PAGE
  if (mentor === null) {
    return <h2>...Loading</h2>;
  } else {
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
                            <Heading mb={"1rem"}>Edit your profile</Heading>
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
                                      name="Firstname"
                                      label="First Name"
                                      value={mentor.firstname}
                                      onChange={(e) => handleChange(e)}
                                    />

                                    <InputControl
                                      name="Surname"
                                      label="Surname"
                                      value={mentor.surname}
                                      onChange={(e) => handleChange(e)}
                                    />

                                    <InputControl
                                      name="Email"
                                      label="Email"
                                      value={mentor.email}
                                      onChange={(e) => handleChange(e)}
                                    />

                                    <FormControl id="name">
                                      <FormLabel>Job Title</FormLabel>
                                      <InputGroup borderColor="#E0E1E7">
                                        <InputLeftElement pointerEvents="none" />

                                        <Input
                                          type="text"
                                          size="md"
                                          id="jobtitle"
                                          value={mentor.jobtitle}
                                          onChange={(e) => handleChange(e)}
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
                                          value={mentor.company}
                                          onChange={(e) => handleChange(e)}
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
                                          placeholder="City"
                                          value={mentor.location}
                                          onChange={(e) => handleChange(e)}
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
                                        value={mentor.biography}
                                        onChange={(e) => handleChange(e)}
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
                                          value={mentor.tagline}
                                          onChange={(e) => handleChange(e)}
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
                                          value={mentor.socialMediaUserName}
                                          onChange={(e) =>
                                            setSocialMediaUserName(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </InputGroup>
                                    </FormControl>

                                    <FormControl id="name">
                                      <Select placeholder="Select Social Media Type">
                                        <option value="github">Github</option>
                                        <option value="linkedin">
                                          LinkedIn
                                        </option>
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
}
export default EditMentor;

//       <div className={css.body}>
//         <div className={css.UpdateMentorProfileFormContainer}>
//           <h1>Setup your mentor profile</h1>
//           <h2>Add or edit your information below</h2>
//           <div>
//             <form onSubmit={submitForm} className={css.UpdateMentorProfileForm}>
//               <div className={css.firstname}>
//                 <label htmlFor='first-name'>First Name</label>
//                 <input
//                   id='first-name'
//                   type='text'
//                   name='firstname'
//                   value={mentor.firstname}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.surname}>
//                 <label htmlFor='surname'>Surname</label>
//                 <input
//                   id='surname'
//                   type='text'
//                   name='surname'
//                   value={mentor.surname}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.email}>
//                 <label htmlFor='email'>Email</label>
//                 <input
//                   id='email'
//                   type='text'
//                   value={mentor.email}
//                   name='email'
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.jobtitle}>
//                 <label htmlFor='jobtitle'>Job Title</label>
//                 <input
//                   id='jobtitle'
//                   type='text'
//                   name='jobtitle'
//                   value={mentor.jobtitle}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.company}>
//                 <label htmlFor='company'>Company</label>
//                 <input
//                   id='company'
//                   type='text'
//                   name='company'
//                   value={mentor.company}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.location}>
//                 <label htmlFor='location'>Location</label>
//                 <input
//                   id='location'
//                   type='text'
//                   name='location'
//                   value={mentor.location}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.biography}>
//                 <label htmlFor='biography'>Biography</label>

//                 <textArea
//                   id='biography'
//                   type='text'
//                   name='biography'
//                   value={mentor.biography}
//                   onChange={(e) => handleChange(e)}
//                   required
//                   maxlength='500ch'
//                 >
//                   {mentor.biography}
//                 </textArea>
//               </div>

//               <div className={css.photourl}>
//                 <label htmlFor='photourl'>Profile photo URL</label>
//                 <input
//                   id='photourl'
//                   type='text'
//                   name='photourl'
//                   value={mentor.photourl}
//                   onChange={(e) => handleChange(e)}
//                 />
//               </div>
//               <div className={css.tagline}>
//                 <label htmlFor='tagline'>Profile Tagline</label>
//                 <input
//                   id='tagline'
//                   type='text'
//                   name='tagline'
//                   value={mentor.tagline}
//                   onChange={(e) => handleChange(e)}
//                   required
//                 />
//               </div>
//               <div className={css.skills}>
//                 <h4>
//                   <label htmlFor='skills'>Skills</label>
//                 </h4>
//                 <div className={css.checkboxes}>
//                   <Checkbox id='frontend' onChange={updateSkills}>
//                     Frontend
//                   </Checkbox>
//                   <Checkbox id='fullstack' onChange={updateSkills}>
//                     Fullstack
//                   </Checkbox>
//                   <Checkbox id='backend' onChange={updateSkills}>
//                     Backend
//                   </Checkbox>
//                   <Checkbox id='ux-ui' onChange={updateSkills}>
//                     UX/UI
//                   </Checkbox>
//                 </div>
//               </div>
//               {/* break into two inputs - social media type, social media name/handle  */}

//               <div className={css.socialType}>
//                 <label htmlFor='socialmediatype'>Social Media Type</label>
//                 <select
//                   name='socialMediaType'
//                   className={css.dropdown}
//                   id='socialmediatype'
//                   onChange={(e) => setSocialMediaType(e.target.value)}
//                 >
//                   <option value=''>--Please choose an option--</option>
//                   <option value='github'>GitHub</option>
//                   <option value='linkedin'>LinkedIn</option>
//                   <option value='twitter'>Twitter</option>
//                 </select>
//               </div>
//               <div className={css.socialName}>
//                 <label htmlFor='socialmediausername'>Social Media Handle</label>
//                 <input
//                   id='socialmediausername'
//                   type='text'
//                   value={mentor.socialMediaUserName}
//                   onChange={(e) => setSocialMediaUserName(e.target.value)}
//                   required
//                 />
//               </div>

//               <Button
//                 variant='outline-success'
//                 className={css.submitButton}
//                 onClick={submitForm}
//               >
//                 Submit
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default EditMentor
