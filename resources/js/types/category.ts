import useCategories from "@/hooks/use-categories";
import { Product } from "@/types/product";

export type CategoryContextType = ReturnType<typeof useCategories>;
export interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    parent_id?: number | null;
    created_at?: string;
    updated_at?: string;
    products?: Product[];
    children?: Category[];
    slug?: string | null;
    parent: Category[]
}
