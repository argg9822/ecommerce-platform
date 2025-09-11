import { useOrderForm } from "@/hooks/form/useOrderForm";

export type OrderFormContextType = ReturnType<typeof useOrderForm>;

export interface OrderForm {
    id: string;
    preference_id: string;
    user_id: number | undefined;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled' | undefined;
    total: number | undefined;
    notes: string | undefined;
    shipping_city: string | undefined;
    shipping_address: string | undefined;
    payment_type: 'mercado_pago' | 'contraentrega';
    delivery_info: string | undefined;
}