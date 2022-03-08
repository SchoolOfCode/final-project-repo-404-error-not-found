import React, { useEffect, useState } from "react";
import Link from "next/link";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { server } from "../../config";

import styles from "./mentor.module.css";

import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";

export default function Profile() {
  //currentMentor is the mentor pulled from our database
  const [currentMentor, setCurrentMentor] = useState(null);
  // user is the user provided by firebase
  const [user, loading, error] = useAuthState(firebase.auth());

  //takes the firebase uid and fetches the corresponding mentor from database, then assigns it to currentMentor
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid;
      // const loginid = 'hJAvwClURqXX0aiqsKsIlXqNa0R2'
      console.log("about to send GET request!");

      const res = await fetch(`${server}/api/mentors/${loginid}`);

      const data = await res.json();
      setCurrentMentor(data[0]);
    }
  }, [user]);

  //render page only if currentMentor is loaded, otherwise show loading text
  if (currentMentor !== null) {
    // let socialsKey = Object.keys(currentMentor.socials);

    return (
      <div className={styles.profileFullArea}>
        <h1>Your profile</h1>
        <br />
        <div className={styles.profileMainArea}>
          <div className={styles.profileLeft}>
            <img
              className={styles.profileImage}
              src={currentMentor.photourl}
            ></img>
            <div className={styles.socialsArea}>
              {Object.keys(currentMentor.socials)[0] === "linkedin" ? (
                <LinkedinIcon
                  handle={Object.values(currentMentor.socials)[0]}
                />
              ) : null}
              {Object.keys(currentMentor.socials)[0] === "github" ? (
                <GithubIcon handle={Object.values(currentMentor.socials)[0]} />
              ) : null}
              {Object.keys(currentMentor.socials)[0] === "twitter" ? (
                <TwitterIcon handle={Object.values(currentMentor.socials)[0]} />
              ) : null}
            </div>
          </div>
          <div className={styles.profileRight}>
            <h1>
              {currentMentor.firstname} {currentMentor.surname}
            </h1>
            <h3>{currentMentor.location}</h3>
            <h3>{currentMentor.tagline}</h3>
            <span>
              <h4 className={styles.jobtitle}>{currentMentor.jobtitle} </h4>
              at <em>{currentMentor.company}</em>
            </span>
            <div className={styles.skills}>
              {currentMentor.skills.length > 0
                ? currentMentor.skills.map((item) => (
                    <div className={styles.skill}>{item}</div>
                  ))
                : null}
              {/* <div className={css.skill}>skill</div> */}
            </div>
          </div>
          <div className={styles.biographyArea}>
            <h3>Biography</h3>

            <p className={styles.bio}>{currentMentor.biography}</p>
          </div>
        </div>

        <div className={styles.sideDisplay}>
          <div className={styles.rightSquare}>
            <div className={styles.topSquare}>
              <p>Description of what is offered</p>
            </div>
            <div className={styles.lowSquare}>
              <Link href="/edit-profile/mentor">
                <button>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <p>loading data...</p>;
}
