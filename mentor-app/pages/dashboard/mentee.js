import React from "react";
import { Row, Col } from "antd";
import { Button, ButtonGroup } from "@chakra-ui/react";
import css from "./dashboard.module.css";
import CardDashboard from "../../components/CardDashboard";
import { Link } from "next/link";

export default function Mentor() {
  return (
    <div className={css.main}>
      <div span={18}>
        <h1 className={css.title}>Name's Dashboard</h1>
        <Link href="/edit-profile/mentee">
          <Button
            colorScheme="teal"
            variant="outline"
            style={{ margin: "10px 0" }}
          >
            Edit Profile
          </Button>
        </Link>
        <div style={{ textAlign: "center" }}>
          <h2 className={css.subtitle}>Your Mentor(s) are...</h2>
        </div>
        <div className={css.container}>
          <CardDashboard />
          <CardDashboard />
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 className={css.subtitle}>Pending Applications</h2>
        </div>
        <div className={css.container}>
          <CardDashboard />
          <CardDashboard />
        </div>
      </div>
      <div></div>
    </div>
  );
}
