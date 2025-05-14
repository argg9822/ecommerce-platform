import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import { Input } from "@/components/ui/input";
import SecondaryButton from '@/components/SecondaryButton';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, Layers, CircleHelp } from 'lucide-react';
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
import { useProductFormContext } from '@/context/product-form.context';

export default function MainInformationCard( ) {
    const {
        storeProduct,
        data,
        setData,
        errors,
        processing,
        recentlySuccessful,
        handleNumberChangeInput,
        handleNumberChangeSelect
    } = useProductFormContext();

    return (
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
                        <InputLabel htmlFor="brand_id" value="Marca" />
                        <div className='flex'>
                            <Select onValueChange={(e) => { handleNumberChangeSelect(e, 'brand_id') }} defaultValue={String(data.brand_id)}>
                                <SelectTrigger className='h-[30px]'>
                                    <SelectValue placeholder="Selecciona una marca" />
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
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="min-h-[100px]"
                        placeholder="Describe tu producto con detalles útiles: características, beneficios y uso ideal. Ejemplo: «Reloj resistente al agua, correa ajustable y diseño moderno. Perfecto para deportistas y ocasiones casuales.»"
                    />
                    <InputError message={errors.description} />
                </div>

            </CardContent>
        </Card>
    );
}