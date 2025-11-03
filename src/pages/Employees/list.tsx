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
import type IEmployee from "@/interfaces/employee";
import type IRole from "@/interfaces/role";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteEmployee, findEmployees } from "@/services/employees";
import { findRoles } from "@/services/roles";

function EmployeesList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const employeeRes = await findEmployees({ accessToken });
        const rolesRes = await findRoles({ accessToken });

        setEmployees(employeeRes.data.employees.employees);
        setRoles(rolesRes.data.roles.roles); // ✅ Trích xuất đúng mảng vai trò
      } catch {
        toast.error("Failed to fetch data.");
      }
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
      if (!confirm("Do you want to delete?")) return;

      await deleteEmployee({ accessToken, id });
      setReload(!reload);
      toast.success("Delete successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r._id === roleId);
    return role ? role.name : "Unknown";
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Employees
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>{getRoleName(employee.roleId)}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => navigate(`update/${employee._id}`)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: employee._id })
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

export default EmployeesList;