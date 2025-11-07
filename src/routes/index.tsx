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