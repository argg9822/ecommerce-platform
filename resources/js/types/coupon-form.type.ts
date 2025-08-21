import { useCouponForm } from "@/hooks/form/useCouponForm";

export type CouponFormContextType = ReturnType<typeof useCouponForm>;

export interface Conditions{
    name: string;
    value?: number | number[] | undefined;
}

export interface CouponForm {
    id?: number;
    code: string;
    discount_value: number | undefined;
    expires_at: string | undefined;
    only_first_order: boolean;
    discount_type: 'percentage' | 'fixed' | 'free_shipping' | 'bogo';
    conditions: Conditions[];
    usage_limit: number | undefined;
    usage_per_user: number | undefined;
}