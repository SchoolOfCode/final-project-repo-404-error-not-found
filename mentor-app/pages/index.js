import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import About from "./about.js";
import Contact from "./contact.js";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer.js";
import Mentor from "../pages/sign-up/mentor";
import Mentee from "../pages/sign-up/mentee";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(firebase.auth());
  console.log("Loading:", loading, "|", "Current user:", user); //delete later
  const handleClick = (e, path) => {
    if (path === "/login/mentor") {
      console.log("I clicked log in as mentor");
    }
    if (path === "/login/mentee") {
      console.log("I clicked on the mentee login");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Homepage</h1>
      <h2 className={styles.title}> Join as a...</h2>
      {/* <div className={styles.homeButtons}> */}
      <div className={styles.homeButtonWrap}>
        <Link href="/login/mentor">
          <a onClick={(e) => handleClick(e, "/login/mentor")}>
            {" "}
            <button className={styles.mentor_btn}> Mentor </button>{" "}
          </a>
        </Link>

        <Link href="/login/mentee" className={styles.btn}>
          <a onClick={(e) => handleClick(e, "/login/mentee")}>
            {" "}
            <button className={styles.mentee_btn}> Mentee </button>{" "}
          </a>
        </Link>
      </div>

      <div className={styles.about}>
        <Link href="/#about">
          <h1>About</h1>
        </Link>{" "}
        y <h3>How does it work?</h3>
        <h3>What are the benefits of mentorship?</h3>
      </div>
      <div className={styles.contact}>
        <Link href="/#contact">
          <h1>Contact</h1>
        </Link>
      </div>
    </div>
  );
}
