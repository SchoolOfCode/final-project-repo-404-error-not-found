import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/dashboard.module.css'
import { server } from '../config'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CardDashboardLong(props) {
  const { info, acceptRequest, deleteRequest, roleUrl } = props
  const [infoRender, setInfoRender] = useState(null)
  useEffect(async () => {
    if (info !== null) {
      const loginid = info.mentee_id
      const res = await fetch(`${server}/api/${roleUrl}/${loginid}`)
      const data = await res.json()
      console.log(data)
      setInfoRender(data)
    }
  }, [info])

  return (
    <>
      <div className={css.card2}>
        {/* if infoRender is true render img, if not dont do anything */}
        {infoRender && (
          <img src={infoRender[0].photourl} alt='' className={css.picture} />
        )}
        {/* if inforender is true render h4, if is not render line 33 'Name Surname'*/}
        {infoRender ? (
          <h4 className={css.cardName}>
            {infoRender[0].firstname} {infoRender[0].surname}
          </h4>
        ) : (
          'Name Surname'
        )}
        <Link
          // when view profile button is clicked, line 41
          href={{
            pathname: `/read-profile/${roleUrl.slice(0, roleUrl.length - 1)}`,
            // return the mentee information
            query: {
              loginid: info.mentee_id,
            },
          }}
        >
          <Button colorScheme='blue' variant='ghost'>
            View Profile
          </Button>
        </Link>

        <Button colorScheme='teal' onClick={() => acceptRequest(info.id)}>
          Accept
        </Button>
        <Button colorScheme='red' onClick={() => deleteRequest(info.id)}>
          Decline
        </Button>
      </div>
    </>
  )
}
