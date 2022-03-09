import Contact from "../components/Contact.js";
import About from "../components/About.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import homeBG from "../Images/homeBG.png";
import aboutBG from "../Images/aboutBG.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { motion } from "framer-motion";

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
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.homeContainer}>
        <div className={styles.homeBGBanner}>
          <Image src={homeBG}></Image>
        </div>
        <div className={styles.homeContent}>
          <h1 className={styles.headerTitle}>
            Bringing the joy of programming to everyone, everywhere
          </h1>

          <h2 className={styles.title}> Join as a...</h2>
          {/* <div className={styles.homeButtons}> */}
          <div className={styles.homeButtonWrap}>
            <Link href="/login/mentor">
              <a onClick={(e) => handleClick(e, "/login/mentor")}>
                {" "}
                <Button
                  variant="outline-success"
                  className={styles.mentor_btn}
                  data-cy="mentor_btn"
                >
                  Mentor
                </Button>
              </a>
            </Link>

            <Link href="/login/mentee" className={styles.btn}>
              <a onClick={(e) => handleClick(e, "/login/mentee")}>
                {" "}
                <Button
                  variant="outline-success"
                  className={styles.mentee_btn}
                  data-cy="mentee_btn"
                >
                  Mentee
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div id="about" className={styles.about}>
        <div className={styles.aboutBGBanner}>
          <Image src={aboutBG}></Image>
        </div>
        <About />
      </div>
      <div id="contact" className={styles.contactContainer}>
        <Contact />
      </div>
    </motion.div>
  );
}
