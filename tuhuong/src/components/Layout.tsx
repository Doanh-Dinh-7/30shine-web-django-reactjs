import type { ReactNode } from "react"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

export default function Layout({
  children,
  title = "30 SHINE - Đặt lịch cắt tóc nam chuyên nghiệp",
  description = "Cắt tóc nam chuyên nghiệp, uốn nhuộm thiết kế, chăm sóc da và nhiều dịch vụ khác",
  onLoginClick,
  onRegisterClick,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
