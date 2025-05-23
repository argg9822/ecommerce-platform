import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import EmptyProducts from '@/pages/Products/components/EmptyProducts';
import { Product } from '@/types/product';

type ProductsProps = {
  products: Product[]
}

export default function Index({products}: ProductsProps){
    return (
        <AuthenticatedLayout 
          header={
            <h1 className="mt-6">Productos</h1>
          }>
          <Head title="Productos" />

          {products.length === 0 ?
            <EmptyProducts /> : 
            products.map((product) => (
              <div key={product.id}>
                <span>{product.name}</span>
              </div>
            ))
          }

        </AuthenticatedLayout>
    )
}