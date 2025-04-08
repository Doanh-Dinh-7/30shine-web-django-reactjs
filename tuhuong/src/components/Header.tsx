"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface HeaderProps {
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

export default function Header({ onLoginClick, onRegisterClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <Image src="/static/logo.png" alt="30 SHINE" width={150} height={60} priority />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
          <Link href="#" className="text-gray-500 hover:text-blue-600">
            Đặt lịch hẹn
          </Link>
          <Link href="#" className="text-gray-500 hover:text-blue-600">
            Dịch vụ
          </Link>
          <Link href="#" className="text-gray-500 hover:text-blue-600">
            Về chúng tôi
          </Link>
          <Link href="#" className="text-gray-500 hover:text-blue-600">
            Liên hệ
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={onLoginClick}>
          Đăng nhập
        </Button>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={onRegisterClick}>
          Đăng ký
        </Button>
      </div>
    </header>
  )
}
