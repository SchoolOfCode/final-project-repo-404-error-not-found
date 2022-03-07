import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/dashboard.module.css'
import { server } from '../config'
import { useEffect, useState } from 'react'

export default function CardDashboardLong(props) {
  const { info } = props
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

  async function acceptRequest () {
console.log("acceptRequest")
    const data = {id: info.id}
    const res = await fetch(`${server}/api/connection`, {
      
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    console.log(response)
  }

  return (
    <>
      <div className={css.card2}>
      
       { infoRender && <img
          src={infoRender[0].url}
          alt=''
          className={css.picture}
        />}
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
        <Button colorScheme='teal' onClick={()=> acceptRequest()}>Accept</Button>
        <Button colorScheme='red'>Decline</Button>
      </div>
    </>
  )
}

// ;<div className={css.card2}>
//   <img
//     src='https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG/revision/latest/top-crop/width/360/height/360?cb=20170628205507'
//     alt=''
//     className={css.picture}
//   />
//   <h4 className={css.cardName}>Name Surname</h4>
//   <a href=''>View Profile</a>
//   <button>Accept</button>
//   <button>Decline</button>
// </div>
