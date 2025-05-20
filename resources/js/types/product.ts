export interface ProductImage {
    id: number,
    url: string,
    product_id: number,
    created_at: string;
    updated_at: string;
}

export interface ProductDimensions {
    length: number;
    width: number;
    height: number;
    unitOfMeasurement: string;
}

export interface VariantAttributes {
    name: string;
    value: string;
}

export interface ProductVariants {
    price: number | undefined;
    compare_prince: number | undefined;
    stock: number | undefined;
    colors: string[];
    cost_shipping: number | undefined;
    dimensions: ProductDimensions;
    attributes: VariantAttributes[];
    weight: number | undefined;
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