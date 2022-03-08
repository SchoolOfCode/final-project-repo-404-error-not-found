import React, { useEffect, useState } from "react";
import Link from "next/link";
// import firebase from '../../firebase/clientApp'
// import { useAuthState } from 'react-firebase-hooks/auth'
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import css from "./mentor.module.css";
import { server } from "../../config";
import { Button } from "react-bootstrap";
import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";

export async function getServerSideProps(context) {
  return {
    props: {
      currentId: context.query.loginid,
    },
  };
}

export default function Profile(props) {
  const { currentId } = props;
  const [currentMentee, setCurrentMentee] = useState(null);
  // const [user, loading, error] = useAuthState(firebase.auth())

  // const [apply, setApply] = useState(true)

  // async function handleApply() {

  //   setApply(false)
  //   const data = { mentor_id: currentMentee.loginid, mentee_id: user.uid }
  //   const res = await fetch(`${server}/api/connection`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   const response = await res.json()
  //   console.log(response)
  // }

  useEffect(async () => {
    const loginid = await currentId;
    const res = await fetch(`${server}/api/mentees/${loginid}`);
    const data = await res.json();
    // fetch mentee info
    setCurrentMentee(data[0]);
  }, []);

  if (currentMentee !== null) {
    return (
      <div className={css.profileFullArea}>
        <h1>Your profile</h1>
        <br />
        <div className={css.profileMainArea}>
          <div className={css.profileLeft}>
            <img
              className={css.profileImage}
              src={currentMentee.photourl}
            ></img>
            <div className={css.socialsArea}>
              {Object.keys(currentMentee.socials)[0] === "linkedin" ? (
                <LinkedinIcon
                  handle={Object.values(currentMentee.socials)[0]}
                />
              ) : null}
              {Object.keys(currentMentee.socials)[0] === "github" ? (
                <GithubIcon handle={Object.values(currentMentee.socials)[0]} />
              ) : null}
              {Object.keys(currentMentee.socials)[0] === "twitter" ? (
                <TwitterIcon handle={Object.values(currentMentee.socials)[0]} />
              ) : null}
            </div>
          </div>
          <div className={css.profileRight}>
            <h1>
              {currentMentee.firstname} {currentMentee.surname}
            </h1>
            <h3>{currentMentee.location}</h3>
            <h3>{currentMentee.tagline}</h3>
            <span>
              <h4 className={css.jobtitle}>{currentMentee.jobtitle} </h4>
              at <em>{currentMentee.company}</em>
            </span>
            <div className={css.skills}>
              {currentMentee.skills.length > 0
                ? currentMentee.skills.map((item) => (
                    <div className={css.skill}>{item}</div>
                  ))
                : null}
              {/* <div className={css.skill}>skill</div> */}
            </div>
          </div>
          <div className={css.biographyArea}>
            <h3>Biography</h3>

            <p className={css.bio}>{currentMentee.biography}</p>
          </div>
        </div>

        <div className={css.sideDisplay}>
          <div className={css.rightSquare}>
            <div className={css.topSquare}></div>
            <div className={css.lowSquare}></div>
          </div>
        </div>
      </div>
    );
  } else return <p>loading data...</p>;
}
