import React from "react";
import ServiceAndPrice from "../../pages/ServiceAndPrice";
import CustomerServiceAndPrice from "../../pages/CustomerServiceAndPrice";

const ServiceAndPriceWrapper = () => {
  const role = localStorage.getItem("role"); // hoặc lấy từ context

  return role === "quan ly" ? <ServiceAndPrice /> : <CustomerServiceAndPrice />;
};

export default ServiceAndPriceWrapper;
