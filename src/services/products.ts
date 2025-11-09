import { V1 } from "@/constants";
import axios from "axios";

export const findProducts = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/products`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findProductById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createProduct = async ({
  accessToken,
  name,
  status,
  unit, 
  productTypeId,
}: {
  accessToken: string;
  name: string;
  status: string;
  unit: number;
  productTypeId: string;
}) => {
  const response = await axios.post(
    `${V1}/products`,
    { name, status, unit, productTypeId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateProduct = async ({
  accessToken,
  id,
  name,
  status,
  unit,
  productTypeId,
}: {
  accessToken: string;
  id: string;
  name: string;
  status: string;
  unit: number;
  productTypeId: string;
}) => {
  const response = await axios.patch(
    `${V1}/products/${id}`,
    { name, status, unit, productTypeId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteProduct = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
