import { Product } from '@/types/product';
import { Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import PrimaryButton from "@/components/PrimaryButton";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button';
import DangerButton from '@/components/ui/danger-button';

type ProductsProps = {
  products: Product[];
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
  onView: (product: Product) => void;
}

export default function ProductsList({ products, onEdit, onDelete, onView }: ProductsProps) {
  
  return (
    <div className=" text-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Administrar productos</h1>
            <Link href={route('products_create')}>
                <PrimaryButton className="py-2 rounded-xl shadow-lg flex items-center gap-2">
                    <PlusCircle size={18} />
                    Nuevo producto
                </PrimaryButton>
            </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 hover:border-gray-600 transition-all relative">
              {/* Product Image Placeholder */}
              <div className="bg-gray-700 h-48 flex items-center justify-center relative">
                {product.images
                  ? <img src={route('tenant_media_owner', {path: product.images[0].url})} alt="" className='w-full h-48 object-cover' /> 
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
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.is_available 
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
                    {product.variants?.map(variant =>
                      variant.variant_attributes.map((attr) => (
                        <Badge key={attr.id}>
                          {attr.name}: {attr.value}
                        </Badge>
                      ))
                    )}
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
                    onClick={() => onEdit(product.id)}
                    className="text-gray-400 hover:text-amber-400 transition-colors"
                    title="Editar"
                  >
                    <Edit size={18} />
                  </Button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-transparent px-3"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}