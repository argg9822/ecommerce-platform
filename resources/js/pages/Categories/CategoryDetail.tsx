import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Package, User, ShoppingBag, BarChart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area";
import {useCategoryContext} from "@/context/category.context";
import SalesBarChart from "@/pages/Categories/components/SalesBarChart";
import BarChartSkeleton from "@/components/skeleton/BarChartSkeleton";

export default function CategoryDetail() {
    const { 
        selectedCategory,        
        isDetailOpen,
        setIsDetailOpen,
        categorySales,
        loadingSales
    } = useCategoryContext();

    return (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>

            <DialogContent className="sm:max-w-4xl h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        {selectedCategory?.name}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedCategory?.description}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                    <ShoppingBag className="w-4 h-4" /> Productos
                                </div>

                                <ul className="space-y-2 p-4 rounded-lg bg-gray-950">
                                    {(selectedCategory?.products && selectedCategory.products.length > 0) && selectedCategory.products?.map((product) => (
                                        <li key={product.id} className="flex justify-between text-sm border-b border-gray-800 pb-1">
                                            <>
                                                <span className="font-medium">{product.name}</span>
                                                <span>${Number(product.price).toLocaleString()}</span>
                                            </>
                                        </li>
                                    ))}

                                    {(selectedCategory?.products && selectedCategory.products.length === 0) && (
                                        <p className="text-sm text-gray-500 italic">
                                            No hay productos en esta categoría.
                                        </p>
                                    )}
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                    <BarChart className="w-4 h-4" /> Ventas
                                </div>
                            
                                <div className="p-4 rounded-lg bg-gray-950">
                                    {categorySales.length > 0 && !loadingSales && (
                                        <SalesBarChart data={categorySales} />
                                    )}

                                    {loadingSales && (
                                        <BarChartSkeleton />
                                    )}

                                    {categorySales.length === 0 && !loadingSales && (
                                        <p className="text-sm text-gray-500 italic text-center">
                                            No hay datos de ventas para esta categoría.
                                        </p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>                    
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}