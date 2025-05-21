import { Checkbox } from "@/components/ui/checkbox"
import { useProductFormContext } from "@/context/product-form.context";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import { Input } from "@/components/ui/input";
import { CircleHelp } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

export default function StoreFrontCard() {
    const {
        data,
        setData,
        errors
    } = useProductFormContext();

    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="flex items-center col-span-6 space-x-2">
                        <Checkbox
                            id="is_feature"
                            checked={Boolean(data.is_feature) || false}
                            onCheckedChange={(checked) => setData('is_feature', !!checked)}
                        />
                        <div className="grid leading-none">
                            <label
                                htmlFor="is_feature"
                                className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                            >
                                Destacar en homepage
                            </label>
                            <p className="text-sm text-gray-600">
                                Hacer que sea más visible este producto
                            </p>
                        </div>
                        {data.is_feature && (
                            <div className="flex items-center relative pl-6">
                                <Input
                                    id="relevance" 
                                    type="number"
                                    placeholder="Relevancia"
                                    max={5}
                                    value={data.relevance} 
                                    onChange={(e) => setData('relevance', parseInt(e.target.value))} 
                                />
                                <InputError message={errors.relevance} />
                            </div>
                        )}  
                    </div>

                    <div className="flex flex-col col-span-12 md:col-span-6">
                        <div className="flex justify-between">
                            <div className="flex flex-row">
                                <InputLabel htmlFor="key_words" value="Palabras clave para búsqueda" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            <p className="text-gray-100">Coloca aquí las palabras clave de este producto para que tus clientes puedan encontrarlo fácilmente</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <span className="text-gray-500 ml-2">(Opcional)</span>
                        </div>

                        <Input
                            id="key_words"
                            type="text" 
                            value={data.key_words}
                            placeholder="Palabras clave separadas por comas"
                            onChange={(e) => setData('key_words', e.target.value)} 
                        />

                        <InputError message={errors.key_words} />
                    </div>
                    
                    <div className="col-span-12">
                        <InputLabel htmlFor="warranty_policy" value="Política de garantía" />
                        <Textarea
                            id="warranty_policy"
                            value={data.warranty_policy}
                            onChange={(e) => setData('warranty_policy', e.target.value)}
                            className="min-h-[100px]"
                            placeholder="Escribe aquí la política de garantía del producto, incluyendo duración, condiciones, exclusiones y proceso para hacerla válida."
                        />
                        <InputError message={errors.warranty_policy} />
                    </div>

                    <div className="flex flex-col col-span-6">
                        <div className="flex flex-row">
                            <InputLabel htmlFor="key_words" value="Palabras clave para búsqueda" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Coloca aquí las palabras clave de este producto para que tus clientes puedan encontrarlo fácilmente</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    
                        <Select onValueChange={(e) => { setData('condition', e, ) }} defaultValue={String(data.condition)}>
                            <SelectTrigger className='h-[30px]'>
                                <SelectValue placeholder="Selecciona una marca" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="nuevo">Nuevo</SelectItem>
                                <SelectItem value="usado">Usado</SelectItem>
                                <SelectItem value="reacondicionado">Reacondicionado</SelectItem>
                            </SelectContent>
                        </Select>
                    
                        <InputError message={errors.key_words} />
                    </div>

                    <div className="flex items-center col-span-6 space-x-2">
                        <Checkbox
                            id="show_condition"
                            checked={Boolean(data.show_condition) || false}
                            onCheckedChange={(checked) => setData('show_condition', !!checked)}
                        />
                        <div className="grid leading-none">
                            <label
                                htmlFor="show_condition"
                                className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                            >
                                Mostrar condición en el storefront
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col col-span-12">
                        <InputLabel htmlFor="disponibility_text" value="Mensaje de disponibilidad" />
                        <Input
                            id="disponibility_text"
                            type="text"
                            placeholder="Comunica a tus clientes cuanto tiempo tardará en llegar el producto"
                            value={data.disponibility_text} 
                            onChange={(e) => setData('disponibility_text', e.target.value)} 
                        />
                        <InputError message={errors.relevance} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
