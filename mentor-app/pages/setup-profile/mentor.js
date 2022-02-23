// this will need the userid provided after creating a new record on signup:
// const id = something (will need to be an integer, or convert to integer here)

//for test purposes
const id = 2;

import React, { useEffect } from "react";
import { useState } from "react";
import { Checkbox } from "antd";
const url = process.env.REACT_APP_BACKEND_URL;

//add location and profile pic url fields

function Mentor() {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [biography, setBiography] = useState("");
  const [profileTagLine, setProfileTagLine] = useState("");
  const [skills, setSkills] = useState([]);
  const [socialMediaType, setSocialMediaType] = useState("");
  const [socialMediaUserName, setSocialMediaUserName] = useState("");
  const [socialMedia, setSocialMedia] = useState({});

  //log skills array whenever it changes
  useEffect(() => {
    console.log("skills: ", skills);
  }, [skills]);

  //update social media object whenever the type or username changes
  useEffect(() => {
    setSocialMedia({ [socialMediaType]: socialMediaUserName });
  }, [socialMediaType, socialMediaUserName]);

  //log socialMedia object whenever it changes
  useEffect(() => {
    console.log(socialMedia);
  }, [socialMedia]);

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
      //no job title in db yet
      jobTitle,
      // no company in db yet
      company,
      biography,
      profileTagLine,
      //skills array will neeed constructing --DONE
      skills,
      //social media object will need constructing --DONE (for single social media entry)
      socialMedia,
    };
    //patch request to update mentor at id
    const response = await fetch(`http://localhost:3000/api/mentors/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(JSON.stringify(body));
  };
  return (
    <>
      <div className="UpdateMentorProfileForm-container">
        <div className="UpdateMentorProfileForm">
          <form onSubmit={submitForm}>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="jobTitle">Job Title</label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label htmlFor="biography">Biography</label>
            <input
              id="biography"
              type="text"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              required
            />
            <label htmlFor="profileTagLine">Profile Tagline</label>
            <input
              id="profiletagline"
              type="text"
              value={profileTagLine}
              onChange={(e) => setProfileTagLine(e.target.value)}
              required
            />

            <label htmlFor="skills">Skills</label>
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

            {/* break into two inputs - social media type, social media name/handle  */}

            <label htmlFor="socialmediatype">Social Media Type</label>
            <select
              name="socialMediaType"
              id="socialmediatype"
              onChange={(e) => setSocialMediaType(e.target.value)}
            >
              <option value="">--Please choose an option--</option>
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
            </select>

            <label htmlFor="socialmediausername">Social Media Handle</label>
            <input
              id="socialmediausername"
              type="text"
              value={socialMediaUserName}
              onChange={(e) => setSocialMediaUserName(e.target.value)}
              required
            />

            <button className="submit-btn" onClick={submitForm}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Mentor;

//
// {
//   "firstname":"Bob",
//   "surname":"Bobbits",
//   "email":"bob@bobbits.com",
//   "jobTitle":"Chief Bob",
//   "company":"All The Bobs",
//   "biography":"Bob first started coding in the original dot.com boom of 1952, and has led the field in Bobness for nearly seven decades now - continually pushing the boundaries of bobness, and taking in multiple shifts in direction.  He has two cats and lives in the Algarve.",
//   "profileTagLine":"The best Bob in bob world.",
//   "technology":"Figma, Next.js, React, Git.",
//   "socialMedia":"bob@github.com"
// }
