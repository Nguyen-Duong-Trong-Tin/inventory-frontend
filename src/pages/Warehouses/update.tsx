import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type IWarehouse from "@/interfaces/warehouse";
import { findWarehouseById, updateWarehouse } from "@/services/warehouses";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function UpdateWarehouse() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [warehouse, setWarehouse] = useState<IWarehouse>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await findWarehouseById({
          accessToken,
          id: id as string,
        });
        setWarehouse(response.data);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateWarehouse({ accessToken, id: id as string, ...values });

      toast.success("Update successfully.")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Warehouse
      </h1>

      {warehouse && (
        <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            initialValue={warehouse.name}
            rules={[{ required: true, message: "Please enter warehouse name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Address"
            name="address"
             initialValue={warehouse.address}
            rules={[{ required: true, message: "Please enter warehouse address!" }]}
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

export default UpdateWarehouse;
