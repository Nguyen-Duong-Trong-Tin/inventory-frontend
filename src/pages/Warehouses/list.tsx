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
import type IWarehouse from "@/interfaces/warehouse";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteWarehouse, findWarehouses } from "@/services/warehouses";

function WarehousesList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await findWarehouses({ accessToken });
      setWarehouses(response.data.warehouses.warehouses);
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

      await deleteWarehouse({
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
        List Of Warehouses
      </h1>
      <div className="flex justify-end">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow>
              <TableCell>{warehouse.name}</TableCell>
              <TableCell>{warehouse.address}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigate(`update/${warehouse._id}`);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: warehouse._id })
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

export default WarehousesList;
