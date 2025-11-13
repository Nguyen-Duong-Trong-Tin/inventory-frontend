import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { createDeliveryNote } from "@/services/delivery-notes";
import { findCustomers } from "@/services/customers";
import { findWarehouses } from "@/services/warehouses";
import { findEmployees } from "@/services/employees";

import type ICustomer from "@/interfaces/customer";
import type IWarehouse from "@/interfaces/warehouse";
import type IEmployee from "@/interfaces/employee";

type FieldType = {
  date: Date;
  deliveryNo: string;
  customerId: string;
  warehouseId: string;
  employeeId: string;
};

function CreateDeliveryNote() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, warehouseRes, employeeRes] = await Promise.all([
          findCustomers({ accessToken }),
          findWarehouses({ accessToken }),
          findEmployees({ accessToken }),
        ]);

        setCustomers(customerRes.data?.customers?.customers ?? []);
        setWarehouses(warehouseRes.data?.warehouses?.warehouses ?? []);
        setEmployees(employeeRes.data?.employees?.employees ?? []);
      } catch {
        toast.error("Failed to load selection data.");
      }
    };

    const generateDeliveryNo = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const today = `${year}${month}${day}`;

      const timestamp = Date.now().toString().slice(-4).padStart(4, "0");
      const deliveryNo = `DN-${today}-${timestamp}`;

      form.setFieldsValue({ deliveryNo });
    };

    fetchData();
    generateDeliveryNo();
  }, [accessToken, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const payload = {
        accessToken,
        date: values.date,
        deliveryNo: values.deliveryNo,
        customerId: values.customerId,
        warehouseId: values.warehouseId,
        employeeId: values.employeeId,
      };

      await createDeliveryNote(payload);
      toast.success("Create successfully.");
      navigate("/delivery-notes");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const disableFutureDates = (current: any) => {
    const today = new Date();
    return current && current.toDate() > today;
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        Create A Delivery Note
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish} form={form}>
        <Form.Item<FieldType>
          label="Delivery Date"
          name="date"
          rules={[{ required: true, message: "Please select delivery date!" }]}
        >
          <DatePicker style={{ width: "100%" }} disabledDate={disableFutureDates} />
        </Form.Item>

        <Form.Item<FieldType> label="Delivery Number" name="deliveryNo">
          <input
            disabled
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
              backgroundColor: "#f5f5f5",
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Customer"
          name="customerId"
          rules={[{ required: true, message: "Please select customer!" }]}
        >
          <Select placeholder="Select customer">
            {customers.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Warehouse"
          name="warehouseId"
          rules={[{ required: true, message: "Please select warehouse!" }]}
        >
          <Select placeholder="Select warehouse">
            {warehouses.map((w) => (
              <Select.Option key={w._id} value={w._id}>
                {w.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="Employee"
          name="employeeId"
          rules={[{ required: true, message: "Please select employee!" }]}
        >
          <Select placeholder="Select employee">
            {employees.map((e) => (
              <Select.Option key={e._id} value={e._id}>
                {e.name}
              </Select.Option>
            ))}
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

export default CreateDeliveryNote;