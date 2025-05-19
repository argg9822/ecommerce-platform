import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import InputLabel from '@/components/InputLabel';
import { Trash2, PlusCircle, CircleHelp } from 'lucide-react';
import InputError from '@/components/InputError';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ColorPicker } from '@/components/ui/color-picker';
import useProductSpecificationsCard from '@/hooks/form/useProductSpecificationsCard';
import { ProductVariants } from '@/types/product';
import DangerButton from '@/components/DangerButton';


export default function ProductSpecificationsCard() {
    const {
        handleFeatureChange,
        addFeature,
        removeFeature,
        handleVariantChange,
        removeVariant,
        colorOptions,
        errors,
        data,
        setData
    } = useProductSpecificationsCard();

    const [customColors, setCustomColors] = useState<string>("#3b82f6");
    const [dimensionsInputs, setDimensionsInputs] = useState<string[]>(["Largo" ,"Ancho", "Alto"]);

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader className="p-0">
                <CardTitle>
                    <h2 className="text-lg text-center">
                        Especificaciones del producto
                        <span className="text-sm text-gray-400"> (Opcional)</span>
                    </h2>
                </CardTitle>
            </CardHeader>

            <Tabs defaultValue="variant-1">
                <TabsList className={`grid bg-gray-700 rounded-lg ${data.variants.length > 1 ? "grid-cols-12" : "w-full"}`}>
                    {data.variants.map((_: ProductVariants, variant_index:number) => (
                        <TabsTrigger 
                            key={variant_index} 
                            value={`variant-${variant_index}`} 
                            className={`col-span-${12/data.variants.length} 
                            text-center text-gray-200 hover:text-gray-100 hover:bg-gray-600
                            focus:bg-black/50 transition-all duration-200`}
                        >
                            Variante {variant_index + 1}
                        </TabsTrigger>
                    )
                    )}
                </TabsList>
                {data.variants.map((variant: ProductVariants, variant_index:number) => (
                    <TabsContent value={`variant-${variant_index}`} key={variant_index}>
                        <CardContent key={variant_index} className="space-y-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h3 className="text-gray-200 text-lg">Variante {variant_index+1}</h3>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`is_available_${variant_index+1}`}
                                        checked={variant.is_available}
                                        onCheckedChange={(checked) => handleVariantChange(variant_index, 'is_available', !!checked)}
                                    />
                                    <div className="flex flex-row">
                                        <label
                                            htmlFor={`is_available_${variant_index+1}`}
                                            className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                                        >
                                            Disponible
                                        </label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                                </TooltipTrigger>

                                                <TooltipContent>
                                                    <p className="text-gray-100">Establecer variación como disponible en la tienda</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    {(data.variants.length > 1) && (
                                        <DangerButton
                                            type="button"
                                            title="Eliminar variante"
                                            onClick={() => removeVariant(variant_index)}
                                            className="text-red-500 hover:text-gray-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </DangerButton>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-12 gap-5 items-end">
                                <div className="col-span-9">
                                    <InputLabel htmlFor="feature-color" value="Colores disponibles" />
                                    <ToggleGroup type="multiple" size="sm" className="flex flex-row gap-3 py-0">
                                        {colorOptions.map(item => (
                                            <ToggleGroupItem key={item.value} value={item.value} className="data-[state=on]:bg-gray-800 data-[state=on]:shadow-lg
                                                bg-transparent hover:bg-gray-700/50 
                                                border-0 rounded-md px-3 py-1 text-sm
                                                transition-all duration-150
                                                flex items-center gap-2"
                                            >
                                                <span className={item.color}>{item.label}</span>
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                </div>

                                <div className="col-span-3">
                                    <ColorPicker
                                        value={customColors}
                                        onChange={setCustomColors}
                                    />
                                </div>

                                <div className="col-span-5">
                                    <InputLabel htmlFor="weight" value="Peso" />
                                    <Input
                                        type='number'
                                        id="weight"
                                        placeholder="En KG"
                                        value={variant.weight || ""}
                                        onChange={(e) => handleVariantChange(variant_index, "weight", e.target.value)}
                                    />
                                </div>

                                <div className="col-span-7">
                                    <InputLabel htmlFor="weight" value="Dimensiones" />

                                    <div className="flex flex-row outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                        {dimensionsInputs.map((input, index) => (
                                            <div key={index} className="flex items-center relative">
                                                <span className="absolute left-3 z-10 shrink-0 text-base text-gray-400 select-none sm:text-sm/6">{input}</span>
                                                <Input
                                                    id={input}
                                                    type="number"
                                                    placeholder='0'
                                                    className="pl-[60px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    step="0.01"
                                                    value={data.price}
                                                    onChange={(e) => handleVariantChange(variant_index, "dimensions", e.target.value)}
                                                />
                                                <div className="absolute right-0 top-0 h-full flex items-center">
                                                    <Select onValueChange={(e) => { setData('currency', e) }} defaultValue={data.currency}>
                                                        <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                                                            <SelectValue placeholder="COP" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='COP'>cm</SelectItem>
                                                            <SelectItem value='USD'>m</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />

                            <div className='flex flex-col gap-4'>
                                {data.features.map((feature, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-3 items-end">
                                        <div className="col-span-5">
                                            <InputLabel htmlFor={`feature-name-${index}`} value="Característica" />
                                            <Input
                                                id={`feature-name-${index}`}
                                                placeholder="Ej: Material, Color, Talla"
                                                value={feature.name}
                                                onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <InputLabel htmlFor={`feature-values-${index}`} value="Valores" />
                                            <Input
                                                id={`feature-values-${index}`}
                                                placeholder="Separados por coma. Ej: Viscoelástico, Queen, Blanco"
                                                value={feature.values}
                                                onChange={(e) => handleFeatureChange(index, "values", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            {(data.features.length > 1) && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    onClick={addFeature}
                                    className="mt-2 gap-2 bg-gray-900 hover:bg-gray-800 text-gray-50 transition-all duration-300 shadow-lg hover:shadow-gray-900/30 rounded-lg border border-gray-700 hover:border-gray-600 group"
                                >
                                    <PlusCircle className="h-4 w-4 text-gray-300 group-hover:text-white" />
                                    <span className="text-gray-100 group-hover:text-white font-medium text-sm">
                                        Agregar otra característica
                                    </span>
                                </Button>
                                <InputError message={errors.features} />

                            </div>
                        </CardContent>
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    )
}