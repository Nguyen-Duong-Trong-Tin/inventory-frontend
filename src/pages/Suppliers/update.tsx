import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type ISupplier from "@/interfaces/supplier";
import { findSupplierById, updateSupplier } from "@/services/suppliers";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function UpdateSupplier() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [supplier, setSupplier] = useState<ISupplier>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await findSupplierById({
          accessToken,
          id: id as string,
        });
        setSupplier(response.data);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateSupplier({ accessToken, id: id as string, ...values });

      toast.success("Update successfully.")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Supplier
      </h1>

      {supplier && (
        <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            initialValue={supplier.name}
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
             initialValue={supplier.email}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
             initialValue={supplier.phone}
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
             initialValue={supplier.address}
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
      )}
    </>
  );
}

export default UpdateSupplier;
