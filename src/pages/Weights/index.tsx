import { Button } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { CheckCircleOutlined } from "@ant-design/icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getCookie } from "@/helpers/cookies";
import type IWeight from "@/interfaces/weight.interface";
import { activeWeight, findWeights } from "@/services/weight";

function WeightPage() {
  const accessToken = getCookie("accessToken");

  const [reload, setReload] = useState(false);
  const [weights, setWeights] = useState<IWeight[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const { data } = await findWeights({ accessToken });
        setWeights(data);
      } catch {
        toast.error("Something went wrong");
      }
    };
    fetchApi();
  }, [accessToken, reload]);

  const handleActiveWeight = async ({ weightId }: { weightId: string }) => {
    try {
      await activeWeight({ accessToken, id: weightId });

      toast.success("Weight updated successfully");
    } catch {
      toast.error("Something went wrong");
    }

    setReload(!reload);
  };

  console.log(weights);

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Weights
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>w1</TableHead>
            <TableHead>w2</TableHead>
            <TableHead>w3</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weights.map((weight) => (
            <TableRow>
              <TableCell>{weight.description}</TableCell>
              <TableCell>{weight.w1}</TableCell>
              <TableCell>{weight.w2}</TableCell>
              <TableCell>{weight.w3}</TableCell>
              <TableCell>{weight.active ? "Active" : "Inactive"}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    handleActiveWeight({ weightId: weight._id });
                  }}
                >
                  <CheckCircleOutlined />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default WeightPage;
