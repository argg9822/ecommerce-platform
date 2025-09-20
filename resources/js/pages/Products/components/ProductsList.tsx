import { Product } from '@/types/product';
import { Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PrimaryButton from "@/components/PrimaryButton";
import useProductForm from '@/hooks/form/useProductForm';
import { useState } from 'react';

type ProductsProps = {
  products: Product[];
  onEdit: (productId: string) => void;
  onDelete: (productId: number) => void;
  onView: (product: Product) => void;
}
interface OnKeyDownEvent extends React.KeyboardEvent<HTMLInputElement> {}

export default function ProductsList({ products, onEdit, onDelete, onView }: ProductsProps) {
  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);
  const { transformVariant } = useProductForm();
  const [filterProductName, setFilterProduct] = useState<string>('');
  const [productList, setProductList] = useState(products);

  const filterProducts = () => {
    const regExp = new RegExp(filterProductName, 'gi');
    const filteredProducts = products.filter(p => regExp.test(p.name));
    setProductList(filterProductName != '' ? filteredProducts : products);
    setIsOpenSheet(false);
  }

  const onKeyDown = (e: OnKeyDownEvent): void => {
    if (e.code === 'Enter') {
      filterProducts();
    }
  }

  return (
    <div className="text-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Administrar productos</h1>

          <div className='flex items-center gap-4'>
            <div>
              <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={() => setIsOpenSheet(true)}>Filtrar</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtrar productos</SheetTitle>
                    <SheetDescription>
                      Puedes filtrar los productos por diferentes campos
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        type="text"
                        onKeyDown={(e) => onKeyDown(e)}
                        value={filterProductName}
                        onChange={(e) => setFilterProduct(e.target.value)}
                        autoComplete='off'
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <Button type="submit" onClick={() => filterProducts()}>Aplicar filtros</Button>
                    <SheetClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            <Link href={route('products_create')}>
              <PrimaryButton className="shadow-lg flex items-center gap-2">
                <PlusCircle size={18} />
                Nuevo producto
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.length > 0 && productList.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 hover:border-gray-600 transition-all relative">
              {/* Product Image Placeholder */}
              <div className="bg-gray-700 h-48 flex items-center justify-center relative">
                {product.images
                  ? <img src={route('tenant_media_owner', { path: product.images[0].url })} alt="" className='w-full h-48 object-cover' />
                  : <span className="text-gray-400">Sin imagen</span>
                }

                {product.is_feature && (
                  <span className="absolute top-2 right-2 bg-amber-600 text-amber-100 text-xs px-2 py-1 rounded-full">
                    Destacado
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 pb-[3rem] relative">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className="font-medium text-lg line-clamp-2">{product.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${product.is_available
                      ? 'bg-green-900 text-green-300'
                      : 'bg-red-900 text-red-300'
                    }`}>
                    {product.is_available ? 'Disponible' : 'No disponible'}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    {product.compare_price && (
                      <span className="text-gray-400 text-xs line-through">
                        ${product.compare_price}
                      </span>
                    )}
                    <span className="font-bold text-lg">${product.price}</span>
                  </div>
                  <span className="text-sm text-gray-300">
                    Stock: {product.stock}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <HoverCard>
                    <HoverCardTrigger className="text-sm text-gray-400 line-clamp-2">{product.description}</HoverCardTrigger>
                    <HoverCardContent>
                      {product.description}
                    </HoverCardContent>
                  </HoverCard>

                  <div className="flex flex-wrap gap-1 my-4">
                    {product.variants?.map((variant, i) => (
                      transformVariant(variant).variant_attributes.colors?.filter(color => color.selected).map((color, index) => (
                        <Badge key={index} className={`${color.color}`}>
                          {color.label ?? color.value}
                        </Badge>
                      ))
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between w-full border-t border-gray-700 absolute bottom-0 px-4 py-2">
                <Button
                  onClick={() => onView(product)}
                  className="text-gray-400 hover:text-indigo-500 transition-colors"
                  title="Ver detalles"
                >
                  <Eye size={18} />
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(product.slug)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    onClick={() => onDelete(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-transparent px-3"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}