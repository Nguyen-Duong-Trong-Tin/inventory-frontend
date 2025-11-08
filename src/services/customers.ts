import { V1 } from "@/constants";
import axios from "axios";

export const findCustomers = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/customers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findCustomerById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createCustomer = async ({
  accessToken,
  name,
  phone,
}: {
  accessToken: string;
  name: string;
  phone: string;
}) => {
  const response = await axios.post(
    `${V1}/customers`,
    { name, phone },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateCustomer = async ({
  accessToken,
  id,
  name,
  phone,
}: {
  accessToken: string;
  id: string;
  name?: string;
  phone?: string;
}) => {
  const response = await axios.patch(
    `${V1}/customers/${id}`,
    { name, phone, },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteCustomer = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/customers/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
