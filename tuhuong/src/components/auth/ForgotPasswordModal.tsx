"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"

interface ForgotPasswordModalProps {
  onClose: () => void
  onLoginClick: () => void
}

export default function ForgotPasswordModal({ onClose, onLoginClick }: ForgotPasswordModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold text-center text-blue-700 mb-6">Quên mật khẩu?</h2>

        <div className="space-y-4">
          <div className="relative">
            <Input type="email" placeholder="Nhập email" className="pl-8" />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
          </div>

          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu mới" className="pr-10" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          <div className="relative">
            <Input type={showConfirmPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" className="pr-10" />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Tiếp tục</Button>

          <div className="text-center">
            <button onClick={onLoginClick} className="text-sm text-blue-600 hover:underline">
              Quay lại đăng nhập
            </button>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  )
}
