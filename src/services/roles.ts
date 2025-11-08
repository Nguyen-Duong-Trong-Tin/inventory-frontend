import { V1 } from "@/constants";
import axios from "axios";

export const findRoles = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const findRoleById = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.get(`${V1}/roles/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const createRole = async ({
  accessToken,
  name,
  description,
  permisstion,
}: {
  accessToken: string;
  name: string;
  description?: string;
  permisstion?: string;
}) => {
  const response = await axios.post(
    `${V1}/roles`,
    { name, description, permisstion },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const updateRole = async ({
  accessToken,
  id,
  name,
  description,
  permisstion,
}: {
  accessToken: string;
  id: string;
  name?: string;
  description?: string;
  permisstion?: string;
}) => {
  const response = await axios.patch(
    `${V1}/roles/${id}`,
    { name, description, permisstion },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const deleteRole = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.delete(`${V1}/roles/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
