import { createContext, useContext } from "react"; 
import { OrderFormContextType } from "@/types/order-form.type";

export const OrderFormContext = createContext<OrderFormContextType | null>(null);

export const useOrderFormContext = () => {
    const context = useContext(OrderFormContext);
    if (!context) {
        throw new Error('useOrderFormContext debe ser usado dentro de un OrderFormProvider');
    }
    return context;
}
