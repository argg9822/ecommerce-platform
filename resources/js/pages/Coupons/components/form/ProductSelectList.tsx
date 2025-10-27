import useProducts from "@/hooks/use-products";
import { Conditions } from "@/types/coupon-form.type";
import { CheckboxList } from "@/pages/Coupons/components/form/checkbox-list";

type ProductSelectListProps = {
    condition_index: number
    onChange: (value: string | number, field: keyof Conditions, index: number) => void
}

export default function ProductSelectList({ condition_index, onChange }: ProductSelectListProps) {
    const { products, loadingProducts, error } = useProducts();

    if (loadingProducts) return <p className="text-gray-400">Cargando lista de productos...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <CheckboxList
            items={products}
            onChange={onChange}
            condition_index={condition_index}
        />
    );
}