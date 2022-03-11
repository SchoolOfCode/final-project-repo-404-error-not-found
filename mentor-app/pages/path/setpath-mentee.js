import React, { useEffect, useState } from 'react'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { server } from '../../config'

export default function Setpath() {
  const [currentMentor, setCurrentMentee] = useState(null)
  const [user, loading, error] = useAuthState(firebase.auth())
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      //change for mentee
      try {
        if (user !== null) {
          const data = {
            loginid: user.uid,
            socials: {},
            skills: [],
            photourl:
              'https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png',
          }
          const res = await fetch(`${server}/api/mentees`, {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '',
            },
            body: JSON.stringify(data),
          })
          const response = await res.json()
          router.push('/setup-profile/mentee')
          console.log('response', response)
        }
      } catch (error) {
        router.push('/profile/mentee')
      }
    }
    getUser()
  }, [user])

  if (currentMentor !== null) {
    return <p>loading data...</p>
    // return <p>data...</p>
  } else return <p>loading data...</p>
}
