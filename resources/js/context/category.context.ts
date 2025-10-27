import { createContext, useContext } from "react"; 
import { CategoryContextType } from "@/types/category";

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext debe ser usado dentro de un CategoryProvider');
    }
    return context;
}
