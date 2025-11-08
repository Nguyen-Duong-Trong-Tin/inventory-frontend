import { V1 } from "@/constants";
import axios from "axios";

export const findProductTypes = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/product-types`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findProductTypeById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/product-types/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createProductType = async ({
  accessToken,
  name,
  description,
}: {
  accessToken: string;
  name: string;
  description: string;
}) => {
  const response = await axios.post(
    `${V1}/product-types`,
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateProductType = async ({
  accessToken,
  id,
  name,
  description,
}: {
  accessToken: string;
  id: string;
  name?: string;
  description?: string;
}) => {
  const response = await axios.patch(
    `${V1}/product-types/${id}`,
    { name, description },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteProductType = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/product-types/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};