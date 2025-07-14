import useProductForm from '@/hooks/form/useProductForm';
import { ProductImage, ProductVariantsType, ProductFeatures } from '@/types/product';

export type ProductFormContextType = ReturnType<typeof useProductForm>;

export interface ProductForm {
    name: string;
    description: string;
    price: number | undefined;
    compare_price: number | undefined;
    profit: number | undefined;
    discount: number | undefined;
    cost: number | undefined;
    stock: number | undefined;
    sku: string;
    barcode: string;
    is_feature: boolean;
    is_available: boolean;
    variants: ProductVariantsType[];
    show_condition: boolean;
    warranty_policy: string;
    condition: "refurbished" | "new" | "used";
    relevance: number;
    brand_id: number | undefined;
    categories: number[];
    images: ProductImage[];
    shipment: number | undefined;
    currency: string;
    disponibility_text: string;
    meta_title: string;
    meta_description: string;
    key_words: string;
}
