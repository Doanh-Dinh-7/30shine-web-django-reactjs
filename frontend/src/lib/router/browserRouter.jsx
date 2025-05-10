import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../pages/Error";
import Employees from "../../pages/Employees";
import Layout from "../../lib/components/Layout/Layout";
import EmployeeScheduleGeneral from "../components/Employees/EmployeeScheduleGeneral";
import Rating from "../../pages/Rating";
import Customers from "../../pages/Customers";
import HomeWrapper from "./HomeWrapper ";
import CustomerAddAppointment from "../components/Appointments/CustomerAddAppointment";
import AppointmentWrapper from "./AppointmentWrapper";
import ServiceAndPriceWrapper from "./ServiceAndPrice";
import InvoiceWrapper from "./InvoiceWrapper";
import UserProfile from "../../pages/UserProfile";
import EmployeeSchedule from "../components/Employees/EmployeeSchedule";

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
        element: <EmployeeScheduleGeneral />,
      },
      {
        path: "/employees/:maNV",
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
      {
        path: "/profile",
        element: <UserProfile />,
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
