import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer.js";
import Mentor from "../pages/sign-up/mentor";
import Mentee from "../pages/sign-up/mentee";
import Link from "next/link";

export default function Home() {
  

  const handleClick = (e, path) => {
    if (path === "/sign-up/mentor") {
      console.log("I clicked sign up mentor");
    }
    if (path === "/sign-up/mentee") {
      console.log("I clicked on the mentee sign up");
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Homepage</h1>
      <h2 className={styles.title}> Join as a...</h2>
      {/* <div className={styles.homeButtons}> */}
      
      <Link href="/sign-up/mentor">
        <a onClick={(e) => handleClick(e, "/sign-up/mentor")}> <button className={styles.btn}>  Mentor  </button> </a>
        </Link>
  
        <Link href="/sign-up/mentee">
        <a onClick={(e) => handleClick(e, "/sign-up/mentor")}> <button className={styles.btn}>  Mentee </button> </a>
        </Link>
     </div>
  );
}
