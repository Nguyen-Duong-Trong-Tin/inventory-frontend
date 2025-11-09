import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { Button, Form, Input, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type IProduct from "@/interfaces/product";
import type IProductType from "@/interfaces/product-type.interface";
import { findProductById, updateProduct } from "@/services/products";
import { findProductTypes, findProductTypeById } from "@/services/product-types";

type FieldType = {
  name: string;
  status: string;
  unit: number;
  productTypeId: string;
};

function UpdateProduct() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [product, setProduct] = useState<IProduct>();
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productTypeOptions, setProductTypeOptions] = useState<JSX.Element[]>([]);
  const [productTypeName, setProductTypeName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin sản phẩm
        const prodRes = await findProductById({ accessToken, id: id as string });
        const productData = prodRes.data;
        setProduct(productData);

        // Lấy tên loại sản phẩm hiện tại
        const productTypeRes = await findProductTypeById({ accessToken, id: productData.productTypeId });
        setProductTypeName(productTypeRes.data.name);

        // Lấy danh sách loại sản phẩm
        const productTypesRes = await findProductTypes({ accessToken });
        const fetchedProductTypes = productTypesRes.data.productTypes.productTypes; // ✅ đúng cấu trúc từ backend
        setProductTypes(fetchedProductTypes);

        // Tạo danh sách Select.Option bằng vòng for
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
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateProduct({ accessToken, id: id as string, ...values });
      toast.success("Product updated successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  if (!product) return null;

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update Product
      </h1>

      <Form
        layout="vertical"
        style={{ marginTop: 30 }}
        onFinish={onFinish}
        initialValues={{
          name: product.name,
          status: product.status,
          unit: product.unit,
          productTypeId: product.productTypeId,
        }}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please input status!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Please input unit!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter unit..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Type"
          name="productTypeId"
          rules={[{ required: true, message: "Please select productType!" }]}
        >
          <Select placeholder="Select product type...">{productTypeOptions}</Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateProduct;