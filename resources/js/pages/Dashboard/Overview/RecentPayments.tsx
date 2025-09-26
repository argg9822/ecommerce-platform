import axios from "axios";
import { useEffect, useState } from "react";

interface OrderPayment {
    id: number;
    amount: string;
    payment_method: string;
    preference_id: string | null;
    transaction_id: string;
    status: string;
    order_id: string;
    currency_id: string | null;
    operation_type: string;
    approved_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    order: {
        id: string;
        total: string;
        status: string;
    };
}

export default function RecentPayments() {
    const [recentPayments, setRecentPayments] = useState<OrderPayment[]>([]);
    const spanishStatusPayment: { [key: string]: string } = {
        pending: "Pendiente",
        approved: "Aprobado",
        cancelled: "Cancelado",
        refunded: "Reembolsado",
        in_process: "En proceso",
        rejected: "Rechazado",
        charged_back: "Contracargo",
    }

    useEffect(() => {
        const fetchPayments = async () => {
            const response = await axios.get(route('dashboard_payments'));
            setRecentPayments(response.data.payments);
        };
        fetchPayments();
    }, []);

    return (
        <div className="dashboard__card dashboard__payments bg-gray-950">
            <div className='dashboard__header'>
                <h3 className='dashboard__title'>Pagos recientes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="py-2 text-left">Método</th>
                            <th className="py-2 text-left">Operación</th>
                            <th className="py-2 text-left">Fecha</th>
                            <th className="py-2 text-right">Monto</th>
                            <th className="py-2 text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPayments.map((p) => (
                            <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-900/40 transition">
                                <td className="py-2 capitalize">{p.payment_method === 'cash' ? 'Efectivo' : p.payment_method}</td>
                                <td className="py-2 capitalize">{p.operation_type}</td>
                                <td className="py-2">{new Date(p.approved_at).toLocaleDateString()}</td>
                                <td className="py-2 text-right font-semibold text-green-400">
                                    ${Number(p.amount).toLocaleString()}
                                </td>
                                <td className="py-2 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full font-medium
                                            ${p.status === "approved"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                            }`}
                                    >
                                        {spanishStatusPayment[p.status]}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}