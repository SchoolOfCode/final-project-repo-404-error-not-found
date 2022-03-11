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
          // const data = { loginid: user.uid }

          // const res = await fetch(`${server}/api/mentors`, {
          //   method: 'POST',

          //   headers: {
          //     "Content-Type": "application/json",
          //     "Access-Control-Allow-Origin": "",
          //   },
          //   body: JSON.stringify(data),

          // })

          // const response = await res.json()
          // router.push('/setup-profile/mentor')
          // console.log('response', response)
          // if user exists in the database
          const loginId = user.uid;
          const res = await fetch(`${server}/api/mentors/${loginId}`);
          // then go to profile mentor page
          const data = await res.json();
          console.log("setpath response", data);
          if (data[0] == null) {
            router.push("/setup-profile/mentor");
          } else {
            router.push("/profile/mentor");
          }
        }

        //otherwise go to set-up profile mentor page
      } catch (error) {
        // router.push("/profile/mentor");
        router.push("/setup-profile/mentor");
      }
    }
    getUser();
  }, [user]);

  if (currentMentor !== null) {
    return <p>loading data...</p>;
    // return <p>data...</p>
  } else return <p>loading data...</p>;
}
