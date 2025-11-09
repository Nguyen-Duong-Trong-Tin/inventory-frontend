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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import type IWarehouseReceipt from "@/interfaces/warehouse-receipts";
import type ISupplier from "@/interfaces/supplier";
import type IWarehouse from "@/interfaces/warehouse";
import type IEmployee from "@/interfaces/employee";

import {
  findWarehouseReceipts,
  deleteWarehouseReceipt,
} from "@/services/warehouse-receipts";
import { findSuppliers } from "@/services/suppliers";
import { findWarehouses } from "@/services/warehouses";
import { findEmployees } from "@/services/employees";

function WarehouseReceiptsList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [reload, setReload] = useState(false);
  const [receipts, setReceipts] = useState<IWarehouseReceipt[]>([]);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [receiptRes, supplierRes, warehouseRes, employeeRes] =
          await Promise.all([
            findWarehouseReceipts({ accessToken }),
            findSuppliers({ accessToken }),
            findWarehouses({ accessToken }),
            findEmployees({ accessToken }),
          ]);

        // ✅ Đọc đúng mảng warehouseReceipts
        setReceipts(
          Array.isArray(receiptRes.data?.warehouseReceipts?.warehouseReceipts)
            ? receiptRes.data.warehouseReceipts.warehouseReceipts
            : []
        );

        setSuppliers(supplierRes.data?.suppliers?.suppliers ?? []);
        setWarehouses(warehouseRes.data?.warehouses?.warehouses ?? []);
        setEmployees(employeeRes.data?.employees?.employees ?? []);
      } catch {
        toast.error("Failed to load warehouse receipt data.");
      }
    };

    fetchData();
  }, [accessToken, reload]);

  const handleDelete = async ({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }) => {
    try {
      if (!confirm("Do you want to delete this receipt?")) return;

      await deleteWarehouseReceipt({ accessToken, id });
      setReload(!reload);
      toast.success("Receipt deleted successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const getNameById = (
    list: { _id: string; name: string }[],
    id: string
  ): string => {
    const found = list.find((item) => item._id === id);
    return found ? found.name : "Unknown";
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        List of Warehouse Receipts
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+ Create</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Receipt No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No warehouse receipts found.
              </TableCell>
            </TableRow>
          ) : (
            receipts.map((receipt) => (
              <TableRow key={receipt._id}>
                <TableCell>{receipt.receiptNo}</TableCell>
                <TableCell>
                  {new Date(receipt.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getNameById(suppliers, receipt.supplierId)}
                </TableCell>
                <TableCell>
                  {getNameById(warehouses, receipt.warehouseId)}
                </TableCell>
                <TableCell>
                  {getNameById(employees, receipt.employeeId)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="ml-2"
                    onClick={() => navigate(`update/${receipt._id}`)}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    className="ml-2"
                    onClick={() =>
                      handleDelete({ accessToken, id: receipt._id })
                    }
                  >
                    <DeleteOutlined />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default WarehouseReceiptsList;