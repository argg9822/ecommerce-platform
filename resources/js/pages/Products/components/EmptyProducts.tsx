import PrimaryButton from "@/components/PrimaryButton";
import { PlusCircle } from "lucide-react";
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from "@/types";

export default function EmptyProducts(){
    const {tenant} = usePage<PageProps>().props;
    
    return (
        <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-red-400 mb-6">
                <img
                    src={route('tenant_media_owner', {path: tenant?.logo})}
                    alt="Logo"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <h2 className="text-2xl font-semibold text-white">No hay productos cargados</h2>
            <p className="text-gray-400 mt-2 max-w-md">
                Comienza a gestionar tu tienda agregando tu primer producto. Aquí podrás visualizar, editar y organizar tus artículos.
            </p>

            <Link href={route('products_create')}>
                <PrimaryButton className="mt-6 px-6 py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <PlusCircle size={18} />
                    Agregar nuevo producto
                </PrimaryButton>
            </Link>
        </div>
    );
}