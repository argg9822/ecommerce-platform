import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import { FormEventHandler, useEffect, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import timezones from '@/data/timezones.json';
import currencies from '@/data/currencies.json';
import indicators from '@/data/indicators.json';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FlashMessage } from '@/types';
import { Lock } from 'lucide-react';
import CopyButton from '@/components/ui/copy-button';

type props = {
  className?: string,
  props: any,
}

export default function TenantForm({ className = '', props} : props) {
  const {
      data,
      setData,
      errors,
      post,
      reset,
      processing,
      recentlySuccessful,
  } = useForm({
      name: 'ToysNow',
      domain: 'toysnow',
      plan: '3',
      tenant_logo: null as File | null,
      tenant_language: 'es',
      tenant_timezone: 'America/Bogota',
      currency: 'COP',
      tenant_email: 'info@toysnow.com',
      domain_extension: 'io',
      user_name: 'Viviana Marin',
      user_email: 'viviana@gmail.com',
      user_password: '12345678',
      user_phone: '32131654654',
      phone_indicator: '+57'
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialogForm, setMessageDialogForm] = useState({
    title: '',
    message: '',
    data: ''
  });

  const { flash } = usePage().props as {
      flash?: {
          error?: FlashMessage;
      };
  };
  
  useEffect(()=> {
    if(!flash) return;

    if (flash?.error) {
      setMessageDialogForm({
        title: flash.error?.title || '',
        message: flash.error?.message || '',
        data: ''
      });
    }

  }, [flash])

  const tenantNameRef = useRef<HTMLInputElement>(null);
  const plans = props;

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSizeInMB = 2;
  
    if (!validTypes.includes(file.type)) {
      alert('Extensión de archivo no válida. Debe ser .jpg, .jpeg, .png o .webp.');
      return;
    }
  
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`El archivo debe pesar menos de ${maxSizeInMB}MB.`);
      return;
    }
  
    setData('tenant_logo', file);
  };

  const storeTenant: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('tenantStore'), {
      preserveScroll: false,
      onSuccess: () => {
        reset();
      },
      onError: (errors) => {
        if (errors.name) {
          reset('name');
          tenantNameRef.current?.focus();
        }

        if (errors.tenant_logo) {
          reset('tenant_logo');
        }

        if (errors.tenant_email) {
          reset('tenant_email');
        }

        if (errors.user_name) {
          reset('user_name');
        }

        if (errors.user_email) {
          reset('user_email');
        }

        setOpenDialog(true);
      }
    });
  }

  return (
    <>
      <form onSubmit={storeTenant} encType="multipart/form-data">
        <section className={className}>
          {/* Tenant information */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-center">Datos de la tienda</h2>
              </CardTitle>
            </CardHeader>

            <CardContent className='flex items-center'>
              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="name"
                      value="Nombre de la tienda"
                  />

                  <Input
                    id="name"
                    type="text"
                    onChange={(e) => setData('name', e.target.value)}
                    value={data.name}
                    autoComplete="off"
                  />

                  <InputError
                    message={errors.name}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      htmlFor="domain"
                      value="Dominio"
                  />

                  <div className='flex items-center'>
                    <Input
                      id="domain"
                      type="text"
                      value={data.domain}
                      onChange={(e) => setData('domain', e.target.value)}
                      autoComplete="off"
                    />

                    <Select onValueChange={(e) => setData('domain_extension', e)} defaultValue={data.domain_extension}>
                      <SelectTrigger className="max-w-[100px] ml-2">
                        <SelectValue placeholder="..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="com">.com</SelectItem>
                        <SelectItem value="com.co">.com</SelectItem>
                        <SelectItem value="net">.net</SelectItem>
                        <SelectItem value="org">.org</SelectItem>
                        <SelectItem value="co">.co</SelectItem>
                        <SelectItem value="io">.io</SelectItem>
                        <SelectItem value="ai">.ai</SelectItem>
                        <SelectItem value="localhost">.localhost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <InputError message={errors.domain}/>
                </div>
              </div>

              <div className="h-40 w-px bg-gray-700 mx-6" />

              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="plan"
                      value="Plan"
                  />

                  {plans.length > 0 && (
                    <Select onValueChange={(e) => setData('plan', e)} defaultValue={data.plan}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan: any) => (
                          <SelectItem
                            key={plan.id}
                            value={String(plan.id)}
                          >
                          {plan.name}
                        </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <InputError
                    message={errors.plan}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      htmlFor="tenant_logo"
                      value="Logo"
                  />

                  <Input
                    id="tenant_logo"
                    type="file"
                    onChange={handleLogoChange}
                    accept="image/*"
                    autoComplete="off"
                    className='cursor-pointer'
                  />

                  <InputError
                    message={errors.tenant_logo}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Admin information */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-center">Administrador de la tienda</h2>
              </CardTitle>
            </CardHeader>

            <CardContent className='flex items-center'>
              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="user_name"
                      value="Nombre completo"
                  />

                  <Input
                    id="user_name"
                    type="text"
                    onChange={(e) => setData('user_name', e.target.value)}
                    value={data.user_name}
                    autoComplete="off"
                  />

                  <InputError
                    message={errors.user_name}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      htmlFor="user_email"
                      value="Correo electrónico"
                  />

                  <Input
                    id="user_email"
                    type="text"
                    value={data.user_email}
                    onChange={(e) => setData('user_email', e.target.value)}
                    autoComplete="off"
                  />

                  <InputError
                    message={errors.user_email}
                  />
                </div>
              </div>

              <div className="h-40 w-px bg-gray-700 mx-6" />

              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="user_password"
                      value="Contraseña"
                  />

                  <Input
                    id="user_password"
                    type="password"
                    value={data.user_password}
                    onChange={(e) => setData('user_password', e.target.value)}
                    autoComplete="off"
                  />

                  <InputError
                    message={errors.plan}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      htmlFor="user_phone"
                      value="Teléfono"
                  />

                  <div className='flex items-center'>
                    <Select defaultValue={data.phone_indicator} onValueChange={(e) => setData('phone_indicator', e)}>
                      <SelectTrigger className="max-w-[200px] mr-2">
                        <SelectValue placeholder="Indicativo"/>
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map((indicator) => (
                          <SelectItem key={indicator.code} value={indicator.dial_code}>({indicator.dial_code}) {indicator.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      id="user_phone"
                      type="number"
                      value={data.user_phone}
                      onChange={(e) => setData('user_phone', e.target.value)}
                      autoComplete="off"
                    />

                  </div>

                  <InputError
                    message={errors.user_phone}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional configuration */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h2 className="text-center">Configuración adicional</h2>
              </CardTitle>
              <CardDescription>
                <p className="text-center">Esta configuración podrá ser cambiada en cualquier momento</p>
              </CardDescription>
            </CardHeader>

            <CardContent className='flex items-center'>
              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="tenant_language"
                      value="Lenguaje"
                  />

                  <Select onValueChange={(e) => setData('tenant_language', e)} defaultValue={data.tenant_language}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un lenguaje" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='es'>Español</SelectItem>
                      <SelectItem value='en'>Inglés</SelectItem>
                    </SelectContent>
                  </Select>             

                  <InputError
                    message={errors.tenant_language}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      value="Zona horaria"
                  />

                  <Select onValueChange={(e) => setData('tenant_timezone', e)} defaultValue={data.tenant_timezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((group) => (
                        <SelectGroup key={group.group}>
                          <SelectLabel>{group.group}</SelectLabel>
                          {group.zones.map((zone) => (
                            <SelectItem key={zone.value} value={zone.value}>
                              {zone.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>

                  <InputError
                    message={errors.tenant_timezone}
                  />
                </div>
              </div>

              <div className="h-40 w-px bg-gray-700 mx-6" />

              <div className='w-1/2'>
                <div>
                  <InputLabel
                      htmlFor="currency"
                      value="Moneda"
                  />

                  {plans.length > 0 && (
                    <Select onValueChange={(e) => setData('currency', e)} defaultValue={data.currency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency: any) => (
                          <SelectItem
                            key={currency.name}
                            value={String(currency.code)}
                          >
                            {currency.name} ({currency.symbol}) - {currency.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <InputError
                    message={errors.currency}
                  />
                </div>

                <div className='mt-4'>
                  <InputLabel
                      htmlFor="tenant_email"
                      value="Correo de la tienda"
                  />

                  <Input
                    id="tenant_email"
                    type="email"
                    value={data.tenant_email}
                    onChange={(e) => setData('tenant_email', e.target.value)}
                    autoComplete="off"
                  />

                  <InputError
                    message={errors.tenant_email}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex items-center justify-center mt-4">
          <PrimaryButton
            type="submit"
            className="ml-4"
            disabled={processing}
          >
            Crear tienda
          </PrimaryButton>
        </div>
      </form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-gray-900 border-gray-700/80 shadow-xl p-0">
          <AlertDialogHeader>
            <AlertDialogTitle>{messageDialogForm.title}</AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className=" p-0 overflow-hidden">
            {messageDialogForm.data ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white">API Token</h3>
                  </div>
                  <CopyButton token={messageDialogForm.data} />
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-md mb-3">
                  <code className="font-mono text-sm text-white/90 break-all">
                    {messageDialogForm.data}
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
                    Si no lo guardas deberás generar uno nuevo.
                  </p>
                </div>
              </div>
            ) : 
              messageDialogForm.message
            }
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>{errors ? 'Aceptar' : 'Crear nueva tienda'}</AlertDialogCancel>
            {!errors && 
              <AlertDialogAction>
                <Link
                  href={route("tenantIndex")}>
                  Ver lista de tiendas
                </Link>
              </AlertDialogAction>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}