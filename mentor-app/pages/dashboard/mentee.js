import React from 'react'
import { Row, Col } from 'antd'
import css from './mentor.module.css'

export default function mentor() {
  return (
    <Row>
      <Col span={2}></Col>
      <Col span={18}>
        <h1 className={css.title}>Name's Dashboard</h1>
        <u>
          <a>View Profile</a>
        </u>
        <div className={css.subContainer}>
          <h2 className={css.subtitle}>Your Mentor(s) are...</h2>
        </div>
        <div className={css.container}>
          <div className={css.card}>
            <img
              src='https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG/revision/latest/top-crop/width/360/height/360?cb=20170628205507'
              alt=''
              className={css.picture}
            />
            <h4 className={css.cardName}>Name Surname</h4>
            <button>View Profile</button>
          </div>
        </div>
        <div className={css.subContainer}>
          <h2 className={css.subtitle}>Pending applications</h2>
        </div>
        <div className={css.container}>
          <div className={css.card2}>
            <img
              src='https://static.wikia.nocookie.net/disney/images/7/7b/Pluto.PNG/revision/latest/top-crop/width/360/height/360?cb=20170628205507'
              alt=''
              className={css.picture}
            />
            <h4 className={css.cardName}>Name Surname</h4>
            <a href=''>View Profile</a>
          </div>
        </div>
      </Col>
      <Col span={2}></Col>
    </Row>
  )
}
