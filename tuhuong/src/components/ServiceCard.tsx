import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceCardProps {
  image: string
  title: string
  buttonText: string
}

export default function ServiceCard({ image, title, buttonText }: ServiceCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <div className="aspect-[4/3] relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <Button className="bg-blue-600 hover:bg-blue-700 w-fit">{buttonText}</Button>
      </div>
    </div>
  )
}
