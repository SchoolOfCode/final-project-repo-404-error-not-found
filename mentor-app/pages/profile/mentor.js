import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Row, Col } from "antd";
import css from "./mentor.module.css";

export default function Profile() {
  return (
    <>
      <Row>
        <Col span={2}>col-6</Col>
        <Col span={13}>
          <img
            className={css.profileImage}
            src={
              "https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_mickey_ddt-16970_4e99445d.jpeg"
            }
          ></img>
          <div className={css.socialsArea}>
            <div>Social</div>
            <div>Social</div>
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
          <div className={css.profileRight}>
            <h1>Full Name</h1>
            <h3>Location</h3>
            <h3>Response Time</h3>
            <div className={css.skills}>
              <div>skill</div>
              <div>skill</div>
              <div>skill</div>
              <div>skill</div>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div>
            <div></div>
            <div></div>
          </div>
        </Col>
        <Col span={2}>col-6</Col>
      </Row>
    </>
  );
}
