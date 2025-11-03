import { V1 } from "@/constants";
import axios from "axios";

export const findEmployees = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/employees`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findEmployeeById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createEmployee = async ({
  accessToken,
  name,
  email,
  phone,
  address,
  password,
  roleId,
}: {
  accessToken: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  roleId: string;
}) => {
  const response = await axios.post(
    `${V1}/employees`,
    { name, email, phone, address, password, roleId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateEmployee = async ({
  accessToken,
  id,
  name,
  email,
  phone,
  address,
  password,
  roleId,
}: {
  accessToken: string;
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  password?: string;
  roleId?: string;
}) => {
  const response = await axios.patch(
    `${V1}/employees/${id}`,
    { name, email, phone, address, password, roleId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteEmployee = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
