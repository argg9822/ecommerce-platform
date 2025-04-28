import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tenant } from '@/types';
import PrimaryButton from '@/components/PrimaryButton';
import Badge from '@/components/Badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

      {tenants.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <Alert>
            <AlertTitle className="text-lg font-bold">No hay tiendas</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              No hay ninguna tienda creada. Puedes crear una tienda haciendo clic en el botón de abajo.
            </AlertDescription>
          </Alert>

          <Link href={ route("tenantCreate")} className="mt-4">
            <PrimaryButton className="mt-6">
              Crear tienda
            </PrimaryButton>  
          </Link>
        </div>
      ) : (
        <Table>        
          <TableHeader>
            <TableRow>
              <Link href={ route("tenantCreate")} className="mt-4">
                <PrimaryButton>
                  Crear tienda
                </PrimaryButton>  
              </Link>
            </TableRow>
            <TableRow>
              <TableHead className="w-[100px] text-center">Nombre</TableHead>
              <TableHead className="text-center">Plan</TableHead>
              <TableHead className="text-center">Administrador</TableHead>
              <TableHead className="text-center">Moneda</TableHead>
              <TableHead className="text-center">Estado</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id} className="text-center">
                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{tenant.plan?.name}</TableCell>
                <TableCell>{ tenant.owner?.name }</TableCell>
                <TableCell>{ tenant.config.currency }</TableCell>
                <TableCell>
                  <Badge color={tenant.is_active ? 'success' : 'danger'} text={tenant.is_active ? 'Activa' : 'Inactivo'}/>                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AuthenticatedLayout>
  );
}