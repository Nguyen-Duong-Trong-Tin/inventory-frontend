import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { Button, Form, Input, Select, type FormProps } from "antd";

import { getCookie } from "@/helpers/cookies";
import type IEmployee from "@/interfaces/employee";
import type IRole from "@/interfaces/role";
import { findEmployeeById, updateEmployee } from "@/services/employees";
import { findRoles, findRoleById } from "@/services/roles";

type FieldType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  roleId: string;
};

function UpdateEmployee() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [employee, setEmployee] = useState<IEmployee>();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [roleOptions, setRoleOptions] = useState<JSX.Element[]>([]);
  const [roleName, setRoleName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin nhân viên
        const empRes = await findEmployeeById({ accessToken, id: id as string });
        const employeeData = empRes.data;
        setEmployee(employeeData);

        // Lấy tên vai trò hiện tại
        const roleRes = await findRoleById({ accessToken, id: employeeData.roleId });
        setRoleName(roleRes.data.name);

        // Lấy danh sách vai trò
        const rolesRes = await findRoles({ accessToken });
        const fetchedRoles = rolesRes.data.roles.roles; // ✅ đúng cấu trúc từ backend
        setRoles(fetchedRoles);

        // Tạo danh sách Select.Option bằng vòng for
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
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateEmployee({ accessToken, id: id as string, ...values });
      toast.success("Employee updated successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  if (!employee) return null;

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update Employee
      </h1>

      <Form
        layout="vertical"
        style={{ marginTop: 30 }}
        onFinish={onFinish}
        initialValues={{
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          roleId: employee.roleId,
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input address!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter address..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: false }]}
        >
          <Input.Password placeholder="Leave blank to keep current password" />
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateEmployee;