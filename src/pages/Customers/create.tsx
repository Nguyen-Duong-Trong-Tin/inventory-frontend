import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { createCustomer } from "@/services/customers";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function CreateCustomer() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createCustomer({ accessToken, ...values });

      navigate("/customers")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Customer
      </h1>

      <Form
        layout="vertical"
        style={{ marginTop: 30 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateCustomer;
