import axios from "axios";

import { V1 } from "@/constants";

export const findWeights = async ({ accessToken }: { accessToken: string }) => {
  const response = await axios.get(`${V1}/weights`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const activeWeight = async ({
  accessToken,
  id,
}: {
  accessToken: string;
  id: string;
}) => {
  const response = await axios.patch(
    `${V1}/weights/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
