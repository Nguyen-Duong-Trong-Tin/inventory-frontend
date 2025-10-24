import axios from "axios";
import { V1 } from "@/constants";

export const authLoginEmployee = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${V1}/auth/login/employee`, {
    email,
    password,
  });
  return response;
};

export const authVerifyAccessToken = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get(`${V1}/auth/verify-access-token/employee`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
