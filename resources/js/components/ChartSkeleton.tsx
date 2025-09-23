import { Skeleton } from "@/components/ui/skeleton"

export default function ChartSkeleton() {
    return (
        <div className="w-full h-[100%] relative overflow-hidden">
            {/* Fondo base */}
            <Skeleton className="absolute inset-0 w-full h-full rounded-md" />

            {/* Línea simulada */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    viewBox="0 0 400 160"
                    className="w-[90%] h-[70%]"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 120 C 80 80, 160 140, 240 60 S 400 100, 400 40"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Efecto de brillo (shimmer) más rápido */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1s_infinite]" />
        </div>
    );
}

