import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import UploadImages from '@/components/UploadImages';
import { FormEventHandler, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { Category, Product, Brand } from '@/types';
import { PlusIcon, Layers } from 'lucide-react';
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
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from '@/pages/Categories/Partials/CategoryForm';
import BrandForm from '@/pages/Brands/Partials/BrandForm';
import { ScrollArea } from '@/components/ui/scroll-area';

type props = {
  className?: string,
  categories: Category[],
  brands: Brand[],
  product?:  Product
}

export default function ProductForm({ className = '', categories, product, brands }: props) {
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
    brand_id: '',
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
    features: '',
    product_images: product?.product_images.map(image => image.url || '') || [],
    new_images: []
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setmessageDialog] =
    useState(
      {
        message: 'Producto agregado correctamente',
        title: 'Se ha creado un producto nuevo'
      }
    );

  const [openDialogCategory, setOpenDialogCategory] = useState(false);
  const [openDialogBrand, setOpenDialogBrand] = useState(false);
  const tenantNameRef = useRef<HTMLInputElement>(null);

  const productImagesValue = (newImages: File[]) => {
    // setData('product_images', [...data.product_images, ...newImages]);
  }

  const storeProduct: FormEventHandler = (e) => {
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

        if (errors.brand) reset('brand_id');
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
      <form onSubmit={storeProduct} encType="multipart/form-data">
        <section className={className}>
          {/* Información de producto */}
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
                  <InputLabel htmlFor="category_id" value="Marca" />
                  <div className='flex'>
                    <Select onValueChange={(e) => { setData('brand_id', e) }} defaultValue={data.brand_id}>
                      <SelectTrigger className='h-[30px]'>
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>

                      <SelectContent>
                        {brands.length > 0 ? (brands.map((brand) => (
                          <SelectItem
                            key={brand.id}
                            value={String(brand.id)}>
                              <div className='flex flex-col text-left'>
                                <span>{brand.name}</span>
                              </div>
                          </SelectItem>
                          ))
                        ) : 
                        (<SelectItem value="null">
                          <div className='flex flex-col text-left'>
                            <span>Agrega una marca (si no es propia)</span>
                          </div>
                        </SelectItem>)
                        }
                      </SelectContent>
                    </Select>

                    <SecondaryButton type='button' className='max-h-[30px]' title='Añade una marca' onClick={() => setOpenDialogBrand(true)}>
                      <PlusIcon className="w-5 h-5 text-gray-100" />
                    </SecondaryButton>
                  </div>
                  <InputError message={errors.category_id} />
                </div>
              </div>

              <div>
                <InputLabel htmlFor="description" value="Descripción" />
                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[100px]" />
                <InputError message={errors.description} />
              </div>

            </CardContent>
          </Card>

          {/* Imágenes del producto */}
          <Card>
            <CardHeader>
              <CardTitle><h2 className="text-lg text-center">Imágenes</h2></CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <UploadImages 
                multiple
                preview
                onFilesSelected={productImagesValue}
              />
            
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
              <CardTitle>
                <h2 className="text-lg text-center">Categoría y otras opciones</h2>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <InputLabel htmlFor="category_id" value="Categoría" />
                <div className='flex'>
                  <Select onValueChange={(e) => { setData('category_id', e) }} defaultValue={data.category_id}>
                    <SelectTrigger className='h-[45px]'>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}>
                            <div className='flex flex-row'>{}
                              <div className='flex place-content-center flex-wrap'>
                                <div className="w-8 h-8 rounded-sm overflow-hidden mr-3">
                                {category?.image ? (
                                    <img
                                        src={route('tenant_media_owner', {path: category?.image})}
                                        alt={category.name}
                                        className="w-full h-full object-cover opacity-75"
                                    />
                                ) : (<Layers />)}
                                </div>
                              </div>
                              <div className='flex flex-col text-left'>
                                <span>{category.name}</span>
                                <span className='text-sm text-gray-500'>{category?.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <SecondaryButton type='button' className='max-h-[45px]' title='Añadir categoría' onClick={() => setOpenDialogCategory(true)}>
                    <PlusIcon className="w-5 h-5 text-gray-100" />
                  </SecondaryButton>
                </div>
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
          >Guardar
          </PrimaryButton>
        </div>
      </form>

      <Dialog open={openDialogCategory} onOpenChange={setOpenDialogCategory}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-gray-100'>Agregar categoría</DialogTitle>
            <DialogDescription>Considera utilizar nombres de categoría claros y descriptivos para mejorar la organización de tu catálogo.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="rounded-md border border-6 h-100 overflow-hidden">
            <CategoryForm categories={categories} openDialog={setOpenDialogCategory}/>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialogBrand} onOpenChange={setOpenDialogBrand}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-gray-100'>Agregar marca</DialogTitle>
          </DialogHeader>
          <BrandForm openDialog={setOpenDialogBrand}/>
        </DialogContent>
      </Dialog>

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