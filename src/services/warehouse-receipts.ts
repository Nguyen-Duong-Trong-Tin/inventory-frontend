import { V1 } from "@/constants";
import axios from "axios";

// GET all warehouse receipts
export const findWarehouseReceipts = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  return axios.get(`${V1}/warehouse-receipts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// GET warehouse receipt by ID
export const findWarehouseReceiptsById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  return axios.get(`${V1}/warehouse-receipts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// POST create warehouse receipt
export const createWarehouseReceipt = async ({
  accessToken,
  date,
  receiptNo,
  supplierId,
  warehouseId,
  employeeId,
}: {
  accessToken: string;
  date: Date; 
  receiptNo: string;
  supplierId: string;
  warehouseId: string;
  employeeId: string;
}) => {
  const payload = {
    date, 
    receiptNo,
    supplierId,
    warehouseId,
    employeeId,
  };

  return axios.post(`${V1}/warehouse-receipts`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// PATCH update warehouse receipt
export const updateWarehouseReceipt = async ({
  accessToken,
  id,
  date,
  receiptNo,
  supplierId,
  warehouseId,
  employeeId,
}: {
  accessToken: string;
  id: string;
  date?: Date;
  receiptNo?: string;
  supplierId?: string;
  warehouseId?: string;
  employeeId?: string;
}) => {
  const payload: Record<string, any> = {};

  if (date) payload.date = date.toISOString(); // chuyển nếu có
  if (receiptNo) payload.receiptNo = receiptNo;
  if (supplierId) payload.supplierId = supplierId;
  if (warehouseId) payload.warehouseId = warehouseId;
  if (employeeId) payload.employeeId = employeeId;

  return axios.patch(`${V1}/warehouse-receipts/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// DELETE warehouse receipt
export const deleteWarehouseReceipt = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  return axios.delete(`${V1}/warehouse-receipts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};