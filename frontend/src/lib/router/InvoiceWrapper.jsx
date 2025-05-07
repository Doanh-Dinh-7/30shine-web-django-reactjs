import React from "react";
import Invoices from "../../pages/Invoices";
import CustomerInvoices from "../../pages/CustomerInvoices";

const InvoiceWrapper = () => {
  const role = localStorage.getItem("role"); // hoặc lấy từ context

  return role === "quan ly" ? <Invoices /> : <CustomerInvoices />;
};

export default InvoiceWrapper;
