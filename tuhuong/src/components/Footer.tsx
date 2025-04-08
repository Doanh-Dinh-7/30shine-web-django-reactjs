import Image from "next/image"
import { Button } from "./ui/button"

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 bg-white border-t">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <Image src="/static/logo.png" alt="30 SHINE" width={150} height={60} />
          <p className="text-sm text-gray-500 mt-4">Điểm Tựa Cho Việc Làm Đẹp</p>
          <p className="text-sm text-gray-500">Liệu Trình Đẹp Không Phải Dịch Bệnh - Mà Là Điểm Khởi Đầu</p>
        </div>

        <div className="mt-6 md:mt-0">
          <p className="text-sm text-gray-500 mb-2">Trở thành khách hàng</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Đăng ký ngay</Button>
        </div>
      </div>
    </footer>
  )
}
