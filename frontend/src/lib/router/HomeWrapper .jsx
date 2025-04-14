import React from "react";
import Dashboard from "../../pages/Dashboard"; // import đúng path bạn có
import Home from "../../pages/Home";

const HomeWrapper = () => {
  const role = localStorage.getItem("role"); // hoặc lấy từ context

  return role === "quan ly" ? <Dashboard /> : <Home />;
};

export default HomeWrapper;