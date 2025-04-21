import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tenant } from '@/types';
import PrimaryButton from '@/components/PrimaryButton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type SetupProps = {
  tenants: Tenant[];
}

export default function Setup({ tenants }: SetupProps) {
  
  return (
    <AuthenticatedLayout 
      header={
        <h1 className="mt-6">Tiendas ({tenants.length})</h1>
      }>
      <Head title="Tiendas" />

      {tenants.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          <Alert>
            <AlertTitle className="text-lg font-bold">No hay tiendas</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              No hay ninguna tienda creada. Puedes crear una tienda haciendo clic en el botón de abajo.
            </AlertDescription>
          </Alert>

          <Link href={ route("tenantCreate")} className="mt-4">
            <Button className="mt-6">
              Crear tienda
            </Button>  
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{tenant.name}</h2>
          </div>
        ))}
      </div>
      
    </AuthenticatedLayout>
  );
}