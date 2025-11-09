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
import { getCookie } from "@/helpers/cookies";
import { Button } from "@/components/ui/button";
import type IProduct from "@/interfaces/product";
import type IProductType from "@/interfaces/product-type.interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteProduct, findProducts } from "@/services/products";
import { findProductTypes } from "@/services/product-types";

function ProductsList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const productRes = await findProducts({ accessToken });
        const productTypesRes = await findProductTypes({ accessToken });

        setProducts(productRes.data.products.products);
        setProductTypes(productTypesRes.data.productTypes.productTypes); 
      } catch {
        toast.error("Failed to fetch data.");
      }
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
      if (!confirm("Do you want to delete?")) return;

      await deleteProduct({ accessToken, id });
      setReload(!reload);
      toast.success("Delete successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const getProductTypeName = (productTypeId: string) => {
    const productType = productTypes.find((r) => r._id === productTypeId);
    return productType ? productType.name : "Unknown";
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Products
      </h1>
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>{getProductTypeName(product.productTypeId)}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => navigate(`update/${product._id}`)}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: product._id })
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

export default ProductsList;