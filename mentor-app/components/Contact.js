import React from "react";
import { Row, Col, Form, Input, InputNumber, Button } from "antd";
import styles from "../styles/Contact.module.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Image from "next/image";
import contactImage from "../Images/undraw_contact_us_re_4qqt.svg";

export default function Contact() {
  const layout = {
    labelCol: {
      span: 4,
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
      <div className={styles.contactImg}>
        <Image src={contactImage}></Image>
      </div>
      <div className={styles.contactForm}>
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
            <Input.TextArea className={styles.textarea} rows={10} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRaduis: "45px" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
