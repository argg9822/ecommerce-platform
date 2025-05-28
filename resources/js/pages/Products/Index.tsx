import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import EmptyProducts from '@/pages/Products/components/EmptyProducts';
import { Product } from '@/types/product';
import ProductsList from '@/pages/Products/components/ProductsList';

type ProductsProps = {
  products: Product[]
}

export default function Index({products}: ProductsProps){
  const editProduct = () => {

  }

  const deleteProduct = () => {

  }

  const viewProduct = () => {

  }

  return (
      <AuthenticatedLayout>
        <Head title="Productos" />

        {products.length === 0 ?
          <EmptyProducts /> : 
          <ProductsList 
            products={products}
            onEdit={editProduct}
            onDelete={deleteProduct}
            onView={viewProduct}
          />
        }

      </AuthenticatedLayout>
  )
}