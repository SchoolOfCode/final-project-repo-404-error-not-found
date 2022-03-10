import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { server } from "../../config";

import React, { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "antd";
import css from "./mentor.module.css";
import { useForm } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const url = process.env.REACT_APP_BACKEND_URL;


function EditMentor() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [mentor, setMentor] = useState(null);
  const [skills, setSkills] = useState([]); //
  const [socialMediaType, setSocialMediaType] = useState(""); //
  const [socialMediaUserName, setSocialMediaUserName] = useState(""); //
  const [socials, setSocials] = useState({}); //
  const [formErrors, setFormErrors] = useState({}); //
  const [isSubmit, setIsSubmit] = useState(false)
  

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setMentor({ ...mentor, [name]: value });
    setIsSubmit(true)
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

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {

    }
  }, [formErrors])

  //SEND EDIT MENTOR DATA
  const submitForm = async (e) => {
    e.preventDefault();
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
    setFormErrors(validate(mentor))
  };

  const validate = (values) => {
    const errors ={};
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.firstname) {
      errors.firstname = "Name is required"
    }
    if (!values.surnamename) {
      errors.surname = "Surname is required"
    }
    if (!values.email) {
      errors.email = "Email is required"
    } else if(!regex.test(values.email)) {
      errors.email = "Email invalid"
    }
    return errors;
  }





  
  //RENDER PAGE
  if (mentor === null) {
    return <h2>...Loading</h2>;
  } else {
    return (
      <div className={css.body}>
        {/* {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui message success">Complete</div>)} */}
        <div className={css.UpdateMentorProfileFormContainer}>
          <h1>Setup your mentor profile</h1>
          <h2>Add or edit your information below</h2>
          <div>
            <form onSubmit={submitForm} className={css.UpdateMentorProfileForm}>
              <div className={css.firstname}>
                <label htmlFor="first-name">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  name="firstname"
                  value={mentor.firstname}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <p> {formErrors.firstname} </p>
              <div className={css.surname}>
                <label htmlFor="surname">Surname</label>
                <input
                  id="surname"
                  type="text"
                  name="surname"
                  value={mentor.surname}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <p> {formErrors.surname} </p>
              <div className={css.email}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  value={mentor.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <p> {formErrors.email} </p>
              <div className={css.jobtitle}>
                <label htmlFor="jobtitle">Job Title</label>
                <input
                  id="jobtitle"
                  type="text"
                  name="jobtitle"
                  value={mentor.jobtitle}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className={css.company}>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={mentor.company}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className={css.location}>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={mentor.location}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className={css.biography}>
                <label htmlFor="biography">Biography</label>

                <textArea

                  id="biography"
                  type="text"
                  name="biography"
                  value={mentor.biography}
                  onChange={(e) => handleChange(e)}
                  required
                  maxlength="500ch"
                />
              </div>

              <div className={css.photourl}>
                <label htmlFor="photourl">Profile photo URL</label>
                <input
                  id="photourl"
                  type="text"
                  name="photourl"
                  value={mentor.photourl}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={css.tagline}>
                <label htmlFor="tagline">Profile Tagline</label>
                <input
                  id="tagline"
                  type="text"
                  name="tagline"
                  value={mentor.tagline}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className={css.skills}>
                <h4>
                  <label htmlFor="skills">Skills</label>
                </h4>
                <div className={css.checkboxes}>
                  <Checkbox id="frontend" onChange={updateSkills}>
                    Frontend
                  </Checkbox>
                  <Checkbox id="fullstack" onChange={updateSkills}>
                    Fullstack
                  </Checkbox>
                  <Checkbox id="backend" onChange={updateSkills}>
                    Backend
                  </Checkbox>
                  <Checkbox id="ux-ui" onChange={updateSkills}>
                    UX/UI
                  </Checkbox>
                </div>
              </div>
              {/* break into two inputs - social media type, social media name/handle  */}


              <div className={css.socialType}>

                <label htmlFor="socialmediatype">Social Media Type</label>
                <select
                  name="socialMediaType"
                  className={css.dropdown}
                  id="socialmediatype"
                  onChange={(e) => setSocialMediaType(e.target.value)}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                </select>

              </div>
              <div className={css.socialName}>

                <label htmlFor="socialmediausername">Social Media Handle</label>
                <input
                  id="socialmediausername"
                  type="text"
                  value={mentor.socialMediaUserName}
                  onChange={(e) => setSocialMediaUserName(e.target.value)}
                  required
                />
              </div>

              <Button
                variant="outline-success"
                className={css.submitButton}
                onClick={submitForm}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditMentor;
