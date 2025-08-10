interface UserOrder {
    email: string;
    name: string;
}

interface DeliveryInfo {
    address: string;
    apartment: string;
    province: string;
    phone: string;
    postalCode: string;
    deliveryType: string;
}

interface Item {
    id: number, 
    product_id: number, 
    quantity: number, 
    unit_price: number, 
    order_id: string
}

export interface Order {
    id: string;
    total: number;
    status: string;
    user: UserOrder;
    notes: string;
    items?: Item[];
    shipping_city: string,
    delivery_info: DeliveryInfo,
    payment_id: string,
    created_at: Date,
    updated_at: Date,
}