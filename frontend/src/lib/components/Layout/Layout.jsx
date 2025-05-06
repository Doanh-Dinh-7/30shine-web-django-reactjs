import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import Navbar from "./Navbar";

const sectionIds = ["hero", "booking", "services", "about", "contact"];

const Layout = () => {
  const [activeSection, setActiveSection] = useState("hero"); // default is hero
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const containerRef = React.useRef();

  //  Kiểm tra xem section nào đang ở trong khung nhìn. Cập nhật activeSection tương ứng
  useEffect(() => {
    const handleScroll = () => {
      // const scrollPosition = window.scrollY;
      const section = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > 0; // Check if the section is in view
      });
      if (section) setActiveSection(section);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll tới section và set active
  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    if (id === "register") setRegisterOpen(true);
  };

  // Hàm mở modal đăng ký
  const handleOpenRegister = () => setRegisterOpen(true);
  const handleCloseRegister = () => setRegisterOpen(false);

  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      <Flex>
        <Navbar
          onScroll={scrollToSection}
          activeSection={activeSection}
          onOpenRegister={handleOpenRegister}
        />
      </Flex>
      <Box flex="1" overflow="auto" p={4} ref={containerRef}>
        <Outlet
          context={{
            onOpenRegister: handleOpenRegister,
            isRegisterOpen,
            onCloseRegister: handleCloseRegister,
            containerRef,
          }}
        />
      </Box>
    </Flex>
  );
};

export default Layout;
