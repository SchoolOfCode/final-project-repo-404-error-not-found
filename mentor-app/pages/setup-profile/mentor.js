import Link from "next/link";
// const Mentor = () => {
//   return (

//   );
// };
// export default Mentor;

import React from "react";
import { useState } from "react";
import { Checkbox } from "antd";
const url = process.env.REACT_APP_BACKEND_URL;
function Mentor() {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [biography, setBiography] = useState("");
  const [profileTagLine, setProfileTagLine] = useState("");
  const [technology, setTechnology] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  //   const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const body = {
      firstname,
      email,
      jobTitle,
      company,
      biography,
      profileTagLine,
      technology,
      socialMedia,
    };
    const response = await fetch("http://localhost:3000/api/mentors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // navigate("/dashboard/mentor", { replace: true });
    console.log(response);
  };
  return (
    <>
      <div className="NewUserForm-container">
        <div className="NewUserForm">
          <form onSubmit={submitForm}>
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
            <Checkbox onChange={onChange}>Frontend</Checkbox>
            <Checkbox onChange={onChange}>Fullstack</Checkbox>
            <Checkbox onChange={onChange}>Backend</Checkbox>
            <Checkbox onChange={onChange}>UX/UI</Checkbox>

            <label htmlFor="technology">Technology I like to use</label>
            <input
              id="technology"
              type="text"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              required
            />
            <label htmlFor="socialMedia">Social Media</label>
            <input
              id="socialmedia"
              type="text"
              value={socialMedia}
              onChange={(e) => setSocialMedia(e.target.value)}
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
