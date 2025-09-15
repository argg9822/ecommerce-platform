import dayjs from 'dayjs';
import { Order } from "@/types/order";
import {
    Clock,
    CheckCircle,
    Package,
    Truck,
    MapPin,
    CheckCheck,
    XCircle,
    RotateCcw,
    AlertTriangle,
    IdCardIcon,
    HouseIcon
} from "lucide-react";
import { ElementType, useState } from "react";

interface FormatDateFn {
    (date: string | number | Date | dayjs.Dayjs): string;
}

type StatusInfo = {
    bg: string;
    text: string;
    icon: ElementType;
};

export function useOrders(orders?: Order[]) {
    // Filtro estado
    const [orderFilterStatus, setOrderFilterStatus] = useState('all');
    const [filteredOrders, setFilteredOrder] = useState<Order[]>(orders ?? []);

    // Filtro fecha inicio
    const [openDatepickerInit, setOpenDatepickerInit] = useState(false);
    const [dateFilterInitDate, setDateFilterInitDate] = useState<Date | undefined>(undefined);

    const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

    const getOrderStatusInfo = (status: string): StatusInfo => {
        switch (status) {
            case "pending":
                return {
                    bg: "bg-yellow-900/30 text-yellow-400",
                    text: "Esperando pago",
                    icon: Clock,
                };
            case "paid":
                return {
                    bg: "bg-blue-900/30 text-blue-400",
                    text: "Pago confirmado",
                    icon: CheckCircle,
                };
            case "processing":
                return {
                    bg: "bg-purple-900/30 text-purple-400",
                    text: "Procesando pedido",
                    icon: Package,
                };
            case "ready_to_ship":
                return {
                    bg: "bg-indigo-900/30 text-indigo-400",
                    text: "Listo para enviar",
                    icon: Package,
                };
            case "shipped":
                return {
                    bg: "bg-blue-900/30 text-blue-400",
                    text: "Pedido enviado",
                    icon: Truck,
                };
            case "out_for_delivery":
                return {
                    bg: "bg-orange-900/30 text-orange-400",
                    text: "En reparto",
                    icon: MapPin,
                };
            case "delivered":
                return {
                    bg: "text-green-400",
                    text: "Entregado",
                    icon: CheckCheck,
                };
            case "cancelled":
                return {
                    bg: "text-red-300",
                    text: "Cancelado",
                    icon: XCircle,
                };
            case "refunded":
                return {
                    bg: "bg-teal-900/30 text-teal-400",
                    text: "Reembolsado",
                    icon: RotateCcw,
                };
            case "failed":
                return {
                    bg: "bg-red-900/30 text-red-400",
                    text: "Pago fallido",
                    icon: AlertTriangle,
                };
            default:
                return {
                    bg: "bg-gray-900/30 text-gray-400",
                    text: "Estado desconocido",
                    icon: AlertTriangle,
                };
        }
    };

    const getPaymentTypeInfo = (type: string): { paymentText: string, PaymentIcon: typeof IdCardIcon } => {
        switch (type) {
            case 'mercado_pago':
                return { paymentText: 'Mercado pago', PaymentIcon: IdCardIcon };
            case 'contra_entrega':
                return { paymentText: 'Contraentrega', PaymentIcon: HouseIcon };
            default:
                return { paymentText: 'Desconocido', PaymentIcon: IdCardIcon };
        }
    };

    const filterOrders = () => {
        if (orderFilterStatus === 'all') {
            setFilteredOrder((orders ?? []));
        } else {
            setFilteredOrder((orders ?? []).filter(o => o.status === orderFilterStatus));
        }
        setIsOpenSheet(false);
    }

    const formatDate: FormatDateFn = (date) => {
        return dayjs(date)
            .locale('es')
            .format('dddd D [de] MMMM [de] YYYY');
    }

    return {
        orderFilterStatus,
        setOrderFilterStatus,
        filteredOrders,
        setFilteredOrder,
        filterOrders,
        isOpenSheet,
        setIsOpenSheet,
        getOrderStatusInfo,
        getPaymentTypeInfo,
        openDatepickerInit,
        setOpenDatepickerInit,
        dateFilterInitDate,
        setDateFilterInitDate,
        formatDate,
    }
}