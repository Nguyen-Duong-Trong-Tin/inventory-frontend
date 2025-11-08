import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCookie } from "@/helpers/cookies";
import { Button } from "@/components/ui/button";
import type IRole from "@/interfaces/role";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteRole, findRoles } from "@/services/roles";
import { PERMISSION_OPTIONS } from "@/constants/permissions";
import { Select } from "antd";

function RolesList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await findRoles({ accessToken });
      setRoles(response.data.roles.roles);
    };
    fetchApi();
  }, [accessToken, reload]);

  const handleDelete = async ({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }) => {
    try {
      if (!confirm("Do you want to delete?")) {
        return;
      }

      await deleteRole({
        accessToken,
        id,
      });
      setReload(!reload);
      toast.success("Delete successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Roles
      </h1>
      <div className="flex justify-end">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description || "-"}</TableCell>
              <TableCell>
                {Array.isArray(role.permisstion) ? (
                  <Select
                    mode="multiple"
                    value={role.permisstion}
                    style={{ width: "100%" }}
                    placeholder="Select permissions"
                    options={PERMISSION_OPTIONS}
                    disabled
                  />
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigate(`update/${role._id}`);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: role._id })
                  }
                >
                  <DeleteOutlined />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default RolesList;
