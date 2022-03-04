import React from 'react'
import { Row, Col } from 'antd'
import { Button, ButtonGroup } from '@chakra-ui/react'
import css from './mentor.module.css'
import CardDashboard from '../../components/CardDashboard'
import CardDashboardLong from '../../components/CardDasboardLong'

export default function Mentor() {
  return (
    <Row className={css.main}>
      <Col></Col>
      <Col span={18}>
        <h1 className={css.title}>Name's Dashboard</h1>
        <Button
          colorScheme='teal'
          variant='outline'
          style={{ margin: '10px 0' }}
        >
          Edit Profile
        </Button>
        <div style={{ textAlign: 'center' }}>
          <h2 className={css.subtitle}>Your Mentor(s) are...</h2>
        </div>
        <div className={css.container}>
          <CardDashboard />
          <CardDashboard />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 className={css.subtitle}>Pending Applications</h2>
        </div>
        <div className={css.container}>
          <CardDashboard />
          <CardDashboard />
        </div>
      </Col>
      <Col span={2}></Col>
    </Row>
  )
}
