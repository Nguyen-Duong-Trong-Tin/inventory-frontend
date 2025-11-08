import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import { createWarehouseReceipt } from "@/services/warehouse-receipts";
import { findSuppliers } from "@/services/suppliers";
import { findWarehouses } from "@/services/warehouses";
import { findEmployees } from "@/services/employees";

import type ISupplier from "@/interfaces/supplier";
import type IWarehouse from "@/interfaces/warehouse";
import type IEmployee from "@/interfaces/employee";

type FieldType = {
  date: Date;
  receiptNo: string;
  supplierId: string;
  warehouseId: string;
  employeeId: string;
};

function CreateWarehouseReceipt() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supplierRes, warehouseRes, employeeRes] = await Promise.all([
          findSuppliers({ accessToken }),
          findWarehouses({ accessToken }),
          findEmployees({ accessToken }),
        ]);

        setSuppliers(supplierRes.data?.suppliers?.suppliers ?? []);
        setWarehouses(warehouseRes.data?.warehouses?.warehouses ?? []);
        setEmployees(employeeRes.data?.employees?.employees ?? []);
      } catch {
        toast.error("Failed to load selection data.");
      }
    };

    fetchData();
  }, [accessToken]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const payload = {
        accessToken,
        date: values.date, 
        receiptNo: values.receiptNo,
        supplierId: values.supplierId,
        warehouseId: values.warehouseId,
        employeeId: values.employeeId,
      };

      await createWarehouseReceipt(payload);
      toast.success("Create successfully.");
      navigate("/warehouse-receipts");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        Create A Warehouse Receipt
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Receipt Date"
          name="date"
          rules={[{ required: true, message: "Please select receipt date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Receipt Number"
          name="receiptNo"
          rules={[{ required: true, message: "Please input receipt number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Supplier"
          name="supplierId"
          rules={[{ required: true, message: "Please select supplier!" }]}
        >
          <Select placeholder="Select supplier">
            {suppliers.map((s) => (
              <Select.Option key={s._id} value={s._id}>
                {s.name}
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

export default CreateWarehouseReceipt;