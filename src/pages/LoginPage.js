import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_TOKEN } from "../constants/constants";

function LoginPage(props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      localStorage.setItem(
        APP_TOKEN,
        "iuuYFUYvtycRTCtyYUvuvct6C6TvyuVY555 6v7V7yuyvtrCR"
      );
      navigate("/dashboard");
    } catch (error) {
      notification.error({
        message: "An error occured, please try again",
      });
    }
  };

  return (
    <div className="max-w-[400px] mx-auto px-4 flex items-center justify-center h-screen">
      <div className="w-full rounded-[12px] shadow-lg shadow-[#dddddd] bg-[#ffffff] p-4">
        <h2 className="text-xl font-semibold mb-4">Welcome, please login</h2>
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input an email!" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            className="mb-2"
          >
            <Input placeholder="Enter email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input a password!" }]}
            className="mb-2"
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-2"
              size="large"
            >
              <span className="text-[14px]">Login</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
