import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import LayoutDefault from "@/layouts/default";
import DashboardPage from "@/pages/Dashboard";
import SuppliersPage from "@/pages/Suppliers";
import SuppliersList from "@/pages/Suppliers/list";
import CreateSupplier from "@/pages/Suppliers/create";
import UpdateSupplier from "@/pages/Suppliers/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LayoutDefault />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "/suppliers",
            element: <SuppliersPage />,
            children: [
              {
                index: true,
                element: <SuppliersList />,
              },
              {
                path: "create",
                element: <CreateSupplier />,
              },
              {
                path: "update/:id",
                element: <UpdateSupplier />,
              },
            ],
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
