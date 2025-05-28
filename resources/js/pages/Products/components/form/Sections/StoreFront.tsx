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

export default function StoreFront() {
    const {
        data,
        setData,
        errors
    } = useProductFormContext();

    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="flex col-span-12 justify-between">
                        <div className="flex flex-row items-center space-x-3">
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
                                    Hacer que sea más visible este producto en la página de compras.
                                </p>
                            </div>
                        </div>
                        {data.is_feature && (
                            <div className="flex relative pl-6 flex-col">
                                <div className="flex flex-row">
                                    <InputLabel htmlFor="relevance" value="Relevancia" className="absolute left-0 top-0" />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                            </TooltipTrigger>

                                            <TooltipContent>
                                                <p className="text-gray-100">Coloca una relevancia entre 1 y 5 donde: 1 es el producto más relevante y 5 el producto menos relevante.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <Input
                                    id="relevance" 
                                    type="number"
                                    placeholder="Relevancia"
                                    max={5}
                                    value={data.is_feature ? data.relevance : 0} 
                                    onChange={(e) => setData('relevance', parseInt(e.target.value))} 
                                />
                                <InputError message={errors.relevance} />
                            </div>
                        )}  
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
                            <InputLabel htmlFor="key_words" value="Condiciones del producto" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Indica si el producto es nuevo o usado</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    
                        <Select onValueChange={(e) => { setData('condition', e as "new" | "used" | "refurbished") }} defaultValue={String(data.condition)}>
                            <SelectTrigger className='h-[30px]'>
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="new">Nuevo</SelectItem>
                                <SelectItem value="used">Usado</SelectItem>
                                <SelectItem value="refurbished">Reacondicionado</SelectItem>
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
                        <InputError message={errors.disponibility_text} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
