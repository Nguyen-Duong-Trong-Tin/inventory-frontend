import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { createSupplier } from "@/services/suppliers";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function CreateSupplier() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createSupplier({ accessToken, ...values });

      navigate("/suppliers")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Supplier
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
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

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter address..." />
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

export default CreateSupplier;
