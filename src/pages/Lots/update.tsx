import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  type FormProps,
} from "antd";
import dayjs from "dayjs";

import { getCookie } from "@/helpers/cookies";
import type ILot from "@/interfaces/lot";
import type IProduct from "@/interfaces/product";
import type IWarehouseReceipt from "@/interfaces/warehouse-receipt";
import { findLotById, updateLot } from "@/services/lots";
import { findProducts } from "@/services/products";
import { findWarehouseReceipts } from "@/services/warehouse-receipts";

type FieldType = {
  lotNumber: number;
  manufactureDate: string;
  expiryDate: string;
  warehouseReceiptId: string;
  productId: string;
  quantity: number;
  importPrice: number;
};

function UpdateLot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [lot, setLot] = useState<ILot>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [receipts, setReceipts] = useState<IWarehouseReceipt[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [lotRes, productRes, receiptRes] = await Promise.all([
          findLotById({ accessToken, id: id as string }),
          findProducts({ accessToken }),
          findWarehouseReceipts({ accessToken }),
        ]);

        setLot(lotRes.data);
        setProducts(productRes?.data?.products?.products ?? []);
        setReceipts(receiptRes?.data?.warehouseReceipts?.warehouseReceipts ?? []);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const manufacture = dayjs(values.manufactureDate).toDate();
    const expiry = dayjs(values.expiryDate).toDate();

    if (expiry <= manufacture) {
      toast.error("Expiry date must be after manufacture date.");
      return;
    }

    try {
      const payload = {
        ...values,
        lotNumber: String(values.lotNumber),
        manufactureDate: dayjs(values.manufactureDate).toDate(),
        expiryDate: dayjs(values.expiryDate).toDate(),
      };

      await updateLot({ accessToken, id: id as string, ...payload });
      toast.success("Lot updated successfully.");
      navigate("/lots");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Lot
      </h1>

      {lot && (
        <Form
          layout="vertical"
          style={{ marginTop: 30 }}
          onFinish={onFinish}
          initialValues={{
            lotNumber: lot.lotNumber,
            manufactureDate: dayjs(lot.manufactureDate),
            expiryDate: dayjs(lot.expiryDate),
            warehouseReceiptId: lot.warehouseReceiptId,
            productId: lot.productId,
            quantity: lot.quantity,
            importPrice: lot.importPrice,
          }}
        >
          <Form.Item<FieldType>
            label="Lot Number"
            name="lotNumber"
            rules={[{ required: true, message: "Please input lot number!" }]}
          >
            <InputNumber disabled style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Manufacture Date"
            name="manufactureDate"
            rules={[
              { required: true, message: "Please select manufacture date!" },
              {
                validator: (_, value) =>
                  value && value.isAfter(dayjs())
                    ? Promise.reject("Manufacture date cannot be in the future!")
                    : Promise.resolve(),
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
      )}
    </>
  );
}

export default UpdateLot;