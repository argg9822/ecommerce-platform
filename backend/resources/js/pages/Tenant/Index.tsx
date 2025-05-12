import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tenant } from '@/types';
import PrimaryButton from '@/components/PrimaryButton';
import Badge from '@/components/Badge';
import NoTenants from '@/pages/Tenant/Partials/NoTenants';
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

export default function Index({ tenants }: SetupProps) {  
  
  return (
    <AuthenticatedLayout 
      header={
        <h1 className="mt-6">Tiendas ({tenants.length})</h1>
      }>
      <Head title="Tiendas" />

      {tenants.length === 0 ? (
        <NoTenants />
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
              <TableHead className="w-[50px] text-center"></TableHead>
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
                <TableCell>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                    <img
                      src={route('tenant_media_admin', {path: tenant.logo, tenantId: tenant?.id})}
                      alt={tenant.name}
                      title={tenant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>

                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{ tenant.plan?.name }</TableCell>
                <TableCell>{ tenant.owner?.name } <br /> <span className='text-sm text-gray-400'>{ tenant.owner?.email }</span></TableCell>
                <TableCell>{ tenant.config.currency }</TableCell>
                <TableCell>
                  <Badge color={ tenant.is_active ? 'success' : 'danger'} text={ tenant.is_active ? 'Activa' : 'Inactivo'}/>                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AuthenticatedLayout>
  );
}