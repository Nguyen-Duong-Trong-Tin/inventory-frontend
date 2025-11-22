import axios from "axios";

import { V1 } from "@/constants";

export const getSuggesstions = async ({
  accessToken,
  customerId,
}: {
  accessToken: string;
  customerId: string;
}) => {
  const response = await axios.get(`${V1}/suggestions/export-product/${customerId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
