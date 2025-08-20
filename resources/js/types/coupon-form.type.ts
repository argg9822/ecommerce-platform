import { useCouponForm } from "@/hooks/form/useCouponForm";

export type CouponFormContextType = ReturnType<typeof useCouponForm>;

export interface Conditions{
    name: string;
    value?: number | number[] | undefined;
}

export interface CouponForm {
    id?: number;
    code: string;
    amount: number | undefined;
    type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo' | 'client';
    conditions: Conditions[];
    usage_limit: number | undefined;
    usage_per_user: number | undefined;
}