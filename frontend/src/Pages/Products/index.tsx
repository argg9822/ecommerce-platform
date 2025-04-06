import { useState, useEffect } from 'react';
import { ProductProps } from '../../types/ProductProps'
import Layout from '../../Components/Layout'
import ProductTable from '../../Components/ProductTable';
import Button from '../../Components/Button';

function Products () {
    const [products, setProducts] = useState<ProductProps[]>([]);
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setProducts(data));
    }, []);

    return (
        <Layout>
            <h1>Productos</h1>
            <div className='flex justify-between items-center mb-2.5'>
                <span className='text-center'>Hay {products.length} productos</span>
                <Button>Añadir producto</Button>
            </div>
            <ProductTable products={products}/>
        </Layout>
    )
}

export default Products;