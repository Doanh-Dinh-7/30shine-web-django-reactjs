// src/components/Layout/Layout.jsx
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [appointments, setAppointments] = useState([
    {
      MaLH: "LH001",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-22",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaLH: "LH002",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-25",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaLH: "LH003",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-28",
      GioKhachDen: "10:30",
      LoaiDV: "Combo cắt gội",
      TrangThai: "Đã hoàn thành",
    }
  ]);

  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      <Flex>
        <Navbar />
      </Flex>
      <Box flex="1" overflow="auto" p={4}>
        <Outlet context={{ appointments, setAppointments }} />
      </Box>
    </Flex>
  );
};

export default Layout;
