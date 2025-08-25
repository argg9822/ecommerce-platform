import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "@/types/category";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      setLoadingCategories(true)
      setError(null)

      axios.get(route('categories_list'))
      .then(res => setCategories(res.data.categories))
      .catch(err => setError(err.message))
      .finally(() => setLoadingCategories(false))
  }, []);

  return { categories, loadingCategories, error }
}
