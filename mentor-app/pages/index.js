import Contact from "../components/Contact.js";
import About from "../components/About.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import homeBG from "../Images/homeBG.png";
import aboutBG from "../Images/aboutBG.png";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ChakraProvider } from "@chakra-ui/react";

// export default function App({ Component }) {
//   // 2. Use at the root of your app
//   return (
//     <ChakraProvider>
//       <Component />
//     </ChakraProvider>
//   );
// }

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
        </div>
      </div>

      <div className={styles.about}>
        <div className={styles.aboutBGBanner}>
          <Image src={aboutBG}></Image>
        </div>
        <About />
      </div>
      <div className={styles.contactContainer}>
        <Contact />
      </div>
    </div>
  );
}
