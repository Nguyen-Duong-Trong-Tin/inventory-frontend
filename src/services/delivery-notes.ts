import { V1 } from "@/constants";
import axios from "axios";

export const findDeliveryNotes = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/delivery-notes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findDeliveryNoteById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/delivery-notes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createDeliveryNote = async ({
  accessToken,
  deliveryNo,
  date,
  warehouseId,
  employeeId,
  customerId,
}: {
  accessToken: string;
  deliveryNo: string;
  date: Date;
  warehouseId: string;
  employeeId: string;
  customerId: string;
}) => {
  const response = await axios.post(
    `${V1}/delivery-notes`,
    { deliveryNo, date, warehouseId, employeeId, customerId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateDeliveryNote = async ({
  accessToken,
  id,
  deliveryNo,
  date,
  warehouseId,
  employeeId,
  customerId,
}: {
  accessToken: string;
  id: string;
  deliveryNo?: string;
  date?: Date;
  warehouseId?: string;
  employeeId?: string;
  customerId?: string;
}) => {
  const response = await axios.patch(
    `${V1}/delivery-notes/${id}`,
    { deliveryNo, date, warehouseId, employeeId, customerId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteDeliveryNote = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/delivery-notes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};