import { Category } from "@/types/category";
import { ProductLite } from "@/types/product";
import { Client } from "@/types/client";
import { City } from "@/types/city";

export interface Conditions{
    id?: number;
    condition_type: string;
    condition_value?: number | number[] | undefined;
    items: {
        conditions?: Conditions[];
        products?: ProductLite[];
        categories?: Category[];
        cities?: City[];
        clients?: Client[];
    }
}

export interface Coupon {
    id?: number;
    code: string;
    description: string;
    discount_type: string;
    discount_value: number;
    expires_at: string;
    usage_limit: number;
    usage_per_user: number;
}