import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, ButtonGroup } from '@chakra-ui/react'
import css from './dashboard.module.css'
import CardDashboard from '../../components/CardDashboard'
import CardDashboardLong from '../../components/CardDasboardLong'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { server } from '../../config'

export default function Mentor() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [connectionAccepted, setConnectionAccepted] = useState(null)
  const [connectionPending, setConnectionPending] = useState(null)

  function filterData(data) {
    const pendingData = data.filter((each) => {
      return each.status !== pending
    })
  }

  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid
      const res = await fetch(`${server}/api/connectionMentor/${loginid}`)
      const data = await res.json()
      console.log(data)
    }
  }, [user])

  return (
    <div className={css.main}>
      <div span={18}>
        <h1 className={css.title}>Name's Dashboard</h1>
        <Link href='/edit-profile/mentor'>
          <Button
            colorScheme='teal'
            variant='outline'
            style={{ margin: '10px 0' }}
          >
            Edit Profile
          </Button>
        </Link>
        <div style={{ textAlign: 'center' }}>
          <h2 className={css.subtitle}>Your Mentees are...</h2>
        </div>
        <div className={css.container}>
          {connectionAccepted ? (
            <CardDashboard />
          ) : (
            <div className={css.acceptedRequest}>
              <p>You dont have any mentee yet! </p>
            </div>
          )}
        </div>
        <h2 className={css.subtitle}>
          <div style={{ textAlign: 'center' }}>
            These mentees have requested mentorship from you...
          </div>
        </h2>
        <div className={css.container}>
          {connectionPending ? (
            <CardDashboardLong />
          ) : (
            <div className={css.pendingRequest}>
              <p>You dont have any pending request! </p>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </div>
  )
}
