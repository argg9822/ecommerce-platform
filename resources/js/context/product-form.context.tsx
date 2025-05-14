import { createContext, useContext } from "react"; 
import { ProductFormContextType } from "@/types/product-form.type";

export const ProductFormContext = createContext<ProductFormContextType | null>(null);

export const useProductFormContext = () => {
    const context = useContext(ProductFormContext);
    if (!context) {
        throw new Error('useProductFormContext debe ser usado dentro de un ProductFormProvider');
    }
    return context;
}



