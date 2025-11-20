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

import type IDeliveryNote from "@/interfaces/delivery-note";
import type ICustomer from "@/interfaces/customer";
import type IWarehouse from "@/interfaces/warehouse";
import type IEmployee from "@/interfaces/employee";

import {
  findDeliveryNotes,
  deleteDeliveryNote,
  downloadDeliveryNotePDF,
} from "@/services/delivery-notes";
import { findCustomers } from "@/services/customers";
import { findWarehouses } from "@/services/warehouses";
import { findEmployees } from "@/services/employees";

function DeliveryNotesList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [reload, setReload] = useState(false);
  const [notes, setNotes] = useState<IDeliveryNote[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteRes, customerRes, warehouseRes, employeeRes] =
          await Promise.all([
            findDeliveryNotes({ accessToken }),
            findCustomers({ accessToken }),
            findWarehouses({ accessToken }),
            findEmployees({ accessToken }),
          ]);

        setNotes(
          Array.isArray(noteRes.data?.deliverynotes?.deliverynotes)
            ? noteRes.data.deliverynotes.deliverynotes
            : []
        );

        setCustomers(customerRes.data?.customers?.customers ?? []);
        setWarehouses(warehouseRes.data?.warehouses?.warehouses ?? []);
        setEmployees(employeeRes.data?.employees?.employees ?? []);
      } catch {
        toast.error("Failed to load delivery note data.");
      }
    };

    fetchData();
  }, [accessToken, reload]);

  const handleDownloadDeliveryNotePDF = async (id: string) => {
    try {
      const response = await downloadDeliveryNotePDF({ accessToken, id });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `hoa_don_xuat_kho_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      toast.error("Không thể tải PDF hóa đơn xuất kho.");
    }
  };

  const handleDelete = async ({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }) => {
    try {
      if (!confirm("Do you want to delete this delivery note?")) return;

      await deleteDeliveryNote({ accessToken, id });
      setReload(!reload);
      toast.success("Delivery note deleted successfully.");
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
        List of Delivery Notes
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+ Create</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Delivery No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No delivery notes found.
              </TableCell>
            </TableRow>
          ) : (
            notes.map((note) => (
              <TableRow key={note._id}>
                <TableCell>{note.deliveryNo}</TableCell>
                <TableCell>
                  {new Date(note.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getNameById(customers, note.customerId)}
                </TableCell>
                <TableCell>
                  {getNameById(warehouses, note.warehouseId)}
                </TableCell>
                <TableCell>
                  {getNameById(employees, note.employeeId)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="ml-2"
                    onClick={() => navigate(`update/${note._id}`)}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    className="ml-2"
                    onClick={() =>
                      handleDelete({ accessToken, id: note._id })
                    }
                  >
                    <DeleteOutlined />
                  </Button>
                     <Button
                    className="ml-2"
                    onClick={() => handleDownloadDeliveryNotePDF(note._id)}
                  >
                    🖨️ Print
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

export default DeliveryNotesList;