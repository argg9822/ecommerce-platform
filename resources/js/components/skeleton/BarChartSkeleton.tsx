import React from "react";

const BarChartSkeleton: React.FC = () => {
  return (
    <div className="w-full p-4 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md shadow-lg animate-pulse">
      {/* Título */}
      <div className="h-5 w-32 bg-gray-700/50 rounded mb-6"></div>

      {/* Ejes del gráfico */}
      <div className="h-64 flex items-end justify-between gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div
              className="w-full bg-gradient-to-t from-gray-800 to-gray-700/50 rounded-t"
              style={{
                height: `${Math.random() * 80 + 40}%`, // alturas variables
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Etiquetas del eje X */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-3 w-8 bg-gray-700/40 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default BarChartSkeleton;
