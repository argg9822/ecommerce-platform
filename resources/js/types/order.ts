interface UserOrder {
    email: string;
    name: string;
}

export interface UserHistory {
    name: string;
    email: string;
    role: string;
}

interface DeliveryInfo {
    address: string;
    apartment: string;
    province: string;
    phone: string;
    postalCode: string;
    deliveryType: string;
}
interface Product {
    id: number;
    name: string;
    price: number;
    sku: string;
}

interface Item {
    id: number; 
    product_id: number;
    products: Product[];
    quantity: number;
    unit_price: number; 
    order_id: string;
}

interface Payment {
    id: number;
    amount: number;
    payment_method: string;
    status: string;
    created_at: string;
}

export interface StatusHistory {
    id: string;
    old_status: string;
    new_status: string;
    changed_by: UserHistory;
    created_at: string;
}

export interface Order {
    id: string;
    total: number;
    status: string;
    user: UserOrder;
    notes: string;
    items?: Item[];
    shipping_city: string;
    delivery_info: DeliveryInfo;
    payment_id: string;
    payments: Payment[];
    payment_type: string;
    payment_method?: string;
    operation_type?: string;
    created_at: Date;
    updated_at: Date;
    status_history?: StatusHistory[];
}