import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, type FormProps } from "antd";
import { PERMISSION_OPTIONS } from "@/constants/permissions";

import { getCookie } from "@/helpers/cookies";
import type IRole from "@/interfaces/role";
import { findRoleById, updateRole } from "@/services/roles";

type FieldType = {
  name: string;
  description?: string;
  permisstion?: string[];
};

function UpdateRole() {
  const { id } = useParams();
  const accessToken = getCookie("accessToken");
  const [role, setRole] = useState<IRole>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await findRoleById({
          accessToken,
          id: id as string,
        });
        setRole(response.data);
      } catch {
        toast.error("Something went wrong.");
      }
    };
    fetchApi();
  }, [accessToken, id]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await updateRole({
        accessToken,
        id: id as string,
        name: values.name,
        description: values.description,
        permisstion: values.permisstion,
      });

      toast.success("Update successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Update A Role
      </h1>

      {role && (
        <Form
          layout="vertical"
          style={{ marginTop: 30 }}
          onFinish={onFinish}
          initialValues={{
            name: role.name,
            description: role.description,
            permisstion: role.permisstion,
          }}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input role name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Enter description..." />
          </Form.Item>

          <Form.Item<FieldType>
            label="Permissions"
            name="permisstion"
            rules={[{ required: false, message: "Please select at least one permission!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select permissions..."
              options={PERMISSION_OPTIONS}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default UpdateRole;
