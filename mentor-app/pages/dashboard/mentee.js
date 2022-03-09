import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, ButtonGroup } from '@chakra-ui/react'
import css from './dashboard.module.css'
import CardDashboard from '../../components/CardDashboard'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { server } from '../../config'
import CardDetail from '../../components/CardDetail'

export default function Mentee() {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [connectionAccepted, setConnectionAccepted] = useState(null)
  const [connectionPending, setConnectionPending] = useState(null)

  function filterData(data) {
    const pendingData = data.filter((each) => {
      return each.status === 'pending'
    })
    if (pendingData.length !== 0) {
      setConnectionPending(pendingData)
    }
    const acceptedData = data.filter((each) => {
      return each.status === 'accepted'
    })
    if (acceptedData.length !== 0) {
      setConnectionAccepted(acceptedData)
    }
  }

  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid
      const res = await fetch(`${server}/api/connection/${loginid}`)
      const data = await res.json()
      console.log(data)
      filterData(data)
    }
  }, [user, status])

  return (
    <div className={css.main}>
      <div span={18}>
        <h1 className={css.title}>Name's Dashboard</h1>
        <Link href='/edit-profile/mentee'>
          <Button
            colorScheme='teal'
            variant='outline'
            style={{ margin: '10px 0' }}
          >
            Edit Profile
          </Button>
        </Link>
        <div style={{ textAlign: 'center' }}>
          <h2 className={css.subtitle}>Your Mentor(s) are...</h2>
        </div>
        <div className={css.container}>
          {connectionAccepted ? (
            connectionAccepted.map((each, index) => {
              return <CardDetail info={each} key={index} roleUrl={'mentors'} />
            })
          ) : (
            <div className={css.acceptedRequest}>
              <p>You dont have any mentors yet! </p>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 className={css.subtitle}>Pending Applications</h2>
        </div>
        <div className={css.container}>
          {connectionPending ? (
            connectionPending.map((each, index) => {
              return (
                <CardDashboard info={each} key={index} roleUrl={'mentors'} />
              )
            })
          ) : (
            <div className={css.acceptedRequest}>
              <p>You dont have any mentors yet! </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
