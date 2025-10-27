import { Head, Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import PrimaryButton from "@/components/PrimaryButton";
import CategoryCard from "@/pages/Categories/components/CategoryCard";
import { CategoryContext } from "@/context/category.context";
import useCategories from "@/hooks/use-categories";
import CategoryDetail from "@/pages/Categories/CategoryDetail";
import CategoryCardSkeleton from "@/pages/Categories/components/CategoryCardSkeleton";
import { motion } from "framer-motion";
import CategoryFormDialog from "@/components/form/CategoryFormDialog";

export default function Index() {
    const categoryContext = useCategories({});

    return (
        <AuthenticatedLayout>
            <Head title="Categorías" />

            <CategoryContext.Provider value={categoryContext}>
                <div className="text-gray-100 min-h-screen p-6">
                    <div className="max-w-7xl mx-auto">

                        {/* Encabezado */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">Categorías</h1>
                            <PrimaryButton 
                                className="rounded-xl shadow-lg flex items-center gap-2"
                                onClick={() => {
                                    categoryContext.setSelectedCategory(null)
                                    categoryContext.setOpenDialogCategory(true)
                                }}
                            >
                                <PlusCircle size={18} />
                                Nueva categoría
                            </PrimaryButton>
                        </div>

                        {categoryContext.loadingCategories && (  
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                                {[1, 2, 3].map((index) => (
                                    <CategoryCardSkeleton key={index} />
                                ))}
                            </div>
                        )}

                        {categoryContext.filteredCategories.length > 0 && (
                            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryContext.filteredCategories.map((category) => (
                                        <CategoryCard key={category.id} category={category} />
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {(!categoryContext.loadingCategories && categoryContext.filteredCategories.length === 0) && (
                            <p className="text-center text-sm text-gray-500 mt-8 italic">
                                No hay categorías registradas.
                            </p>
                        )}
                    </div>
                </div>

                {categoryContext.filteredCategories.length > 0 && (
                        <CategoryDetail />
                    )
                }
            </CategoryContext.Provider>

            <CategoryFormDialog isOpen={categoryContext.openDialogCategory} setIsOpen={categoryContext.setOpenDialogCategory} category={categoryContext.selectedCategory} />
        </AuthenticatedLayout>
    );
}