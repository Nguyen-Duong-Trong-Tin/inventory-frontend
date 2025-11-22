import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

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
import type ICustomer from "@/interfaces/customer";
import { deleteCustomer, findCustomers } from "@/services/customers";

function CustomersList() {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const [reload, setReload] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await findCustomers({ accessToken });
      setCustomers(response.data.customers.customers);
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

      await deleteCustomer({
        accessToken,
        id,
      });
      setReload(!reload);
      toast.success("Delete successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const navigateToSuggesstion = ({ customerId }: { customerId: string }) => {
    navigate(`/suggestions/${customerId}`);
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        List Of Customers
      </h1>
      <div className="flex justify-end">
        <Button onClick={() => navigate("create")}>+</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="ml-2"
                  onClick={() => {
                    navigate(`update/${customer._id}`);
                  }}
                >
                  <EditOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    handleDelete({ accessToken, id: customer._id })
                  }
                >
                  <DeleteOutlined />
                </Button>
                <Button
                  className="ml-2"
                  onClick={() =>
                    navigateToSuggesstion({ customerId: customer._id })
                  }
                >
                  <ShoppingCartOutlined />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default CustomersList;
