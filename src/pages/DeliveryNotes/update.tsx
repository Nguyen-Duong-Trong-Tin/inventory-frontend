import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Select, type FormProps } from "antd";
import dayjs from "dayjs";

import { getCookie } from "@/helpers/cookies";
import {
  findDeliveryNoteById,
  updateDeliveryNote,
} from "@/services/delivery-notes";
import { findCustomers } from "@/services/customers";
import { findWarehouses } from "@/services/warehouses";
import { findEmployees } from "@/services/employees";

import type IDeliveryNote from "@/interfaces/delivery-note";
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

function UpdateDeliveryNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [note, setNote] = useState<IDeliveryNote>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteRes, customerRes, warehouseRes, employeeRes] = await Promise.all([
          findDeliveryNoteById({ accessToken, id: id as string }),
          findCustomers({ accessToken }),
          findWarehouses({ accessToken }),
          findEmployees({ accessToken }),
        ]);

        const data = noteRes.data;
        setNote(data);
        setCustomers(customerRes.data?.customers?.customers ?? []);
        setWarehouses(warehouseRes.data?.warehouses?.warehouses ?? []);
        setEmployees(employeeRes.data?.employees?.employees ?? []);

        form.setFieldsValue({
          date: dayjs(data.date),
          deliveryNo: data.deliveryNo,
          customerId: data.customerId,
          warehouseId: data.warehouseId,
          employeeId: data.employeeId,
        });
      } catch {
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [accessToken, id, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateDeliveryNote({
        accessToken,
        id: id as string,
        ...values,
      });

      toast.success("Update successfully.");
      navigate("/delivery-notes");
    } catch {
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
        Update A Delivery Note
      </h1>

      {note && (
        <Form
          layout="vertical"
          style={{ marginTop: 30 }}
          onFinish={onFinish}
          form={form}
        >
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
      )}
    </>
  );
}

export default UpdateDeliveryNote;