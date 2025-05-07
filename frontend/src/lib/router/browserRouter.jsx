import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../pages/Error";
import Home from "../../pages/Home";
import Employees from "../../pages/Employees";
import Layout from "../../lib/components/Layout/Layout";
import EmployeeSchedule from "../components/Employees/EmployeeSchedule";
import Rating from "../../pages/Rating";
import Customers from "../../pages/Customers";
import ServiceAndPrice from "../../pages/ServiceAndPrice";
import Appointments from "../../pages/Appointments";
import Invoices from "../../pages/Invoices";
import HomeWrapper from "./HomeWrapper ";
import CustomerInvoices from "../../lib/components/Invoices/CustomerInvoices";
import CustomerAppointments from "../../pages/CustomerAppointments";
import CustomerServiceAndPrice from "../../pages/CustomerServiceAndPrice";
import AddAppointment from "../../pages/AddAppointment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeWrapper />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/schedule",
        element: <EmployeeSchedule />,
      },
      {
        path: "/employees/schedule/:maNV",
        element: <EmployeeSchedule />,
      },
      {
        path: "/feedback",
        element: <Rating />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/services",
        element: <ServiceAndPrice />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/customerappointments",
        element: <CustomerAppointments />,
      },
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/CustomerInvoices",
        element: <CustomerInvoices />,
      },
      {
        path: "/customerserviceandprice",
        element: <CustomerServiceAndPrice />,
      },
      {
        path: "/customerappointments/addappointment",
        element: <AddAppointment />,
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
