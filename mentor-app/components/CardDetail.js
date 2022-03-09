import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/dashboard.module.css'
import Link from 'next/link'
import { server } from '../config'
import { useEffect, useState } from 'react'

export default function CardDetail(props) {
  const { info, roleUrl } = props
  const [infoRender, setInfoRender] = useState(null)
  const [modal, setModal] = useState(false)

  let viewId

  if (roleUrl === 'mentees') {
    viewId = info.mentee_id
  } else {
    viewId = info.mentor_id
  }
  useEffect(async () => {
    if (info !== null) {
      const loginid = viewId
      const res = await fetch(`${server}/api/${roleUrl}/${loginid}`)
      const data = await res.json()
      console.log(data)
      setInfoRender(data)
    }
  }, [info])

  return (
    <>
      <div>
        <div className={css.card}>
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
          <Link
            // when view profile button is clicked, line 41
            href={{
              pathname: `/read-profile/${roleUrl.slice(0, roleUrl.length - 1)}`,
              // return the mentee information
              query: {
                loginid: viewId,
              },
            }}
          >
            <Button colorScheme='blue' variant='ghost'>
              View Profile
            </Button>
          </Link>
          <Button
            onClick={() =>
              (window.location.href = `mailto:${infoRender[0].email}`)
            }
            colorScheme='teal'
            variant='ghost'
          >
            + Email
          </Button>
        </div>
      </div>
    </>
  )
}
