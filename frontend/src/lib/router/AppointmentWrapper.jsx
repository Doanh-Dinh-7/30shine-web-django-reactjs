import React from "react";
import Appointments from "../../pages/Appointments";
import CustomerAppointments from "../../pages/CustomerAppointments";
import CustomerAddAppointment from "../components/Appointments/CustomerAddAppointment";

const AppointmentWrapper = () => {
  const role = localStorage.getItem("role"); // hoặc lấy từ context

  return role === "quan ly" ? (
    <Appointments />
  ) : role === "khach hang" ? (
    <CustomerAppointments />
  ) : (
    <CustomerAddAppointment />
  );
};

export default AppointmentWrapper;
