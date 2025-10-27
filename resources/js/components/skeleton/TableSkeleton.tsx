import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({rows = 5, columns = 4} : {rows?: number; columns?: number; }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-950/60 backdrop-blur-md shadow-md">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-b border-gray-800 px-4 py-3 text-sm font-medium text-gray-400">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-24 bg-gray-800" />
        ))}
      </div>

      <div className="divide-y divide-gray-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] px-4 py-4"
          >
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton
                key={j}
                className="h-4 w-[80%] bg-gray-800/80 rounded-md"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
