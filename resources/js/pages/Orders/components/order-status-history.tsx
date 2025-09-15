import { Calendar, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StatusHistory } from "@/types/order"
import { useOrders } from "@/hooks/use-orders"

export default function OrderStatusHistory({ history }: { history: StatusHistory[] }) {
    const statusColors = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-600/20 text-green-400 border-green-600/40"
            case "pending":
                return "bg-yellow-600/20 text-yellow-400 border-yellow-600/40"
            case "rejected":
            case "cancelled":
                return "bg-red-600/20 text-red-400 border-red-600/40"
            case "in_process":
                return "bg-blue-600/20 text-blue-400 border-blue-600/40"
            default:
                return "bg-gray-600/20 text-gray-400 border-gray-600/40"
        }
    }

    const {
        getOrderStatusInfo
    } = useOrders();

    return (
        <div className="p-5 rounded-xl bg-gray-950 mt-4">
            <div className="flex items-center gap-2 mb-4 text-blue-100 font-semibold">
                <Calendar className="w-4 h-4" /> Historial de cambios
            </div>

            {/* Línea de historial */}
            {history.length > 0 ? (
                <ul className="space-y-4">
                    {history.map((h) => {
                        const { bg: oldBg, text: oldText} = getOrderStatusInfo(h.old_status);
                        const { bg: newBg, text: newText} = getOrderStatusInfo(h.new_status);
                        return (
                            h.changed_by.name && (
                                <li key={h.id} className="flex items-start gap-3 border-l border-zinc-700 pl-4 relative">
                                    <span className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-blue-500 shadow-md"></span>

                                    <div className="flex flex-col gap-1 w-full">
                                        {/* Cambio de estado */}
                                        <div className="flex items-center gap-2 text-sm">
                                            <Badge
                                                variant="outline"
                                                className={`text-xs px-2 py-0.5 rounded-full border border-gray-800 ${oldBg} ${oldText}`}
                                            >
                                                {oldText}
                                            </Badge>
                                            <ArrowRight className="w-4 h-4 text-gray-500" />
                                            <Badge
                                                variant="outline"
                                                className={`text-xs px-2 py-0.5 rounded-full border border-gray-800 ${newBg} ${newText}`}
                                            >
                                                {newText}
                                            </Badge>
                                        </div>

                                        {/* Usuario */}
                                        <p className="text-xs text-gray-300">
                                            👤 {h.changed_by.name} <span className="text-gray-500">({h.changed_by.role})</span>
                                        </p>

                                        {/* Fecha */}
                                        <p className="text-xs text-gray-500">
                                            {new Date(h.created_at).toLocaleString("es-CO", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </p>
                                    </div>
                                </li>
                            )
                        )
                    })}
                </ul>
            ) : (
                <p className="text-sm text-gray-500 italic">No hay cambios registrados.</p>
            )}
        </div>
    )
}