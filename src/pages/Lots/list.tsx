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
import type ILot from "@/interfaces/lot";
import type IProduct from "@/interfaces/product";
import type IWarehouseReceipt from "@/interfaces/warehouse-receipt";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { deleteLot, findLots } from "@/services/lots";
import { findProducts } from "@/services/products";
import { findWarehouseReceipts } from "@/services/warehouse-receipts";

function LotsList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");

  const [reload, setReload] = useState(false);
  const [lots, setLots] = useState<ILot[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [receipts, setReceipts] = useState<IWarehouseReceipt[]>([]);

  const formatCurrency = (value: number) =>
    `₫ ${value.toLocaleString("vi-VN")}`;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [lotRes, productRes, receiptRes] = await Promise.all([
          findLots({ accessToken }),
          findProducts({ accessToken }),
          findWarehouseReceipts({ accessToken }),
        ]);

        const lotList = lotRes?.data?.lots?.lots ?? [];
        const productList = productRes?.data?.products?.products ?? [];
        const receiptList = receiptRes?.data?.warehouseReceipts?.warehouseReceipts ?? [];

        setLots(lotList);
        setProducts(productList);
        setReceipts(receiptList);
      } catch {
        toast.error("Failed to fetch lots.");
      }
    };
    fetchApi();
  }, [accessToken, reload]);

  const getProductName = (id: string) =>
    products.find((p) => p._id === id)?.name ?? id;

  const getReceiptCode = (id: string) =>
    receipts.find((r) => r._id === id)?.receiptNo ?? id;

  const handleDelete = async ({ accessToken, id }: { accessToken: string; id: string }) => {
    try {
      if (!confirm("Do you want to delete this lot?")) return;
      await deleteLot({ accessToken, id });
      setReload(!reload);
      toast.success("Lot deleted successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Lots
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lot Number</TableHead>
            <TableHead>Manufacture Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Warehouse Receipt</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Import Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lots.map((lot) => (
            <TableRow key={lot._id}>
              <TableCell>{lot.lotNumber}</TableCell>
              <TableCell>{dayjs(lot.manufactureDate).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{dayjs(lot.expiryDate).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{getProductName(lot.productId)}</TableCell>
              <TableCell>{getReceiptCode(lot.warehouseReceiptId)}</TableCell>
              <TableCell>{lot.quantity}</TableCell>
              <TableCell>{formatCurrency(lot.importPrice)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button onClick={() => navigate(`update/${lot._id}`)}>
                  <EditOutlined />
                </Button>
                <Button onClick={() => handleDelete({ accessToken, id: lot._id })}>
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

export default LotsList;