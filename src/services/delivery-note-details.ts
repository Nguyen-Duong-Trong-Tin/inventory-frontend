import { V1 } from "@/constants";
import axios from "axios";

// GET /delivery-note-details
export const findDeliveryNoteDetails = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/delivery-note-details`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// GET /delivery-note-details/:id
export const findDeliveryNoteDetailById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/delivery-note-details/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// POST /delivery-note-details
export const createDeliveryNoteDetail = async ({
  accessToken,
  deliveryNoteId,
  lotId,
  quantity,
  exportPrice,
  lineNo,
}: {
  accessToken: string;
  deliveryNoteId: string;
  lotId: string;
  quantity: number;
  exportPrice: number;
  lineNo: number;
}) => {
  const response = await axios.post(
    `${V1}/delivery-note-details`,
    { deliveryNoteId, lotId, quantity, exportPrice, lineNo },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

// PATCH /delivery-note-details/:id
export const updateDeliveryNoteDetail = async ({
  accessToken,
  id,
  deliveryNoteId,
  lotId,
  quantity,
  exportPrice,
  lineNo,
}: {
  accessToken: string;
  id: string;
  deliveryNoteId?: string;
  lotId?: string;
  quantity?: number;
  exportPrice?: number;
  lineNo?: number;
}) => {
  const response = await axios.patch(
    `${V1}/delivery-note-details/${id}`,
    { deliveryNoteId, lotId, quantity, exportPrice, lineNo },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

// DELETE /delivery-note-details/:id
export const deleteDeliveryNoteDetail = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/delivery-note-details/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};