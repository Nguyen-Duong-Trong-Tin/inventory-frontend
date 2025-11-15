import { V1 } from "@/constants";
import axios from "axios";

// GET /lots
export const findLots = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/lots`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// GET /lots/:id
export const findLotById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/lots/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// POST /lots
export const createLot = async ({
  accessToken,
  lotNumber,
  manufactureDate,
  expiryDate,
  warehouseReceiptId,
  productId,
  quantity,
  importPrice,
}: {
  accessToken: string;
  lotNumber: string;
  manufactureDate: Date;
  expiryDate: Date;
  warehouseReceiptId: string;
  productId: string;
  quantity: number;
  importPrice: number;
}) => {
  const response = await axios.post(
    `${V1}/lots`,
    {
      lotNumber,
      manufactureDate,
      expiryDate,
      warehouseReceiptId,
      productId,
      quantity,
      importPrice,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

// PATCH /lots/:id
export const updateLot = async ({
  accessToken,
  id,
  lotNumber,
  manufactureDate,
  expiryDate,
  warehouseReceiptId,
  productId,
  quantity,
  importPrice,
}: {
  accessToken: string;
  id: string;
  lotNumber?: string;
  manufactureDate?: Date;
  expiryDate?: Date;
  warehouseReceiptId?: string;
  productId?: string;
  quantity?: number;
  importPrice?: number;
}) => {
  const response = await axios.patch(
    `${V1}/lots/${id}`,
    {
      lotNumber,
      manufactureDate,
      expiryDate,
      warehouseReceiptId,
      productId,
      quantity,
      importPrice,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

// DELETE /lots/:id
export const deleteLot = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/lots/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};