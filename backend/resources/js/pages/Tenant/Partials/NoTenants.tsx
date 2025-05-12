import PrimaryButton from "@/components/PrimaryButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from '@inertiajs/react';

export default function NoTenants () {
    return (
        <div className="p-4 text-center text-gray-500">
            <Alert className="border-transparent">
                <AlertTitle className="text-lg font-bold">No hay tiendas</AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                    No hay ninguna tienda creada. Puedes crear una tienda haciendo clic en el botón de abajo.
                </AlertDescription>

                <Link href={ route("tenantCreate")} className="mt-4">
                    <PrimaryButton className="mt-6">
                        Crear tienda
                    </PrimaryButton>  
                </Link>
            </Alert>
        </div>
    )
}