export interface PaymentForm {
    order_id: string;
    amount: number;
    status: string;
    payment_method?: string;
    operation_type?: string;
}