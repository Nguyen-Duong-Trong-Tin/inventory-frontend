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
  unit: number;          // vẫn là number
  productTypeId: string;
};

function UpdateProduct() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [product, setProduct] = useState<IProduct>();
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productTypeOptions, setProductTypeOptions] = useState<JSX.Element[]>([]);
  const [productTypeName, setProductTypeName] = useState<string>("");

  const { Option } = Select;

  // map đơn vị
const UNIT_OPTIONS = [
  { value: 1, label: "Hộp" },
  { value: 2, label: "Vỉ" },
  { value: 3, label: "Viên" },
  { value: 4, label: "Lọ" },
  { value: 5, label: "Ống" },
  { value: 6, label: "Gói" },
  { value: 7, label: "Chai" },
  { value: 8, label: "Tuýp" },
  { value: 9, label: "Hũ" },
  { value: 10, label: "Thùng" },
];


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin sản phẩm
        const prodRes = await findProductById({ accessToken, id: id as string });
        const productData = prodRes.data;
        setProduct(productData);

        // (Tuỳ chọn) Lấy tên loại hiện tại – nếu không dùng có thể bỏ
        try {
          const productTypeRes = await findProductTypeById({
            accessToken,
            id: productData.productTypeId,
          });
          setProductTypeName(productTypeRes.data.name);
        } catch {
          /* ignore */
        }

        // Lấy danh sách loại sản phẩm (đọc path an toàn theo nhiều shape)
        const productTypesRes = await findProductTypes({ accessToken });
        const fetchedProductTypes: IProductType[] =
          productTypesRes?.data?.ProductTypes?.ProductTypes ??
          productTypesRes?.data?.productTypes?.productTypes ??
          productTypesRes?.data?.productTypes ??
          productTypesRes?.data?.data?.productTypes ??
          [];

        setProductTypes(fetchedProductTypes);

        // Tạo danh sách Select.Option
        const options: JSX.Element[] = [];
        for (let i = 0; i < fetchedProductTypes.length; i++) {
          options.push(
            <Option key={fetchedProductTypes[i]._id} value={fetchedProductTypes[i]._id}>
              {fetchedProductTypes[i].name}
            </Option>
          );
        }
        setProductTypeOptions(options);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch data.");
      }
    };
    fetchData();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const payload = { ...values, unit: Number(values.unit) }; // gửi number về BE
      await updateProduct({ accessToken, id: id as string, ...payload });
      toast.success("Product updated successfully!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
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
          unit: product.unit,                // ví dụ 1 hoặc 2
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
          rules={[{ required: true, message: "Please select unit!" }]}
        >
          <Select
            placeholder="Select unit..."
            options={UNIT_OPTIONS}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Type"
          name="productTypeId"
          rules={[{ required: true, message: "Please select productType!" }]}
        >
          <Select placeholder="Select product type...">
            {productTypeOptions}
          </Select>
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
