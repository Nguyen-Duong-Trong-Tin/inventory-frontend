import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import LayoutDefault from "@/layouts/default";
import DashboardPage from "@/pages/Dashboard";

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
