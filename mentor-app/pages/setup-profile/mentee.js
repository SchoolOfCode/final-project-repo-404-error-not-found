import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "antd";
import css from "./mentor.module.css";


//add location and profile pic url fields

function Mentee() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const loginid = user ? user.uid : "";
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [aims, setAims] = useState("");
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
      const data = { loginid: user.uid };
      console.log("about to send post request!");
      const res = await fetch(`${server}/api/mentees`, {
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
      aims,
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

    const response = await fetch(`${server}/api/mentees/${loginid}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(JSON.stringify(body));
    router.push("/profile/mentee");
  };
  return (
    <>
      <div className={css.UpdateMentorProfileFormContainer}>
        <h1>Setup your mentee profile</h1>
        <h2>Add or edit your information below</h2>
        <div>
          <form onSubmit={submitForm} className={css.UpdateMentorProfileForm}>
            <div className={css.firstname}>
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className={css.surname}>
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className={css.email}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={css.jobtitle}>
              <label htmlFor="jobtitle">Job Title</label>
              <input
                id="jobtitle"
                type="text"
                value={jobtitle}
                onChange={(e) => setJobtitle(e.target.value)}
                required
              />
            </div>
            <div className={css.company}>
              <label htmlFor="aims">Aims</label>
              <input
                id="aims"
                type="text"
                value={aims}
                onChange={(e) => setAims(e.target.value)}
                required
              />
            </div>
            <div className={css.location}>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className={css.biography}>
              <label htmlFor="biography">Biography</label>
              <input
                id="biography"
                type="text"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                required
              />
              <div className={css.photourl}>
                <label htmlFor="photourl">Profile photo URL</label>
                <input
                  id="photourl"
                  type="text"
                  value={photourl}
                  onChange={(e) => setPhotourl(e.target.value)}
                />
              </div>
            </div>
            <div className={css.tagline}>
              <label htmlFor="tagline">Profile Tagline</label>
              <input
                id="tagline"
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
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
            <div className={css.socials}>
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
              <br />
              <label htmlFor="socialmediausername">Social Media Handle</label>
              <input
                id="socialmediausername"
                type="text"
                value={socialMediaUserName}
                onChange={(e) => setSocialMediaUserName(e.target.value)}
                required
              />
            </div>
            <Button variant="outline-success" className={css.submitButton} onClick={submitForm}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Mentee;
