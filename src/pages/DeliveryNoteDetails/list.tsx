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

import type ILot from "@/interfaces/lot";
import type IDeliveryNoteDetail from "@/interfaces/delivery-note-detail";
import type IDeliveryNote from "@/interfaces/delivery-note";

import {
  findDeliveryNoteDetails,
  deleteDeliveryNoteDetail,
} from "@/services/delivery-note-details";
import { findDeliveryNotes } from "@/services/delivery-notes";
import { findLots } from "@/services/lots";

function DeliveryNoteDetailsList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [reload, setReload] = useState(false);
  const [details, setDetails] = useState<IDeliveryNoteDetail[]>([]);
  const [notes, setNotes] = useState<IDeliveryNote[]>([]);
  const [lots, setLots] = useState<ILot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailRes, noteRes, lotRes] = await Promise.all([
          findDeliveryNoteDetails({ accessToken }),
          findDeliveryNotes({ accessToken }),
          findLots({ accessToken }),
        ]);

        setDetails(detailRes.data?.deliveryNoteDetails?.details ?? []);
        setNotes(noteRes.data?.deliverynotes?.deliverynotes ?? []);
        setLots(lotRes.data?.lots?.lots ?? []);
      } catch {
        toast.error("Failed to load delivery note detail data.");
      }
    };

    fetchData();
  }, [accessToken, reload]);

  const handleDelete = async ({ accessToken, id }: { accessToken: string; id: string }) => {
    try {
      if (!confirm("Do you want to delete this delivery note detail?")) return;

      await deleteDeliveryNoteDetail({ accessToken, id });
      setReload(!reload);
      toast.success("Delivery note detail deleted successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const getNameById = (
    list: Record<string, any>[],
    id: string,
    field: string
  ): string => {
    const found = list.find((item) => item._id === id);
    return found?.[field] ?? "Unknown";
  };

  return (
    <>
      <h1 className="text-center text-4xl font-extrabold tracking-tight">
        List of Delivery Note Details
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+ Create</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Delivery Note</TableHead>
            <TableHead>Lot</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Export Price</TableHead>
            <TableHead>Line No</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No delivery note details found.
              </TableCell>
            </TableRow>
          ) : (
            details.map((detail) => (
              <TableRow key={detail._id}>
                <TableCell>
                  {getNameById(notes, detail.deliveryNoteId, "deliveryNo")}
                </TableCell>
                <TableCell>
                  {getNameById(lots, detail.lotId, "lotNumber")}
                </TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell>
                  {detail.exportPrice.toLocaleString("vi-VN")} đ
                </TableCell>
                <TableCell>{detail.lineNo}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="ml-2"
                    onClick={() => navigate(`update/${detail._id}`)}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    className="ml-2"
                    onClick={() => handleDelete({ accessToken, id: detail._id })}
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

export default DeliveryNoteDetailsList;