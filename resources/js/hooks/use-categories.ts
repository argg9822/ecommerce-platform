import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "@/types/category";

type UseCategoriesProps = {
  categories?: Category[] | [];
}

type CategorySales = {
  month: string;
  total_sold: number;
}

export default function useCategories({ categories }: UseCategoriesProps) {
  const [category, setCategory] = useState<Category | null>(categories && categories[0] || null);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(categories || []);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(category || null)
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const [categorySales, setCategorySales] = useState<CategorySales[]>([]);
  const [errorSales, setErrorSales] = useState<string | null>(null);
  const [loadingSales, setLoadingSales] = useState<boolean>(true);
  const [openDialogCategory, setOpenDialogCategory] = useState(false);

  useEffect(() => {
    setError(null)

    axios.get(route('categories_list'))
      .then(res => setFilteredCategories(res.data.categories))
      .catch(err => setError(err.message))
      .finally(() => setLoadingCategories(false))
  }, []);

  useEffect(() => {
    setLoadingSales(true);
    console.log("Selected category", selectedCategory);
    
    axios.get(route('categories_sales', { category: selectedCategory?.id ?? 1 }))
      .then(res => setCategorySales(res.data.sales))
      .catch(err => setErrorSales(err.message))
      .finally(() => setLoadingSales(false));
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    isDetailOpen,
    setIsDetailOpen,
    categories,
    filteredCategories,
    setFilteredCategories,
    loadingCategories,
    categorySales,
    loadingSales,
    openDialogCategory,
    setOpenDialogCategory,
    error
  }
}
