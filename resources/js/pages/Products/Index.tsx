import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import EmptyProducts from '@/pages/Products/components/EmptyProducts';
import { Product } from '@/types/product';
import ProductsList from '@/pages/Products/components/ProductsList';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useForm } from '@inertiajs/react';
import { FlashMessage } from '@/types';
import { toast } from '@/hooks/use-toast';

type ProductsProps = {
  products: Product[]
}

export default function Index({products}: ProductsProps){
  const [openDialogDeleteProduct, setOpenDialogDeleteProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(0);
  const {
    delete: destroy,
    processing,
  } = useForm({ 
    id: 0
  });

  const { flash } = usePage().props as {
    flash?: {
        success?: FlashMessage;
        error?: FlashMessage;
    };
  };

  useEffect(() => {
    if(!flash) return;
    if (flash?.success) {
        toast({
            variant: "default",
            title: flash.success.title || 'Éxito',
            description: flash.success.message || 'Operación completada correctamente',
        });
    }

    if (flash?.error) {
        toast({
            variant: "destructive",
            title: flash.error.title || 'Error',
            description: flash.error.message || 'Ocurrió un error',
        });
    }
  }, [flash]); 

  const editProduct = () => {

  }

  const handleDeleteProduct = () => {
    destroy(route('products_destroy', deleteProductId), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteProductId(0);
        setOpenDialogDeleteProduct(false);
      }
    })
  }

  const viewProduct = () => {

  }

  return (
    <>
      <AuthenticatedLayout>
        <Head title="Productos" />

        {products.length === 0 ?
          <EmptyProducts /> : 
          <ProductsList 
            products={products}
            onEdit={editProduct}
            onDelete={(productId) => {
              setOpenDialogDeleteProduct(true);
              setDeleteProductId(productId);
            }}
            onView={viewProduct}
          />
        }

      </AuthenticatedLayout>

      <AlertDialog open={openDialogDeleteProduct}>
        <AlertDialogContent className="bg-zinc-900 text-white border border-zinc-500">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-red-500">
              <AlertDialogTitle className="text-lg font-bold">¿Estás seguro?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="mt-2 text-sm text-gray-300">
              Este producto y todos sus datos relacionados serán eliminados. 
              <span className="text-red-400 font-semibold"> Tendrás 30 días para deshacer esta acción.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => {
                setOpenDialogDeleteProduct(false);
                setDeleteProductId(0);
              }}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white shadow-md"
              disabled={processing}
              onClick={handleDeleteProduct}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}