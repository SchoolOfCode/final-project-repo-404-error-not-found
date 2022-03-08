import React, { useEffect, useState } from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { server } from "../../config";
export default function Setpath() {
  const [currentMentor, setCurrentMentor] = useState(null);
  const [user, loading, error] = useAuthState(firebase.auth());
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        if (user !== null) {
          const data = {
            loginid: user.uid,
            socials: {},
            skills: [],
            photourl: "",
          };
          const res = await fetch(`${server}/api/mentors/api/mentors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "",
            },
            body: JSON.stringify(data),
          });
          const response = await res.json();
          router.push("/setup-profile/mentor");
          console.log("response", response);
          //   setCurrentMentor(response)
        }
      } catch (error) {
        router.push("/profile/mentor");
      }
    }
    getUser();
  }, [user]);

  if (currentMentor !== null) {
    return <p>loading data...</p>;
    // return <p>data...</p>
  } else return <p>loading data...</p>;
}
