export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string;
}

export interface Tenant {
    id: number;
    name: string;
    domain: string;
    logo: string;
    plan_id: number;
    is_active: boolean;
    data: object;
    api_token: string;
    created_at: string;
    updated_at: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    features: object;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
