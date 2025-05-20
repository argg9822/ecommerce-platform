import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Card,
    CardContent
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, PlusCircle, CircleHelp, PlusIcon } from 'lucide-react';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ColorPicker } from '@/components/ui/color-picker';
import { ProductVariants } from '@/types/product';
import { ProductDimensions } from '@/types/product';
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import useProductSpecificationsCard from '@/hooks/form/useProductSpecificationsCard';
import DangerButton from '@/components/DangerButton';
import InputWithAddons from '@/components/ui/input-with-addons';
import { set } from 'react-hook-form';

export default function ProductVariantsCard() {
    const {
        handleFeatureChange,
        addFeature,
        removeFeature,
        handleVariantChange,
        removeVariant,
        colorOptions,
        setColorOptions,
        errors,
        data
    } = useProductSpecificationsCard();
    
    const handleColorsChange = (variantIndex: number, index: number, color: string) => {
        const newColorOptions = [...colorOptions];
        newColorOptions[index].value = color;
        setColorOptions(newColorOptions);

        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors, color];
        handleVariantChange(variantIndex, "colors", newColors);   
    }

    const addCustomColor = (variantIndex: number) => {
        const newColor = "#FFFFFF";
        const newColorOptions = [...colorOptions, {value: newColor}];
        setColorOptions(newColorOptions);

        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors, newColor];
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const dimensionsInputs = [
        {label: "Largo", value: "length"},
        {label: "Ancho", value: "width"},
        {label: "Alto", value: "height"}
    ];

    return (
        <Card className="col-span-1 md:col-span-2">
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
                                <div className="col-span-12">
                                    <div className="flex flex-row items-center justify-between">
                                        <InputLabel htmlFor="feature-color" value="Colores disponibles" />
                                        <Button 
                                            type="button" 
                                            className="max-h-[20px] bg-transparent py-0 text-blue-500 hover:text-blue-700" 
                                            title="Añade una marca" 
                                            onClick={() => addCustomColor(variant_index)}
                                        >
                                            <PlusIcon />Agregar color personalizado
                                        </Button>
                                    </div>
                                    <ToggleGroup type="multiple" size="sm" className="flex flex-row gap-3 py-0">
                                        {colorOptions.map((item, index) => (
                                            item.value.startsWith("#") ? (
                                                <ColorPicker
                                                    key={index}
                                                    value={item.value}
                                                    onChange={(e) => handleColorsChange(variant_index, index, e)}
                                                />
                                            ) : (
                                                <ToggleGroupItem
                                                    key={index}
                                                    value={item.value}
                                                    className="data-[state=on]:bg-gray-800 data-[state=on]:shadow-lg
                                                        bg-transparent hover:bg-gray-700/50
                                                        border-0 rounded-md px-3 py-1 text-sm
                                                        transition-all duration-150
                                                        flex items-center gap-2"
                                                >
                                                    <span className={item.color}>{item.label}</span>
                                                </ToggleGroupItem>
                                            )
                                        ))}
                                    </ToggleGroup>
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
                                        {dimensionsInputs.map((dimension, index) => (
                                            <InputWithAddons
                                                key={index}
                                                value={data.variants[variant_index]?.dimensions[dimension.value as keyof ProductDimensions] || ""}
                                                placeholder="0"
                                                className="pl-[60px]"
                                                onChange={(e) => handleVariantChange(variant_index, dimension.value, String(e))}
                                                inputId={`${dimension.value}-${variant_index + 1}`}
                                                prefix={dimension.label}
                                                suffixes={["cm", "m"]}
                                                onChangeSuffix={(key, value) => handleVariantChange(variant_index, "unitOfMeasurement" , value)}
                                            />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <Separator />

                            <div className='flex flex-col gap-4'>
                                {variant.attributes.map((feature, index) => (
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
                                                value={feature.value}
                                                onChange={(e) => handleFeatureChange(index, "values", e.target.value)}
                                            />
                                        </div>

                                        <div className="col-span-1">
                                            {(variant.attributes.length > 1) && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFeature(index, variant_index)}
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
                                    onClick={(e) => addFeature(variant_index)}
                                    className="mt-2 gap-2 bg-gray-900 hover:bg-gray-800 text-gray-50 transition-all duration-300 shadow-lg hover:shadow-gray-900/30 rounded-lg border border-gray-700 hover:border-gray-600 group"
                                >
                                    <PlusCircle className="h-4 w-4 text-gray-300 group-hover:text-white" />
                                    <span className="text-gray-100 group-hover:text-white font-medium text-sm">
                                        Agregar otra característica
                                    </span>
                                </Button>
                                <InputError message={errors.variants} />

                            </div>
                        </CardContent>
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    )
}