import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { FormEventHandler, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { Category } from '@/types';
import { PlusIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import CategoryForm from '@/pages/Categories/Partials/CategoryForm';

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
    features: '',
    product_images: []
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [messageDialog, setmessageDialog] =
    useState(
      {
        message: 'Producto agregado correctamente',
        title: 'Se ha creado un producto nuevo'
      }
    );

  const tenantNameRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<File[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index:number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  const triggerFileInput = () => {
    imageInputRef.current?.click();
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newImages = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setImages([...images, ...newImages]);
    }
  };

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

          <Card>
            <CardHeader>
              <CardTitle><h2 className="text-lg text-center">Imágenes</h2></CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div className='flex flex-col items-center gap-4'>
                <div 
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed rounded-lg p-4 flex text-center text-gray-400 cursor-pointer bg-secondary"
                  onClick={triggerFileInput}
                >
                  <Upload className='mr-2 h-4 w-4 text-white'/>
                  Arrastra imágenes aquí o haz click para seleccionar
                </div>

                <input
                  type="file"
                  ref={imageInputRef}
                  accept="image/*"
                  className='hidden'
                  multiple
                  onChange={handleImageUpload}
                />

                <p className='text-sm text-gray-500 text-muted-foreground'>
                  Puedes seleccionar múltiples imágenes (máx. 5)
                </p>
              </div>

              {images.length > 0 && (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className='relative'>
                      <div className='aspect-square overflow-hidden rounded-lg border'>
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Preview ${index + 1}`}
                          className='object-cover w-full h-full'
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        {index === 0 ? "Principal" : index + 1}
                      </span>
                    </div>
                  ))}
                 </div>
              )}
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <SecondaryButton className='max-h-[30px]'>
                        <PlusIcon className="w-5 h-5 text-gray-100" />
                      </SecondaryButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className='text-gray-100'>Agregar categoría</DialogTitle>
                        <DialogDescription>Inserta los datos de la categoría y haz click en guardar</DialogDescription>
                      </DialogHeader>
                      
                      <CategoryForm />

                      <DialogFooter>
                        <PrimaryButton type="submit">Guardar</PrimaryButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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