import Link from "next/link";
import { Link as LinkS } from "react-scroll";
import { useRouter } from "next/router";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
// import styles from "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Image from "../public/mentoree_home_logo.jpg";

const auth = getAuth();

const Navbar = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [isLogIn, setLogIn] = useState(null); //state check if user is logged in

  // console.log("Loading:", loading, "|", "Current user:", user.uid); //delete later

  const router = useRouter();

  useEffect(() => {
    setLogIn(user);
  }, [user]);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        router.push("/");
      })
      .catch((error) => {
        console.log("error");
      });
  }
  return (
    <nav className={styles.navbar}>
      <div className="logo">
        <img src={Image}></img>
      </div>
      <Link href="/">
        <a>Home</a>
      </Link>

      <LinkS
        to="#about"
        smooth={true}
        className="#about"
        duration={500}
        offset={500}
      >
        <a>About</a>
      </LinkS>

      <LinkS
        to={"#contact"}
        smooth={true}
        className="#contact"
        duration={500}
        offset={1000}
      >
        <a>Contact</a>
      </LinkS>

      <Link href="/allMentors">
        <a>Find a Mentor</a>
      </Link>
      {isLogIn && (
        <button className={styles.logoutbtn} onClick={handleLogout}>
          Logout
        </button>
      )}
      {/* if is not null, render the button */}
    </nav>
  );
};
export default Navbar;
