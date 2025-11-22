import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { getCookie } from "@/helpers/cookies";
import { Button } from "@/components/ui/button";
import type IProduct from "@/interfaces/product";
import type IProductType from "@/interfaces/product-type.interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteProduct, findProducts } from "@/services/products";
import { findProductTypes } from "@/services/product-types";

const UNIT_OPTIONS = [
  { value: 1, label: "Box" },
  { value: 2, label: "Blister pack" },
  { value: 3, label: "Tablet" },
  { value: 4, label: "Bottle" },
  { value: 5, label: "Ampoule" },
  { value: 6, label: "Sachet" },
  { value: 7, label: "Bottle" },
  { value: 8, label: "Tube" },
  { value: 9, label: "Jar" },
  { value: 10, label: "Carton" },
];
const getUnitLabel = (u: number) =>
  UNIT_OPTIONS.find(o => o.value === u)?.label ?? String(u);


function ProductsList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productTypes, setProductTypes] = useState<IProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [productRes, typeRes] = await Promise.all([
          findProducts({ accessToken }),
          findProductTypes({ accessToken }),
        ]);

        const list =
          productRes?.data?.products?.products ??
          productRes?.data?.products ??
          [];
        setProducts(list);

        const types =
          typeRes?.data?.ProductTypes?.ProductTypes ??
          typeRes?.data?.productTypes?.productTypes ??
          typeRes?.data?.productTypes ??
          typeRes?.data?.data?.productTypes ??
          [];
        setProductTypes(types);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [accessToken, reload]);

  const productTypeMap = useMemo(
    () => new Map(productTypes.map(t => [t._id, t.name])),
    [productTypes]
  );

  const handleDelete = async ({
    accessToken,
    id,
  }: {
    accessToken: string;
    id: string;
  }) => {
    try {
      if (!confirm("Do you want to delete?")) return;
      setDeletingId(id);
      await deleteProduct({ accessToken, id });
      toast.success("Delete successfully.");
      setReload(prev => !prev);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  const getProductTypeName = (productTypeId: string) =>
    productTypeMap.get(productTypeId) ?? "Unknown";

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Products
      </h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Product Type</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{getProductTypeName(product.productTypeId)}</TableCell>
                <TableCell>{getUnitLabel(product.unit)}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button className="ml-2" onClick={() => navigate(`update/${product._id}`)}>
                    <EditOutlined />
                  </Button>
                  <Button
                    className="ml-2"
                    onClick={() => handleDelete({ accessToken, id: product._id })}
                    disabled={deletingId === product._id}
                  >
                    <DeleteOutlined />
                    {deletingId === product._id ? "" : ""}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default ProductsList;
