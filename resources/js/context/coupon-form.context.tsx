import { createContext, useContext } from "react"; 
import { CouponFormContextType } from "@/types/coupon-form.type";

export const CouponFormContext = createContext<CouponFormContextType | null>(null);

export const useCouponFormContext = () => {
    const context = useContext(CouponFormContext);
    if (!context) {
        throw new Error('useCouponFormContext debe ser usado dentro de un CouponFormProvider');
    }
    return context;
}



