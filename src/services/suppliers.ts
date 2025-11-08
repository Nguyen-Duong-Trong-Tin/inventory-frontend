import { V1 } from "@/constants";
import axios from "axios";

export const findSuppliers = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/suppliers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findSupplierById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createSupplier = async ({
  accessToken,
  name,
  email,
  phone,
  address,
}: {
  accessToken: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}) => {
  const response = await axios.post(
    `${V1}/suppliers`,
    { name, email, phone, address },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateSupplier = async ({
  accessToken,
  id,
  name,
  email,
  phone,
  address,
}: {
  accessToken: string;
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}) => {
  const response = await axios.patch(
    `${V1}/suppliers/${id}`,
    { name, email, phone, address },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteSupplier = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
