import React, { useEffect, useState } from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Row, Col } from "antd";
import css from "./mentor.module.css";

export default function Profile() {
  //currentMentor is the mentor pulled from our database
  const [currentMentor, setCurrentMentor] = useState(null);
  // user is the user provided by firebase
  const [user, loading, error] = useAuthState(firebase.auth());

  //takes the firebase uid and fetches the corresponding mentor from database, then assigns it to currentMentor
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid;
      console.log("about to send GET request!");
      const res = await fetch(`http://localhost:3000/api/mentors/${loginid}`);
      const data = await res.json();
      setCurrentMentor(data[0]);
    }
  }, [user]);

  //render page only if currentMentor is loaded, otherwise show loading text
  if (currentMentor !== null) {
    return (
      <Row>
        <Col span={2}>col-6</Col>
        <Col span={13} className={css.profileMainArea}>
          <div className={css.profileLeft}>
            <img
              className={css.profileImage}
              src={
                "https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_mickey_ddt-16970_4e99445d.jpeg"
              }
            ></img>
            <div className={css.socialsArea}>
              <div className={css.socialLink}>Social</div>
              <div className={css.socialLink}>Social</div>
            </div>
          </div>
          <div className={css.profileRight}>
            <h1>{currentMentor.firstname}</h1>
            <h3>Location</h3>
            <h3>Response Time</h3>
            <div className={css.skills}>
              <div className={css.skill}>skill</div>
              <div className={css.skill}>skill</div>
              <div className={css.skill}>skill</div>
              <div className={css.skill}>skill</div>
            </div>
          </div>
          <div className="biographyArea">
            <h3>Biography</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
        </Col>

        <Col span={7} className={css.sideDisplay}>
          <div className={css.rightSquare}>
            <div className={css.topSquare}>
              <p>Description of what is offered</p>
            </div>
            <div className={css.lowSquare}>
              <button>Edit Profile</button>
            </div>
          </div>
        </Col>
        <Col span={2}>col-6</Col>
      </Row>
    );
  } else return <p>loading data...</p>;
}
