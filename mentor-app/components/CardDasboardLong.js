import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/dashboard.module.css'

export default function CardDashboardLong() {
  return (
    <>
      <div className={css.card2}>
        <img
          src='https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG/revision/latest/top-crop/width/360/height/360?cb=20170628205507'
          alt=''
          className={css.picture}
        />
        <h4 className={css.cardName}>Name Surname</h4>
        <Button colorScheme='blue' variant='ghost'>
          View Profile
        </Button>
        <Button colorScheme='teal'>Accept</Button>
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
