"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, ChevronDown, User } from "lucide-react"
import ServiceCard from "../components/ServiceCard"
import Layout from "../components/Layout"
import LoginModal from "../components/auth/LoginModal"
import RegisterModal from "../components/auth/RegisterModal"
import ForgotPasswordModal from "../components/auth/ForgotPasswordModal"

// Bỏ import ThemeProvider vì chúng ta đã xử lý trong _app.tsx

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)

  const openLoginModal = () => {
    setShowLoginModal(true)
    setShowRegisterModal(false)
    setShowForgotPasswordModal(false)
  }

  const openRegisterModal = () => {
    setShowRegisterModal(true)
    setShowLoginModal(false)
    setShowForgotPasswordModal(false)
  }

  const openForgotPasswordModal = () => {
    setShowForgotPasswordModal(true)
    setShowLoginModal(false)
    setShowRegisterModal(false)
  }

  const closeAllModals = () => {
    setShowLoginModal(false)
    setShowRegisterModal(false)
    setShowForgotPasswordModal(false)
  }

  return (
    <Layout onLoginClick={openLoginModal} onRegisterClick={openRegisterModal}>
      {/* Hero Section */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900">Đặt lịch giữ chỗ chỉ 30s</h1>
            <p className="text-gray-600">Cắt xong trả tiền, hủy lịch không sao</p>

            <div className="flex max-w-md">
              <Input
                placeholder="Nhập số điện thoại"
                className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">ĐẶT LỊCH NGAY</Button>
            </div>

            <div className="flex space-x-12 pt-4">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image src="/static/icons/store.png" alt="Stores" width={24} height={24} />
                </div>
                <div className="font-bold text-navy-900">2500</div>
                <div className="text-sm text-gray-500">salons</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image src="/static/icons/customer.png" alt="Customers" width={24} height={24} />
                </div>
                <div className="font-bold text-navy-900">200</div>
                <div className="text-sm text-gray-500">khách/ngày</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Image src="/static/icons/location.png" alt="Cities" width={24} height={24} />
                </div>
                <div className="font-bold text-navy-900">20</div>
                <div className="text-sm text-gray-500">cities</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-blue-700 text-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">UỐN NHUỘM THIẾT KẾ</h2>
              <h3 className="text-xl font-bold mb-4">
                PHỤC HỒI CHUYÊN SÂU
                <br />
                LIPID BOND 2025
              </h3>

              <div className="text-lg font-bold mt-4">3IN1</div>
              <p className="text-sm mt-2">
                KẾT HỢP 3 CÔNG NGHỆ ĐỘT PHÁ GIÚP TÓC CHẮC KHỎE VÀ CHĂM SÓC SÁNG BÓNG MỀM MƯỢT ĐỒNG THỜI TẠO LỚC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-6 md:px-12 lg:px-20 bg-gray-100">
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 flex items-center border rounded-md px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-500">Kiếm tìm tên tiệm</span>
          </div>

          <div className="flex-1 flex items-center border rounded-md px-4 py-2">
            <span className="text-gray-500">Dịch vụ</span>
            <ChevronDown className="w-5 h-5 text-gray-400 ml-auto" />
          </div>

          <div className="flex-1 flex items-center border rounded-md px-4 py-2">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-gray-500">Chọn nhân viên</span>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 px-6">Tìm kiếm</Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
        <h2 className="text-2xl font-bold mb-8 text-navy-900">DỊCH VỤ NỔI BẬT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            image="/static/services/haircut.jpg"
            title="Cắt tóc nam chuyên nghiệp"
            buttonText="Tìm hiểu thêm"
          />
          <ServiceCard image="/static/services/facial.jpg" title="Cạo mặt & chăm sóc da" buttonText="Tìm hiểu thêm" />
          <ServiceCard image="/static/services/styling.jpg" title="Tạo kiểu tóc đẹp" buttonText="Tìm hiểu thêm" />
          <ServiceCard
            image="/static/services/undercut.jpg"
            title="Cắt tóc kiểu undercut quiff"
            buttonText="Tìm hiểu thêm"
          />
          <ServiceCard image="/static/services/coloring.jpg" title="Nhuộm tóc đổi màu" buttonText="Tìm hiểu thêm" />
        </div>
      </section>

      {/* Authentication Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={closeAllModals}
          onRegisterClick={openRegisterModal}
          onForgotPasswordClick={openForgotPasswordModal}
        />
      )}

      {showRegisterModal && <RegisterModal onClose={closeAllModals} onLoginClick={openLoginModal} />}

      {showForgotPasswordModal && <ForgotPasswordModal onClose={closeAllModals} onLoginClick={openLoginModal} />}
    </Layout>
  )
}
