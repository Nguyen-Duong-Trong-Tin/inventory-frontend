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
import type ISupplier from "@/interfaces/supplier";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteSupplier, findSuppliers } from "@/services/suppliers";

function SuppliersList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await findSuppliers({ accessToken });
      setSuppliers(response.data.suppliers.suppliers);
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

      await deleteSupplier({
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
        List Of Suppliers
      </h1>
      <div className="flex justify-end">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigate(`update/${supplier._id}`);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: supplier._id })
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

export default SuppliersList;
