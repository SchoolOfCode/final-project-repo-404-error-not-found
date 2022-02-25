import React from 'react'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import { Row, Col } from 'antd'

export default function Profile() {
  return (
    <>
      <Row>
        <Col span={2}>col-6</Col>
        <Col span={13}>col-6</Col>
        <Col span={7}>
          <div>
            <div></div>
            <div></div>
          </div>
        </Col>
        <Col span={2}>col-6</Col>
      </Row>
    </>
  )
}
