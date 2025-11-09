import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, type FormProps } from "antd";
import { useEffect, useState, type JSX } from "react";

import { getCookie } from "@/helpers/cookies";
import { createProduct } from "@/services/products";
import type IProductType from "@/interfaces/product-type.interface";
import { findProductTypes } from "@/services/product-types";

type FieldType = {
  name: string;
  status: string;
  unit: number;
  productTypeId: string;
};

function CreateProduct() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productTypeOptions, setProductTypeOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchedProductTypes = async () => {
      try {
        const res = await findProductTypes({ accessToken });
        const fetchedProductTypes = res.data.productTypes.productTypes; // ✅ đúng cấu trúc từ backend
        setProductTypes(fetchedProductTypes);

        const options: JSX.Element[] = [];
        for (let i = 0; i < fetchedProductTypes.length; i++) {
          options.push(
            <Select.Option key={fetchedProductTypes[i]._id} value={fetchedProductTypes[i]._id}>
              {fetchedProductTypes[i].name}
            </Select.Option>
          );
        }
        setProductTypeOptions(options);
      } catch {
        toast.error("Failed to load productTypes.");
      }
    };
    fetchedProductTypes();
  }, [accessToken]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createProduct({ accessToken, ...values });
      toast.success("Product created successfully!");
      navigate("/products");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create An Product
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input your status!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Please input your unit!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="ProductType"
          name="productTypeId"
          rules={[{ required: true, message: "Please select productType!" }]}
        >
          <Select placeholder="Select productType...">{productTypeOptions}</Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateProduct;