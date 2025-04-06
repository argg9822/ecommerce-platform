export interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[],
    createdAt: string | Date;
}