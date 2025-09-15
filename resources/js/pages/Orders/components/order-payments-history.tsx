import {Badge} from "@/components/ui/badge";
import { Wallet } from "lucide-react";

interface Payment {
    id: number;
    amount: number;
    payment_method: string;
    status: string;
    created_at: string;
}

export default function OrderPaymentsHistory({ payments }: { payments: Payment[] }) {
    const statusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-600/20 text-green-400 border-green-600/40"
            case "pending":
                return "bg-yellow-600/20 text-yellow-400 border-yellow-600/40"
            case "rejected":
            case "cancelled":
                return "bg-red-600/20 text-red-400 border-red-600/40"
            case "refunded":
                return "bg-blue-600/20 text-blue-400 border-blue-600/40"
            default:
                return "bg-gray-600/20 text-gray-400 border-gray-600/40"
        }
    }

    const spanishPaymentMethods: { [key: string]: string } = {
        card: "Tarjeta de crédito",
        cash: "Efectivo",
        transfer: "Transferencia",
        paypal: "PayPal",
        other: "Otro",
    }

    const spanishStatusPayment: { [key: string]: string } = {
        pending: "Pendiente",
        approved: "Aprobado",
        cancelled: "Cancelado",
        refunded: "Reembolsado",
        in_process: "En proceso",
        rejected: "Rechazado",
        charged_back: "Contracargo",
    }

    return (
        <div className="p-5 rounded-xl bg-gray-950 mt-4">
            <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                <Wallet className="w-4 h-4" /> Historial de pagos
            </div>

            {payments.length > 0 ? (
                <ul className="space-y-3">
                    {payments.map((payment) => (
                        <li
                            key={payment.id}
                            className="flex justify-between items-center rounded-lg bg-zinc-900/40 px-4 py-3 hover:bg-zinc-900/70 transition-colors"
                        >
                            {/* Lado izquierdo: método y fecha */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-200 capitalize">
                                    {spanishPaymentMethods[payment.payment_method] || payment.payment_method}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(payment.created_at).toLocaleString("es-CO", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </span>
                            </div>
                            
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-base font-semibold text-gray-100">
                                    ${Number(payment.amount).toLocaleString()}
                                </span>
                                <Badge 
                                    variant='outline'
                                    className={`text-xs px-2 py-0.5 rounded-full border ${statusColor(payment.status)}`} 
                                >{spanishStatusPayment[payment.status]}</Badge>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 italic mt-2">
                    No hay pagos registrados.
                </p>
            )}
        </div>
    )
}