import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import LayoutDefault from "@/layouts/default";
import DashboardPage from "@/pages/Dashboard";
import ProductTypesPage from "@/pages/ProductTypes";
import ProductTypesList from "@/pages/ProductTypes/list";
import CreateProductType from "@/pages/ProductTypes/create";
import UpdateProductType from "@/pages/ProductTypes/update";
import SuppliersPage from "@/pages/Suppliers";
import SuppliersList from "@/pages/Suppliers/list";
import CreateSupplier from "@/pages/Suppliers/create";
import UpdateSupplier from "@/pages/Suppliers/update";
import CustomersPage from "@/pages/Customers";
import CustomersList from "@/pages/Customers/list";
import CreateCustomer from "@/pages/Customers/create";
import UpdateCustomer from "@/pages/Customers/update";
import RolesPage from "@/pages/Roles";
import RolesList from "@/pages/Roles/list";
import CreateRole from "@/pages/Roles/create";
import UpdateRole from "@/pages/Roles/update";
import EmployeesPage from "@/pages/Employees";
import EmployeesList from "@/pages/Employees/list";
import CreateEmployee from "@/pages/Employees/create";
import UpdateEmployee from "@/pages/Employees/update";
import ProductsPage from "@/pages/Products";
import ProductsList from "@/pages/Products/list";
import CreateProduct from "@/pages/Products/create";
import UpdateProduct from "@/pages/Products/update";
import CreateWarehouse from "@/pages/Warehouses/create";
import WarehousesPage from "@/pages/Warehouses";
import WarehousesList from "@/pages/Warehouses/list";
import UpdateWarehouse from "@/pages/Warehouses/update";
import WarehouseReceiptsPage from "@/pages/WarehouseReceipts";
import CreateWarehouseReceipt from "@/pages/WarehouseReceipts/create";
import WarehouseReceiptsList from "@/pages/WarehouseReceipts/list";
import UpdateWarehouseReceipt from "@/pages/WarehouseReceipts/update";
import DeliveryNotesPage from "@/pages/DeliveryNotes";
import DeliveryNotesList from "@/pages/DeliveryNotes/list";
import CreateDeliveryNote from "@/pages/DeliveryNotes/create";
import UpdateDeliveryNote from "@/pages/DeliveryNotes/update";
import LotsPage from "@/pages/Lots";
import LotsList from "@/pages/Lots/list";
import CreateLot from "@/pages/Lots/create";
import UpdateLot from "@/pages/Lots/update";
import DeliveryNoteDetailsPage from "@/pages/DeliveryNoteDetails";
import DeliveryNoteDetailsList from "@/pages/DeliveryNoteDetails/list";
import CreateDeliveryNoteDetail from "@/pages/DeliveryNoteDetails/create";
import UpdateDeliveryNoteDetail from "@/pages/DeliveryNoteDetails/update";

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
            path: "/product-types",
            element: <ProductTypesPage />,
            children: [
              {
                index: true,
                element: <ProductTypesList />,
              },
              {
                path: "create",
                element: <CreateProductType />,
              },
              {
                path: "update/:id",
                element: <UpdateProductType />,
              },
            ],
          },
          {
            path: "/products",
            element: <ProductsPage />,
            children: [
              {
                index: true,
                element: <ProductsList />,
              },
              {
                path: "create",
                element: <CreateProduct />,
              },
              {
                path: "update/:id",
                element: <UpdateProduct />,
              },
            ],
          },
             {
            path: "/lots",
            element: <LotsPage />,
            children: [
              {
                index: true,
                element: <LotsList />,
              },
              {
                path: "create",
                element: <CreateLot />,
              },
              {
                path: "update/:id",
                element: <UpdateLot />,
              },
            ],
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
            path: "/delivery-notes",
            element: <DeliveryNotesPage />,
            children: [
              {
                index: true,
                element: <DeliveryNotesList />,
              },
              {
                path: "create",
                element: <CreateDeliveryNote />,
              },
              {
                path: "update/:id",
                element: <UpdateDeliveryNote />,
              },
            ],
          },
               {
            path: "/delivery-note-details",
            element: <DeliveryNoteDetailsPage />,
            children: [
              {
                index: true,
                element: <DeliveryNoteDetailsList />,
              },
              {
                path: "create",
                element: <CreateDeliveryNoteDetail />,
              },
              {
                path: "update/:id",
                element: <UpdateDeliveryNoteDetail />,
              },
            ],
          },
          {
            path: "/warehouses",
            element: <WarehousesPage />,
            children: [
              {
                index: true,
                element: <WarehousesList />,
              },
              {
                path: "create",
                element: <CreateWarehouse />,
              },
              {
                path: "update/:id",
                element: <UpdateWarehouse />,
              },
            ],
          },
           {
            path: "/warehouse-receipts",
            element: <WarehouseReceiptsPage />,
            children: [
              {
                index: true,
                element: <WarehouseReceiptsList />,
              },
              {
                path: "create",
                element: <CreateWarehouseReceipt />,
              },
              {
                path: "update/:id",
                element: <UpdateWarehouseReceipt />,
              },
            ],
          },
          {
            path: "/customers",
            element: <CustomersPage />,
            children: [
              {
                index: true,
                element: <CustomersList />,
              },
              {
                path: "create",
                element: <CreateCustomer />,
              },
              {
                path: "update/:id",
                element: <UpdateCustomer />,
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
