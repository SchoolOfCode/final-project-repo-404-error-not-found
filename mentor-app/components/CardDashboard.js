import React from 'react'
import { Button } from '@chakra-ui/react'
import styles from '../styles/CardDashboard.module.css'
import css from '../pages/dashboard/mentor.module.css'

export default function CardDashboard() {
  return (
    <>
      <div className={css.card}>
        <img
          src='https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG/revision/latest/top-crop/width/360/height/360?cb=20170628205507'
          alt=''
          className={css.picture}
        />
        <h4 className={css.cardName}>Name Surname</h4>
        <Button colorScheme='teal'>View Profile</Button>
      </div>
    </>
  )
}
