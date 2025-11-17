import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  type FormProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { getCookie } from "@/helpers/cookies";
import { createLot } from "@/services/lots";
import { findProducts } from "@/services/products";
import { findWarehouseReceipts } from "@/services/warehouse-receipts";
import type IProduct from "@/interfaces/product";
import type IWarehouseReceipt from "@/interfaces/warehouse-receipt";

type FieldType = {
  lotNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  warehouseReceiptId: string;
  productId: string;
  quantity: number;
  importPrice: number;
};

function CreateLot() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [form] = Form.useForm();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [receipts, setReceipts] = useState<IWarehouseReceipt[]>([]);

  const generateLotNumber = (): string => {
    const today = dayjs().format("YYYYMMDD");
    const timestamp = Date.now().toString().slice(-4).padStart(4, "0");
    return `LOT-${today}-${timestamp}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, receiptRes] = await Promise.all([
          findProducts({ accessToken }),
          findWarehouseReceipts({ accessToken }),
        ]);

        const productList = productRes?.data?.products?.products ?? [];
        const receiptList = receiptRes?.data?.warehouseReceipts?.warehouseReceipts ?? [];

        setProducts(productList);
        setReceipts(receiptList);

        const generated = generateLotNumber();
        form.setFieldsValue({
          lotNumber: generated,
          productId: productList[0]?._id,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load reference data.");
      }
    };
    fetchData();
  }, [accessToken]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const manufacture = dayjs(values.manufactureDate).toDate();
    const expiry = dayjs(values.expiryDate).toDate();

    if (expiry <= manufacture) {
      toast.error("Expiry date must be after manufacture date.");
      return;
    }

    try {
      const payload = {
        lotNumber: values.lotNumber,
        manufactureDate: values.manufactureDate,
        expiryDate: values.expiryDate,
        warehouseReceiptId: values.warehouseReceiptId,
        productId: values.productId,
        quantity: values.quantity,
        importPrice: values.importPrice,
      };

      const response = await createLot({ accessToken, ...payload });
      const createdLot = response.data;

      toast.success(`Lot created successfully! Lot Number: ${createdLot.lotNumber}`);
      navigate("/lots");
    } catch (error) {
      console.error("Create error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Lot
      </h1>

      <Form form={form} layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Lot Number"
          name="lotNumber"
          rules={[{ required: true, message: "Lot number is required!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Manufacture Date"
          name="manufactureDate"
          rules={[
            { required: true, message: "Please select manufacture date!" },
            {
              validator: (_, value) => {
                if (value && value.isAfter(dayjs())) {
                  return Promise.reject("Manufacture date cannot be in the future!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

       <Form.Item<FieldType>
          label="Expiry Date"
          name="expiryDate"
          dependencies={["manufactureDate"]}
          rules={[
            { required: true, message: "Please select expiry date!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const manufacture = getFieldValue("manufactureDate");
                if (value && manufacture && value.isBefore(manufacture)) {
                  return Promise.reject("Expiry date must be after manufacture date!");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Warehouse Receipt"
          name="warehouseReceiptId"
          rules={[{ required: true, message: "Please select warehouse receipt!" }]}
        >
          <Select placeholder="Select warehouse receipt...">
            {receipts.map((r) => (
              <Select.Option key={r._id} value={r._id}>
                {r.receiptNo || r._id}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Product"
          name="productId"
          rules={[{ required: true, message: "Please select product!" }]}
        >
          <Select placeholder="Select product...">
            {products.map((p) => (
              <Select.Option key={p._id} value={p._id}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input quantity!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
            label="Import Price"
            name="importPrice"
            rules={[{ required: true, message: "Please input import price!" }]}
          >
            <InputNumber<number>
                min={0}
                style={{ width: "100%" }}
                formatter={(value) =>
                  value ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                }
                parser={(value) =>
                  value ? parseFloat(value.replace(/₫\s?|,/g, "")) : 0
                }
              />
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

export default CreateLot;