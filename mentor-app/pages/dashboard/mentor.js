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
  const [status, setStatus] = useState(false)

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
      const res = await fetch(`${server}/api/connectionMentor/${loginid}`)
      const data = await res.json()
      console.log(data)
      filterData(data)
    }
  }, [user, status])

  async function acceptRequest(currentId) {
    const data = { id: currentId }
    const res = await fetch(`${server}/api/connection`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    setStatus(!status)
  }
  async function deleteRequest(id) {
    const res = await fetch(`${server}/api/connectionMentor/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '',
      },
    })
    const response = await res.json()
    // if status is true, set status to false
    setStatus(!status)
  }

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
          {/* if connectionAccepted is true render CardDashboard for each accepted connection, if not render <p>you dont have mentees</p> */}
          {connectionAccepted ? (
            connectionAccepted.map((each, index) => {
              return (
                <CardDashboard info={each} key={index} roleUrl={'mentees'} />
              )
            })
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
          {/* if connectionPending is true render CardDashboardLong [{satus: pending, idmentee, id mentor}, {status:pending}] */}
          {connectionPending ? (
            connectionPending.map((each, index) => {
              return (
                <CardDashboardLong
                  info={each}
                  key={index}
                  acceptRequest={acceptRequest}
                  deleteRequest={deleteRequest}
                  roleUrl={'mentees'}
                />
              )
            })
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
