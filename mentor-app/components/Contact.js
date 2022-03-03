import React from "react";
import { Row, Col, Form, Input, InputNumber, Button } from "antd";
import styles from "../styles/Contact.module.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Image from "next/image";
import contactImage from "../Images/contactPic.jpg";

export default function Contact() {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className={styles.contactContainer}>
      {" "}
      <Row>
        <div>
          <Image src={contactImage} height="450" width="450"></Image>
        </div>
        <Col span={8}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "name"]}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name={["user", "introduction"]} label="Message">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "45px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <Col span={4}></Col> */}
      </Row>
    </div>
  );
}
