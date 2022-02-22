import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_BACKEND_URL;
function Mentor() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();
    const body = {
      firstname,
      lastname,
      email,
      confirmEmail,
      password,
      confirmPassword,
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
              placeholder="First Name..."
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              placeholder="Last Name..."
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="confirm-email">Confirm Email</label>
            <input
              id="confirm-email"
              type="text"
              placeholder="confirm-email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="text"
              placeholder="Confirm Password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
