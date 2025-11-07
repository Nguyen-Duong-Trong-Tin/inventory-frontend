import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type ICustomer from "@/interfaces/customer";
import { findCustomerById, updateCustomer } from "@/services/customers";

type FieldType = {
  name: string;
  phone: string;
};

function UpdateCustomer() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [customer, setCustomer] = useState<ICustomer>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await findCustomerById({
          accessToken,
          id: id as string,
        });
        setCustomer(response.data);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateCustomer({ accessToken, id: id as string, ...values });

      toast.success("Update successfully.")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Customer
      </h1>

      {customer && (
        <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            initialValue={customer.name}
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
             initialValue={customer.phone}
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
      )}
    </>
  );
}

export default UpdateCustomer;
