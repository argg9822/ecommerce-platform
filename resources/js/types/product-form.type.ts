import useProductForm from '@/hooks/form/useProductForm';
import { ProductImage, ProductVariants, ProductFeatures } from '@/types/product';

export type ProductFormContextType = ReturnType<typeof useProductForm>;

export interface ProductForm {
    name: string;
    description: string;
    features: ProductFeatures[],
    price: number | undefined;
    compare_price: number | undefined;
    profit: number | undefined;
    cost: number | undefined;
    stock: number;
    sku: string;
    barcode: string;
    is_feature: boolean;
    is_available: boolean;
    variants: ProductVariants[];
    show_condition: boolean;
    key_words: string;
    warranty_policy: string;
    condition: string;
    relevance: number;
    brand_id: number | string;
    category_id: number;
    product_images: ProductImage[];
    new_images: File[];
    shipment: number | undefined;
    currency: string;
    disponibility_text: string;
}
