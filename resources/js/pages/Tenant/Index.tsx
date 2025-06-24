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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Lock } from 'lucide-react';
import CopyButton from '@/components/ui/copy-button';

type SetupProps = {
  tenants: Tenant[];
}

export default function Index({ tenants }: SetupProps) {  
  console.log(tenants);

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
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id} className="text-center">
                <TableCell>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                    {tenant.logo && (
                      <img
                        src={route('tenant_media_admin', {path: tenant.logo, tenantId: tenant?.id})}
                        alt={tenant.name}
                        title={tenant.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium">{tenant.name}</TableCell>
                <TableCell>{ tenant.plan?.name }</TableCell>
                <TableCell>{ tenant.users?.map(user => (
                  <div key={user.id}>
                    {user.name}
                    <br /> <span className='text-sm text-gray-400'>{ user.email }</span>
                  </div>
                )) } 
                </TableCell>
                <TableCell>{ tenant.config.currency }</TableCell>
                <TableCell>
                  <Badge color={ tenant.is_active ? 'success' : 'danger'} text={ tenant.is_active ? 'Activa' : 'Inactivo'}/>                
                </TableCell>
                {tenant.is_active && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <TableCell className="group relative cursor-pointer p-0 w-10">
                        <div className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 group-hover:bg-emerald-900/20 group-hover:ring-1 group-hover:ring-emerald-400/30">
                          <Lock className="w-4 h-4 text-emerald-400/80" />
                          <span className="font-mono text-sm text-white/90">
                            Token
                          </span>
                        </div>
                      </TableCell>
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className="w-72 bg-gray-900 border border-gray-700/80 shadow-xl p-0 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-emerald-400" />
                            <h3 className="font-semibold text-white">API Token</h3>
                          </div>
                          <CopyButton token={tenant.api_tokens[0].token_hash} />
                        </div>
                        
                        <div className="p-3 bg-gray-800/50 rounded-md mb-3">
                          <code className="font-mono text-sm text-white/90 break-all">
                            {tenant.api_tokens[0].token_hash}
                          </code>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="text-emerald-400 mt-0.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="1.5"/>
                              <path d="M12 16v-4m0-4h.01" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <p className="text-xs text-gray-400">
                            Este token proporciona acceso completo a la API. Guárdalo de forma segura y no lo compartas.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/60 border-t border-gray-700/80 px-4 py-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Última generación: {new Date(tenant.api_tokens[0].created_at).toLocaleDateString()}</span>
                        <span className="text-xs text-emerald-400/80 font-medium">ACTIVO</span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </AuthenticatedLayout>
  );
}