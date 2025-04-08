"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"
import { User } from "lucide-react"

interface LoginModalProps {
  onClose: () => void
  onRegisterClick: () => void
  onForgotPasswordClick: () => void
}

export default function LoginModal({ onClose, onRegisterClick, onForgotPasswordClick }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-blue-700">Chào mừng bạn đến với 30Shine</h2>
        </div>

        <h3 className="text-xl font-bold text-center mb-4">ĐĂNG NHẬP</h3>

        <div className="space-y-4">
          <div className="relative">
            <Input type="text" placeholder="Nhập số điện thoại" className="pl-8" />
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Mật khẩu" className="pr-10" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          <div className="text-right">
            <button onClick={onForgotPasswordClick} className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </button>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Đăng Nhập</Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Tôi muốn{" "}
              <button onClick={onRegisterClick} className="text-blue-600 hover:underline">
                Đăng ký
              </button>
            </p>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  )
}
