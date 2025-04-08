import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../pages/Error";
import Employees from "../../pages/Employees";
import Layout from "../../lib/components/Layout/Layout";
import EmployeeSchedule from "../components/Employees/EmployeeSchedule";

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
      {
        path: "/employees/schedule/:maNV",
        element: <EmployeeSchedule />,
      },
    ],
  },
]);

// to="/">Trang chủ<
// to="/appointments">Lịch hẹn<
// to="/services">Dịch vụ & Giá cả<
// to="/customers">Khách hàng<
// to="/feedback">Đánh giá & Phản hồi<
// to="/employees">Nhân viên<
// to="/invoices">Hoá đơn<
