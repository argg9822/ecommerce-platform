import useCategories from "@/hooks/use-categories";
import { Conditions } from "@/types/coupon-form.type";
import { CheckboxList } from "@/pages/Coupons/components/form/checkbox-list";

type CategorySelectListProps = {
    condition_index: number,
    onChange: (value: string | number, field: keyof Conditions, index: number) => void
}

export default function CategorySelectList({ condition_index, onChange }: CategorySelectListProps) {
    const { loadingCategories, error, filteredCategories } = useCategories({});
    
    if (loadingCategories) return <p className="text-gray-400">Cargando lista de categorías...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <CheckboxList
            items={filteredCategories}
            onChange={onChange}
            condition_index={condition_index}
        />
    );
}