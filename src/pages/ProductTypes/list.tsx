import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getCookie } from "@/helpers/cookies";
import { Button } from "@/components/ui/button";

import { deleteProductType, findProductTypes } from "@/services/product-types";
import type IProductType from "@/interfaces/product-type.interface";

function ProductTypesList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const {
        data: {
          ProductTypes: { ProductTypes },
        },
      } = await findProductTypes({ accessToken });

      setProductTypes(ProductTypes);
    };
    fetchApi();
  }, [accessToken, reload]);

  const handleDelete = async ({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }) => {
    try {
      if (!confirm("Do you want to delete?")) {
        return;
      }

      await deleteProductType({
        accessToken,
        id,
      });
      setReload(!reload);
      toast.success("Delete successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  console.log(productTypes);

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Product Types
      </h1>
      <div className="flex justify-end">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productTypes.map((productType) => (
            <TableRow>
              <TableCell>{productType.name}</TableCell>
              <TableCell>{productType.description}</TableCell>

              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigate(`update/${productType._id}`);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: productType._id })
                  }
                >
                  <DeleteOutlined />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ProductTypesList;
