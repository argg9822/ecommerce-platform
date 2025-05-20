import useProductForm from '@/hooks/form/useProductForm';
import { ProductImage, ProductVariants } from '@/types/product';

export type ProductFormContextType = ReturnType<typeof useProductForm>;

export interface ProductForm {
    name: string;
    description: string;
    price: number | undefined;
    compare_price: number | undefined;
    profit: number | undefined;
    cost: number | undefined;
    stock: number;
    sku: string;
    barcode: string;
    is_feature: boolean;
    is_available_product: boolean;
    variants: ProductVariants[];
    is_available_variant: boolean;
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
}

// export type ProductFormContextType = {
//     storeProduct: ReturnType<typeof useProductForm>['storeProduct'],
//     data: ReturnType<typeof useProductForm>['data'],
//     setData: ReturnType<typeof useProductForm>['setData'],
//     handleNumberChangeInput: ReturnType<typeof useProductForm>['handleNumberChangeInput'],
//     handleNumberChangeSelect: ReturnType<typeof useProductForm>['handleNumberChangeSelect'],    
//     errors: ReturnType<typeof useProductForm>['errors'],
//     processing: ReturnType<typeof useProductForm>['processing'],
//     recentlySuccessful: ReturnType<typeof useProductForm>['recentlySuccessful'],
// }