import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";
import { FolderTree, Package, ChevronRight, Eye, Edit } from "lucide-react";
import { useCategoryContext } from "@/context/category.context";

export default function CategoryCard({ category }: { category: Category }) {
    const hasChildren = category.children && category.children.length > 0;
    const hasProducts = category.products && category.products.length > 0;

    const {
        setSelectedCategory,
        setIsDetailOpen,
        setOpenDialogCategory,
    } = useCategoryContext();

    return (
        <div className={`group relative rounded-xl border border-gray-800 bg-gray-900/60 hover:bg-gray-900/90 
                        backdrop-blur-md transition-all duration-300 p-4 pb-[4rem] shadow-md hover:shadow-lg`}
        >
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition" />
                    <h2 className="text-lg font-semibold mb-0 capitalize">{category.name}</h2>
                </div>
                <span className="text-xs text-gray-500">
                    {hasProducts ? `${category.products?.length} productos` : "Sin productos"}
                </span>
            </div>

            {/* Productos */}
            {hasProducts && (
                <ul className="space-y-1 mb-3">
                    {category.products?.slice(0, 3).map((product: Product) => (
                        <li
                            key={product.id}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-gray-100 transition"
                        >
                            <Package size={14} className="text-gray-500" />
                            <span className="truncate">{product.name}</span>
                        </li>
                    ))}
                    {category.products && category.products.length > 3 && (
                        <li className="text-xs text-gray-500 italic mt-1">
                            + {category.products.length - 3} más
                        </li>
                    )}
                </ul>
            )}

            {/* Subcategorías */}
            {hasChildren && (
                <div className="mt-4 border-l border-gray-800 pl-4 space-y-3">
                    {category.children?.map((child) => (
                        <div key={child.id} className="flex items-start gap-2">
                            <ChevronRight size={14} className="text-gray-600 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-300 capitalize">
                                    {child.name}
                                </h3>
                                {child.products && child.products.length > 0 ? (
                                    <ul className="space-y-0.5">
                                        {child.products.slice(0, 2).map((p) => (
                                            <li
                                                key={p.id}
                                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
                                            >
                                                <Package size={12} className="text-gray-600" />
                                                <span>{p.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs text-gray-600 italic">Sin productos</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between w-full border-t border-gray-700 right-0 absolute bottom-0 px-4 py-2">
                <Button
                    onClick={() => {
                        setIsDetailOpen(true)
                        setSelectedCategory(category)
                    }}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                    title="Ver detalles"
                >
                    <Eye size={18} />
                </Button>

                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            setOpenDialogCategory(true)
                            setSelectedCategory(category)
                        }}
                        className="text-gray-400 hover:text-amber-400 transition-colors"
                        title="Editar"
                    >
                        <Edit size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}