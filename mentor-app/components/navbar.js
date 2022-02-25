import Link from "next/link";

import { useRouter } from "next/router";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

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
    <nav>
      <div className="logo">

        <h1>Mentor||ee</h1>

      </div>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/#about">
        <a>About</a>
      </Link>
      <Link href="/#contact">

        <a>Contact</a>
      </Link>
      <Link href="/allMentors">
        <a>Find a Mentor</a>
      </Link>
      {isLogIn && <button onClick={handleLogout}>Logout</button>}
      {/* if is not null, render the button */}
    </nav>
  );
};
export default Navbar;
