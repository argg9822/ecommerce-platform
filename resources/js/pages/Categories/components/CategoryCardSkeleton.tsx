import { Skeleton } from "@/components/ui/skeleton";
import useCategories from "@/hooks/use-categories";

export default function CategoryCardSkeleton() {
    return (
        <div
            className="rounded-xl border border-gray-800 bg-gray-900/50 
                       backdrop-blur-md p-4 shadow-md animate-pulse"
        >
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-md bg-gray-800" />
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                </div>
                <Skeleton className="h-3 w-16 bg-gray-800" />
            </div>

            {/* Descripción */}
            <Skeleton className="h-3 w-full bg-gray-800 mb-2" />
            <Skeleton className="h-3 w-3/4 bg-gray-800 mb-4" />

            {/* Productos */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-sm bg-gray-800" />
                    <Skeleton className="h-3 w-40 bg-gray-800" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-sm bg-gray-800" />
                    <Skeleton className="h-3 w-36 bg-gray-800" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="w-4 h-4 rounded-sm bg-gray-800" />
                    <Skeleton className="h-3 w-28 bg-gray-800" />
                </div>
            </div>

            {/* Subcategorías */}
            <div className="mt-4 border-l border-gray-800 pl-4 space-y-2">
                <div className="flex items-start gap-2">
                    <Skeleton className="w-3 h-3 rounded-full bg-gray-800 mt-1" />
                    <div className="flex-1 space-y-1">
                        <Skeleton className="h-3 w-24 bg-gray-800" />
                        <Skeleton className="h-2.5 w-32 bg-gray-800" />
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Skeleton className="w-3 h-3 rounded-full bg-gray-800 mt-1" />
                    <div className="flex-1 space-y-1">
                        <Skeleton className="h-3 w-28 bg-gray-800" />
                        <Skeleton className="h-2.5 w-36 bg-gray-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}
