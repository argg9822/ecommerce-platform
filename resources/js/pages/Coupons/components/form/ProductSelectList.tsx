import Checkbox from "@/components/Checkbox";
import InputLabel from "@/components/InputLabel";
import { useCouponFormContext } from "@/context/coupon-form.context";
import useProducts from "@/hooks/get/use-products";
import { Conditions } from "@/types/coupon-form.type";
import { motion } from "framer-motion"

type ProductSelectListProps = {
    condition_index: number
    onChange: (value: string | number, field: keyof Conditions, index: number) => void 
}

export default function ProductSelectList({ condition_index, onChange }: ProductSelectListProps) {
    const { products, loadingProducts, error } = useProducts();

    if (loadingProducts) return <p className="text-gray-400">Cargando lista de productos...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const productNameToLower = (productName: string) => {
        if (!productName) return "";

        const firstLetter = productName[0].toUpperCase();
        const rest = productName.slice(1).toLowerCase();

        return firstLetter + rest;
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-row gap-3 py-2">
                {products && products.length > 0 && products.map((p, i) => (
                    <motion.div
                        key={p.id ?? i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="transition-all"
                    >
                        <InputLabel
                            className="flex items-start gap-3 cursor-pointer rounded-xl bg-zinc-800/40 py-1 px-3 shadow-xl
                            hover:bg-zinc-800/70 
                            has-[[aria-checked=true]]:border-red-500/80 
                            has-[[aria-checked=true]]:bg-red-500/10
                            dark:has-[[aria-checked=true]]:border-red-600 
                            dark:has-[[aria-checked=true]]:bg-red-900/20"
                        >
                            <div className="flex flex-row items-center gap-2">
                                <Checkbox
                                    id={`category_${p.id}`}
                                    name={`categories_condition_${condition_index}`}
                                    value={p.id}
                                    className="mt-1 h-5 w-5 rounded-md border-zinc-500 
                                    data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white
                                    dark:data-[state=checked]:border-red-500 dark:data-[state=checked]:bg-red-500"
                                    onChange={(e) => onChange(Number(e.target.value), 'value', condition_index)}
                                />
                                <span className="text-sm font-medium text-gray-200">{productNameToLower(p.name)}</span>
                            </div>
                        </InputLabel>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}