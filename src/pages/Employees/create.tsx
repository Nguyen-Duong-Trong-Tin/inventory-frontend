import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, type FormProps } from "antd";
import { useEffect, useState, type JSX } from "react";

import { getCookie } from "@/helpers/cookies";
import { createEmployee } from "@/services/employees";
import { findRoles } from "@/services/roles";
import type IRole from "@/interfaces/role";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  roleId: string;
};

function CreateEmployee() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [roles, setRoles] = useState<IRole[]>([]);
  const [roleOptions, setRoleOptions] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await findRoles({ accessToken });
        const fetchedRoles = res.data.roles.roles; // ✅ đúng cấu trúc từ backend
        setRoles(fetchedRoles);

        const options: JSX.Element[] = [];
        for (let i = 0; i < fetchedRoles.length; i++) {
          options.push(
            <Select.Option key={fetchedRoles[i]._id} value={fetchedRoles[i]._id}>
              {fetchedRoles[i].name}
            </Select.Option>
          );
        }
        setRoleOptions(options);
      } catch {
        toast.error("Failed to load roles.");
      }
    };
    fetchRoles();
  }, [accessToken]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createEmployee({ accessToken, ...values });
      toast.success("Employee created successfully!");
      navigate("/employees");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create An Employee
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter address..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Role"
          name="roleId"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select placeholder="Select role...">{roleOptions}</Select>
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

export default CreateEmployee;