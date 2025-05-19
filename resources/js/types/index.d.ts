export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    features: object;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    parent: Category[]
}

export interface Brand {
    id: number;
    name: string;
}

export interface Tenant {
    id: number;
    name: string;
    domain: string;
    logo: string;
    plan_id: number;
    plan?: Plan | null;
    is_active: boolean;
    data: object;
    api_token: string;
    created_at: string;
    updated_at: string;
    owner?: User | null;
    config: {
        currency: string,
        language: string,
        timezone: string,
        store_email: string
    }
}

interface FlashMessage  {
    title?: string;
    message?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    tenant?: Tenant,
    flash?: {
        success?: FlashMessage,
        error?: FlashMessage
    }
};
