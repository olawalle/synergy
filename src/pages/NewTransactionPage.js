import React from "react";
import { Form, Input, Select, DatePicker, Button, notification } from "antd";
import dayjs from "dayjs";
import useAppState from "../hooks/appState";
import { useNavigate } from "react-router-dom";

function NewTransactionPage(props) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutation } = useAppState();

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        date: dayjs(values.date).format("YYYY-MM-DD"),
      };
      mutation.mutate(payload);
      notification.success({
        message: "New transaction added!",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "An error occured, please try again",
      });
    }
  };

  return (
    <div className="max-w-[400px] mx-auto px-4">
      <div className="w-full rounded-[12px] shadow-lg shadow-[#dddddd] bg-[#ffffff] p-4 mt-4">
        <h2 className="text-xl font-semibold mb-4">Create New Transaction</h2>
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: "Please input the amount!" },
              {
                validator: (_, value) => {
                  if (!value || /^[1-9]\d*$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Amount must be a number greater than 0!")
                  );
                },
              },
            ]}
            className="mb-2"
          >
            <Input placeholder="Enter amount" size="large" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
            className="mb-2"
          >
            <Select placeholder="Select status" size="large">
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="failed">Failed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[
              { required: true, message: "Please select a date!" },
              {
                validator: (_, value) => {
                  if (!value || value.isBefore(dayjs(), "day")) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Date must be in the past!"));
                },
              },
            ]}
            className="mb-2"
          >
            <DatePicker
              className="w-full"
              size="large"
              format={"DD MMM, YYYY"}
            />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-2"
              size="large"
            >
              <span className="text-[14px]">Submit</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewTransactionPage;
