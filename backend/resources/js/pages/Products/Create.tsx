import { Head } from "@inertiajs/react";
import { Category } from "@/types";
import Authenticated from "@/layouts/AuthenticatedLayout";
import ProductForm from '@/pages/Products/Partials/ProductForm';

type CreateProps = {
    categories: Category[]
}

export default function Create( {categories } : CreateProps ){
    return (
        <Authenticated>
            <Head title="Agregar producto" />

            <ProductForm 
                className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-8" 
                categories={categories}/>

        </Authenticated>
    );
}