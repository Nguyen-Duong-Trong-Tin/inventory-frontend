import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, type FormProps } from "antd";
import { PERMISSION_OPTIONS } from "@/constants/permissions";

import { getCookie } from "@/helpers/cookies";
import { createRole } from "@/services/roles";

type FieldType = {
  name: string;
  description?: string;
  permisstion?: string[];
};

function CreateRole() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await createRole({
        accessToken,
        name: values.name,
        description: values.description,
        permisstion: values.permisstion,
      });

      toast.success("Role created successfully!");
      navigate("/roles");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Create A Role
      </h1>

      <Form layout="vertical" style={{ marginTop: 30 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input role name!" }]}
        >
          <Input placeholder="Enter role name..." />
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateRole;
