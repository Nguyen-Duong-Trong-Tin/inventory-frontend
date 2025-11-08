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
import RolesPage from "@/pages/Roles";
import RolesList from "@/pages/Roles/list";
import CreateRole from "@/pages/Roles/create";
import UpdateRole from "@/pages/Roles/update";
import EmployeesPage from "@/pages/Employees";
import EmployeesList from "@/pages/Employees/list";
import CreateEmployee from "@/pages/Employees/create";
import UpdateEmployee from "@/pages/Employees/update";

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
            {
            path: "/roles",
            element: <RolesPage />,
            children: [
              {
                index: true,
                element: <RolesList />,
              },
              {
                path: "create",
                element: <CreateRole />,
              },
              {
                path: "update/:id",
                element: <UpdateRole />,
              },
            ],
          },
           {
            path: "/employees",
            element: <EmployeesPage />,
            children: [
              {
                index: true,
                element: <EmployeesList />,
              },
              {
                path: "create",
                element: <CreateEmployee />,
              },
              {
                path: "update/:id",
                element: <UpdateEmployee />,
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
