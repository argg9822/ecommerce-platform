import { Phone } from "lucide-react"

interface Props {
  phone: string
  message?: string
}

export function SendWhatsapp({ phone, message = "Hola, te escribo desde la plataforma" }: Props) {
  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
        onClick={handleClick}
        className="flex items-center gap-1 mt-1 text-green-700 hover:text-green-800 font-medium text-sm"
    >
        <Phone className="w-3 h-3" />
        <span>Contactar vía WhatsApp</span>
    </button>
)
}
