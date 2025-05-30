export interface ProductImage {
    id: number,
    url: string,
    product_id: number,
    created_at: string;
    updated_at: string;
}

export interface ProductFeatures {
    name: string;
    value: string;
}

export interface ProductDimensions {
    length: {
        value: number;
        unit: string;
    };
    height: {
        value: number;
        unit: string;
    };
    weight: {
        value: number;
        unit: string;
    };
    width: {
        value: number;
        unit: string;
    };
}

export interface VariantAttributes {
    id?: number,
    name: string;
    value: string;
}

export interface ColorOptionsType {
    value: string;
    label?: string;
    color?: string;
    selectedColor?: string;
    selected?: boolean;
}

export interface ProductVariants {
    price: number | undefined;
    compare_price: number | undefined;
    stock: number | undefined;
    colors: ColorOptionsType[];
    shipment: number | undefined;
    dimensions: ProductDimensions;
    variant_attributes: VariantAttributes[];
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
    images: ProductImage[],
    category_id: number;
    created_at: string;
    updated_at: string;
}