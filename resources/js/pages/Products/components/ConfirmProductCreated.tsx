import React from "react";

interface ModalHibridoProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: number | string;
  onCreateNew: () => void;
  onGoToList: () => void;
  onViewProduct: () => void;
}

const ModalHibrido: React.FC<ModalHibridoProps> = ({
  isOpen,
  onClose,
  productName,
  productId,
  onCreateNew,
  onGoToList,
  onViewProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
        {/* Encabezado */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Producto guardado</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="mt-4">
          <p className="text-gray-700">
            El producto <span className="font-bold">{productName}</span> se guardó correctamente.
          </p>
        </div>

        {/* Botones */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onCreateNew();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Crear nuevo producto
          </button>

          <button
            onClick={() => {
              onClose();
              onGoToList();
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            📋 Ver lista de productos
          </button>

          <button
            onClick={() => {
              onClose();
              onViewProduct();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            🔍 Ver producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHibrido;
