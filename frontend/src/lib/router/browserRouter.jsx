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
import CustomerInvoices from "../../pages/CustomerInvoices";
import CustomerAppointments from "../../pages/CustomerAppointments";
import CustomerServiceAndPrice from "../../pages/CustomerServiceAndPrice";
import CustomerAddAppointment from "../components/Appointments/CustomerAddAppointment";
import AppointmentWrapper from "./AppointmentWrapper";
import ServiceAndPriceWrapper from "./ServiceAndPrice";
import InvoiceWrapper from "./InvoiceWrapper";

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
        element: <ServiceAndPriceWrapper />,
      },
      // {
      //   path: "/customerservices",
      //   element: <CustomerServiceAndPrice />,
      // },
      {
        path: "/appointments",
        element: <AppointmentWrapper />,
      },
      {
        path: "/appointments/addappointment",
        element: <CustomerAddAppointment />,
      },
      // {
      //   path: "/customerappointments",
      //   element: <CustomerAppointments />,
      // },
      {
        path: "/invoices",
        element: <InvoiceWrapper />,
      },
      // {
      //   path: "/CustomerInvoices",
      //   element: <CustomerInvoices />,
      // },
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
