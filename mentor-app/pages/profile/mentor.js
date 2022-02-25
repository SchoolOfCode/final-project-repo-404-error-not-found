import React from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Row, Col } from 'antd'
import css from './mentor.module.css'

export default function Profile() {
  return (
    <>
      <Row>
        <Col span={2}>col-6</Col>
        <Col span={13}>col-6</Col>
        <Col span={7} className={css.sideDisplay}>
          <div className={css.rightSquare}>
            <div className={css.topSquare}>
              <p>Description of what is offered</p>
            </div>
            <div className={css.lowSquare}>
              <button>Edit Profile</button>
            </div>
          </div>
        </Col>
        <Col span={2}>col-6</Col>
      </Row>
    </>
  )
}
