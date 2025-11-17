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
  unit: number;          // vẫn là number trong DB
  productTypeId: string;
};

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

const STATUS_OPTIONS = [
  { value: "active", label: "Hoạt động" },
  { value: "inactive", label: "Không hoạt động" },
];

function CreateProduct() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [productTypeOptions, setProductTypeOptions] = useState<JSX.Element[]>([]);
  const { Option } = Select;

  useEffect(() => {
    const fetchedProductTypes = async () => {
      try {
        const res = await findProductTypes({ accessToken });

        // Đọc an toàn, tránh văng lỗi khi key khác nhau
        const fetchedTypes: IProductType[] =
          res?.data?.ProductTypes?.ProductTypes ??  // dạng P hoa (nếu BE như vậy)
          res?.data?.productTypes?.productTypes ??  // camel lồng
          res?.data?.productTypes ??                // mảng trực tiếp
          res?.data?.data?.productTypes ??          // lồng trong data
          [];

        setProductTypes(fetchedTypes);

        const options = fetchedTypes.map((type: IProductType) => (
          <Option key={type._id} value={type._id}>
            {type.name}
          </Option>
        ));
        setProductTypeOptions(options);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load productTypes.");
      }
    };
    fetchedProductTypes();
  }, [accessToken]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // đảm bảo unit là number
      const payload = { ...values, unit: Number(values.unit) };
      await createProduct({ accessToken, ...payload });
      toast.success("Product created successfully!");
      navigate("/products");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (info) => {
    console.warn("Form validation failed:", info);
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Product
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select
            placeholder="Select status..."
            options={STATUS_OPTIONS}
            optionFilterProp="label"
            showSearch
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Please select unit!" }]}
        >
          <Select
            placeholder="Select unit..."
            options={UNIT_OPTIONS}
            optionFilterProp="label"
            showSearch
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Type"
          name="productTypeId"
          rules={[{ required: true, message: "Please select productType!" }]}
        >
          <Select placeholder="Select productType...">
            {productTypeOptions}
          </Select>
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
