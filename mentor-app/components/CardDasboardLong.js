import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/dashboard.module.css'
import { server } from '../config'
import { useEffect, useState } from 'react'

export default function CardDashboardLong(props) {
  const { info, acceptRequest } = props
  const [infoRender, setInfoRender] = useState(null)
  useEffect(async () => {
    if (info !== null) {
      const loginid = info.mentee_id
      const res = await fetch(`${server}/api/mentees/${loginid}`)
      const data = await res.json()
      console.log(data)
      setInfoRender(data)
    }
  }, [info])

  return (
    <>
      <div className={css.card2}>
        {infoRender && (
          <img src={infoRender[0].photourl} alt='' className={css.picture} />
        )}
        {infoRender ? (
          <h4 className={css.cardName}>
            {infoRender[0].firstname} {infoRender[0].surname}
          </h4>
        ) : (
          'Name Surname'
        )}
        <Button colorScheme='blue' variant='ghost'>
          View Profile
        </Button>
        <Button colorScheme='teal' onClick={() => acceptRequest(info.id)}>
          Accept
        </Button>
        <Button colorScheme='red'>Decline</Button>
      </div>
    </>
  )
}
