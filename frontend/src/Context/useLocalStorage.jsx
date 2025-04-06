import { useState } from 'react';

function useLocalStorage(){
    const {products, setProducts } = useState([]);

    const addProduct = (product) => {
        setProducts([...products, product]);
    }

    const removeProduct = (product) => {
        setProducts(products.filter(p => p.id!== product.id));  
    }

    return {
        products,
        setProducts,
        addProduct,
        removeProduct
    }
}

export default useLocalStorage;
