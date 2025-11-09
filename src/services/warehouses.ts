import { V1 } from "@/constants";
import axios from "axios";

export const findWarehouses = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/warehouses`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findWarehouseById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createWarehouse = async ({
  accessToken,
  name,
  address,
}: {
  accessToken: string;
  name: string;
  address: string;
}) => {
  const response = await axios.post(
    `${V1}/warehouses`,
    { name, address },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateWarehouse = async ({
  accessToken,
  id,
  name,
  address,
}: {
  accessToken: string;
  id: string;
  name?: string;
  address?: string;
}) => {
  const response = await axios.patch(
    `${V1}/warehouses/${id}`,
    { name, address },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteWarehouse = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/warehouses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
