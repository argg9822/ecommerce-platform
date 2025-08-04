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
        id?: number,
        value: number;
        unit: string;
    };
    width: {
        id?: number,
        value: number;
        unit: string;
    };
    height: {
        id?: number,
        value: number;
        unit: string;
    };
    weight: {
        id?: number,
        value: number;
        unit: string;
    };
}

export interface VariantAttributes {
    custom: {
        id?: number;
        name: string;
        value: string;
    }[];
    dimensions: ProductDimensions;
    colors: {
        id?: number,
        value: string,
        label?: string,
        color?: string,
        selected: boolean ,
    }[];
}

export interface ProductVariantsType {
    id?: number;
    price: number | undefined;
    currency_price: string | undefined;
    compare_price: number | undefined;
    shipment: number | undefined;
    stock: number | undefined;
    variant_attributes: VariantAttributes;
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
    variants: ProductVariantsType[];
    brand: string;
    images: ProductImage[] | number[];
    category_id: number;
    created_at: string;
    updated_at: string;
}
