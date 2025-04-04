import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../pages/Error";
import Employees from "../../pages/Employees";
import Layout from "../../lib/components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/employees",
        element: <Employees />,
      },
    ],
  },
]);
