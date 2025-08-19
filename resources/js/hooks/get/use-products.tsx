import { useState, useEffect } from "react"
import axios from "axios"
import { ProductLite } from "@/types/product";

export default function useProducts() {
  const [products, setProducts] = useState<ProductLite[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      setLoadingProducts(true)
      setError(null)
      
      axios.get(route('products_index_lite'))
        .then(res => setProducts(res.data.products))
        .catch(err => setError(err.message))
        .finally(() => setLoadingProducts(false));
      
  }, []);

  return { products, loadingProducts, error }
}
