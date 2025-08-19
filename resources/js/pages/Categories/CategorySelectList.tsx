import Checkbox from "@/components/Checkbox";
import InputLabel from "@/components/InputLabel";
import useCategories from "@/hooks/get/use-categories";
import { motion } from "framer-motion"

type CategorySelectListProps = {
    condition_index: number,
    onChange: (value: number) => void
}

export default function CategorySelectList({ condition_index, onChange }: CategorySelectListProps) {
    const { categories, loadingCategories, error } = useCategories();

    if (loadingCategories) return <p className="text-gray-400">Cargando lista de categorías...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="flex flex-row gap-3 py-2">
                {categories.length > 0 && categories.map((c, i) => (
                    <motion.div
                        key={c.id ?? i}
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
                                    id={`category_${c.id}`}
                                    name={`categories_condition_${condition_index}`}
                                    value={c.id}
                                    className="mt-1 h-5 w-5 rounded-md border-zinc-500 
                                    data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white
                                    dark:data-[state=checked]:border-red-500 dark:data-[state=checked]:bg-red-500"
                                    onChange={(e) => onChange(Number(e))}
                                />
                                <span className="text-sm font-medium text-gray-200">{c.name}</span>
                            </div>
                        </InputLabel>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}