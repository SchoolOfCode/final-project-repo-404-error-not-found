import React from 'react'
import { Row, Col, Form, Input, InputNumber, Button } from 'antd'
import styles from '../styles/Contact.module.css'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

export default function Contact() {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <>
      {' '}
      <Row>
        <Col span={12} className={styles.contact}>
          <h2>Get in Touch</h2>
        </Col>

        <Col span={8}>
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['user', 'name']}
              label='Name'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label='Email'
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'age']}
              label='Age'
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'website']} label='Website'>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label='Introduction'>
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  )
}
