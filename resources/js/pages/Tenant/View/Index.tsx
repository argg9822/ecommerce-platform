import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Tenant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { AlertCircleIcon, Download, Lock } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import CopyButton from '@/components/ui/copy-button';

type SetupProps = {
    tenant: Tenant;
    token?: string;
}

export default function TenantView({ tenant, token }: SetupProps) {
    const {
        id,
        name,
        domain,
        users,
        logo,
        config,
        is_active,
    } = tenant;

    const downloadToken = () => {
        const blob = new Blob([token ?? ''], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}-token.txt`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Detalles de la tienda" />

            <div className="min-h-screen bg-[#0f111a] p-6 text-white">
                <div className="max-w-5xl mx-auto space-y-6">
                    <Card className="bg-gradient-to-br from-[#0a0b16] via-[#0a0b16] to-[#1B284A] border border-gray-700 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">¡Tienda creada exitosamente!</CardTitle>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center gap-4 md:col-span-1">
                                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-red-900">
                                    <img
                                        src={route('tenant_media_admin', { path: logo, tenantId: id })}
                                        alt={name}
                                        title={name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold">{name}</h2>
                                <div className="text-sm text-gray-400">Dominio: 
                                    <span className="text-white"> {domain.domain}</span>
                                </div>
                                <Badge color={is_active ? 'success' : 'danger'} text={is_active ? 'Activa' : 'Inactivo'} />
                            </div>

                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <p className="text-sm text-gray-400">Administrador:</p>
                                    <p className="font-medium">{users?.map(user => (
                                        <div key={user.id}>
                                            {user.name}
                                            <br /> <span className='text-sm text-gray-400'>{user.email}</span>
                                        </div>
                                    ))}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400">Moneda:</p>
                                    <p className="font-medium">{config.currency}</p>
                                </div>

                                <div>
                                    {token && (
                                        <>
                                            <p className="text-sm text-gray-400">API Token generado:</p>
                                            <div className="flex items-center gap-2">
                                                <code className="bg-gray-800 flex items-center justify-between text-green-400 px-3 py-1 rounded-md text-sm overflow-x-auto gap-2">
                                                    <Lock className="w-5 h-5 text-emerald-400" />
                                                    {(token ?? '').substring(0, 10)}...{(token ?? '').slice(-10)}
                                                    <CopyButton token={token ?? ''} />
                                                </code>
                                                <Button onClick={downloadToken} size="icon" variant="outline" title='Descargar en formato txt' className="border border-green-500 text-green-400 hover:bg-green-600 hover:text-white">
                                                    <Download size={16} />
                                                </Button>
                                            </div>
                                            <Alert variant="destructive" className="text-red-400 mt-2 bg-gray-800">
                                                <AlertCircleIcon size={15}/>
                                                <AlertTitle className="font-extrabold text-base">Descarga el token para usarlo en tu aplicación. Ten en cuenta</AlertTitle>
                                                <AlertDescription>
                                                    <ul className="list-inside list-disc text-sm">
                                                        <li>Guárdalo en un lugar seguro</li>
                                                        <li>No lo compartas</li>                                            
                                                        <li>El token es único y no se puede recuperar una vez descargado</li>
                                                        <li>Si lo pierdes, deberás generar uno nuevo</li>
                                                        <li>Este sólo se mostrará una vez</li>
                                                    </ul>
                                                </AlertDescription>
                                            </Alert>
                                        </>
                                    )}
                                </div>
                            </div>

                        </CardContent>
                    </Card>                    
                </div>
            </div>        
        </AuthenticatedLayout >
    );
}