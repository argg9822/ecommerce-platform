import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import { FormEventHandler, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import timezones from '@/data/timezones.json';
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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { Category } from '@/types';

type props = {
  className?: string,
  categories: Category[]
}

export default function ProductForm({ className = '', categories }: props) {
  const {
    data,
    setData,
    errors,
    post,
    reset,
    processing,
    recentlySuccessful,
  } = useForm({
    name: '',
    brand: '',
    description: '',
    price: '',
    compare_price: '',
    stock: '',
    shipment: '',
    sku: '',
    barcode: '',
    category_id: '',
    is_available: false as boolean,
    is_feature: false as boolean,
    features: ''
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setmessageDialog] =
    useState(
      {
        message: 'Tienda guardada correctamente!',
        title: 'Se ha creado la tienda'
      }
    );
  const tenantNameRef = useRef<HTMLInputElement>(null);

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
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpenDialog(true);
      },
      onError: (errors) => {
        if (errors.name) {
          reset('name');
          tenantNameRef.current?.focus();
        }

        if (errors.brand) reset('brand');
        if (errors.price) reset('price');
        if (errors.compare_price) reset('compare_price');
        if (errors.stock) reset('stock');
        if (errors.shipment) reset('shipment');
        if (errors.sku) reset('sku');
        if (errors.barcode) reset('barcode');
        if (errors.category_id) reset('category_id');
        if (errors.is_feature) reset('is_feature');

        setmessageDialog({ message: 'Error al crear la tienda', title: 'Error' });
        setOpenDialog(true);
      }
    });
  }

  return (
    <>
      <form onSubmit={storeTenant} encType="multipart/form-data">
        <section className={className}>
          <Card>
            <CardHeader>
              <CardTitle><h2 className="text-lg text-center">Información del producto</h2></CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="name" value="Nombre del producto" />
                  <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                  <InputError message={errors.name} />
                </div>

                <div>
                  <InputLabel htmlFor="brand" value="Marca" />
                  <Input id="brand" type="text" value={data.brand} onChange={(e) => setData('brand', e.target.value)} />
                  <InputError message={errors.brand} />
                </div>
              </div>

              <div>
                <InputLabel htmlFor="description" value="Descripción" />
                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[100px]" />
                <InputError message={errors.description} />
              </div>

            </CardContent>
          </Card>

          {/* Precios y stock */}
          <Card>
            <CardHeader>
              <CardTitle><h2 className="text-lg text-center">Precios y stock</h2></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="price" value="Precio" />
                  <Input id="price" type="number" step="0.01" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                  <InputError message={errors.price} />
                </div>
                <div>
                  <InputLabel htmlFor="compare_price" value="Precio comparativo" />
                  <Input id="compare_price" type="number" step="0.01" value={data.compare_price} onChange={(e) => setData('compare_price', e.target.value)} />
                  <InputError message={errors.compare_price} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="stock" value="Stock" />
                  <Input id="stock" type="number" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                  <InputError message={errors.stock} />
                </div>
                <div>
                  <InputLabel htmlFor="shipment" value="Costo de envío" />
                  <Input id="shipment" type="number" step="0.01" value={data.shipment} onChange={(e) => setData('shipment', e.target.value)} />
                  <InputError message={errors.shipment} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="sku" value="SKU" />
                  <Input id="sku" type="text" value={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                  <InputError message={errors.sku} />
                </div>
                <div>
                  <InputLabel htmlFor="barcode" value="Código de barras" />
                  <Input id="barcode" type="text" value={data.barcode} onChange={(e) => setData('barcode', e.target.value)} />
                  <InputError message={errors.barcode} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Características adicionales */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle><h2 className="text-lg text-center">Categoría y otras opciones</h2></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <InputLabel htmlFor="category_id" value="Categoría" />
                <Select onValueChange={(e) => { setData('category_id', e) }} defaultValue={data.category_id}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.category_id} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="items-top flex space-x-2">
                  <Checkbox 
                    id="is_available" 
                    checked={data.is_available}
                    onCheckedChange={(checked) => setData('is_available', checked ? true : false)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="is_available"
                      className="text-sm font-medium leading-none text-gray-400"
                    >
                      Disponible
                    </label>
                    <p className="text-sm text-gray-600">
                      Establecer producto como disponible en la tienda
                    </p>
                  </div>
                </div>

                <div className="items-top flex space-x-2">
                  <Checkbox 
                    id="is_feature" 
                    onCheckedChange={(checked) => setData('is_feature', checked ? true : false)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="is_available"
                      className="text-sm font-medium leading-none text-gray-400"
                    >
                      Destacar en homepage
                    </label>
                    <p className="text-sm text-gray-600">
                      Hacer que sea más visible este producto
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <InputLabel htmlFor="features" value="Características" />
                <Textarea
                  id="features"
                  value={data.features}
                  onChange={(e) => setData('features', e.target.value)}
                  placeholder='Ej: {"color":"rojo", "material":"algodón"}'
                />
                <InputError message={errors.features} />
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
            Guardar
          </PrimaryButton>
        </div>
      </form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-gray-400">
          <AlertDialogHeader>
            <AlertDialogTitle>{messageDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {messageDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{errors ? 'Aceptar' : 'Crear nuevo producto'}</AlertDialogCancel>
            {!errors &&
              <AlertDialogAction>
                <Link
                  href={route("tenantProductsIndex")}>
                  Ver productos
                </Link>
              </AlertDialogAction>}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}