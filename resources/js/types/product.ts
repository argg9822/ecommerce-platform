export interface ProductImage {
    id: number,
    url: string,
    product_id: number,
    created_at: string;
    updated_at: string;
}

export interface VariantAttributes {
    name: string;
    value: string;
}

export interface ProductVariants {
    price: number;
    compare_prince: number;
    stock: number;
    colors: string[];
    cost_shipping: number;
    dimensions: string;
    variant_attributes: VariantAttributes[];
    weight: number;
    is_available: boolean;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    compare_price: number;
    stock: number;
    sku: number;
    barcode: string;
    is_feature: boolean;
    is_available: boolean;
    variants: ProductVariants[];
    brand: string;
    product_images: ProductImage[],
    category_id: number;
    created_at: string;
    updated_at: string;
}