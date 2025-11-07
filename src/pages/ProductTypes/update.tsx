import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Input, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type IProductType from "@/interfaces/product-type.interface";
import { findProductTypeById, updateProductType } from "@/services/product-types";


type FieldType = {
  name: string;
  description: string;

};

function UpdateProductType() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [productType, setProductType] = useState<IProductType>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await findProductTypeById({
          accessToken,
          id: id as string,
        });
        setProductType(response.data);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateProductType({ accessToken, id: id as string, ...values });

      toast.success("Update successfully.")
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Product Type
      </h1>

      {productType && (
        <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Name"
            name="name"
            initialValue={productType.name}
            rules={[{ required: true, message: "Please input the product type's name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            initialValue={productType.description}
            rules={[{ required: true, message: "Please input the product type's description!" }]}
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

export default UpdateProductType;