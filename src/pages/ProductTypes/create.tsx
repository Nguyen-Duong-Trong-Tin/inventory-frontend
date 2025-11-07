import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { createProductType } from "@/services/product-types";


type FieldType = {
  name: string;
  description: string;
};
    
function CreateProductType() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createProductType({ accessToken, ...values });

      navigate("/product-types")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Product Type
      </h1>

      <Form
        layout="vertical"
        style={{ marginTop: 30 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product type's name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input product type's description!" }]}
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

export default CreateProductType;