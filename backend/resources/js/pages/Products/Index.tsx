import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Products(){
    return (
        <AuthenticatedLayout 
        header={
          <h1 className="mt-6">Productos</h1>
        }>
        <Head title="Productos" />

        </AuthenticatedLayout>
    )
}