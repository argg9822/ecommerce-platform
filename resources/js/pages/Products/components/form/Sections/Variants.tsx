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
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, PlusCircle, CircleHelp, PlusIcon, X } from 'lucide-react';
import { ColorPicker } from '@/components/ui/color-picker';
import { ProductVariantsType } from '@/types/product';
import { ProductDimensions } from '@/types/product';
import ButtonAdd from '@/components/ui/button-add';
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import useProductVariants from '@/hooks/form/useProductVariants';
import DangerButton from '@/components/ui/danger-button';
import InputWithAddons from '@/components/ui/input-with-addons';
import InputsFeatures from "@/pages/Products/components/form/InputsFeatures";

export default function Variants() {
    const {
        handleFeatureVariantChange,
        handleChangeVariantDimensions,
        handleVariantChange,
        handleColorsChange,
        addCustomColorVariant,
        addFeatureVariant,
        addVariant,
        removeFeature,
        removeVariant,
        removeVariantColor,
        errors,
        data,
        stockIncoherent,
    } = useProductVariants();

    const dimensionUnits = ["cm", "m", "in", "ft"];
    const weightUnits = ["g", "kg", "lb", "oz"];

    const getDimensionsSpanish = (key: 'length' | 'width' | 'height' | 'weight') => {
        const dimension = {
            length: 'Largo',
            width: 'Ancho',
            height: 'Alto',
            weight: 'Peso'
        };

        return dimension[key];
    }

    return (
        <Card className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-end w-full">
                <ButtonAdd
                    onClick={addVariant}
                    className="mb-1" 
                    title="Añade un nuevo grupo de especificaciones"
                    text="Agregar nueva variante"
                />
            </div>

            <Tabs defaultValue="variant-1">
                <TabsList className={`grid bg-gray-700 rounded-lg grid-cols-12`}>
                    {data.variants.map((_: ProductVariantsType, variant_index:number) => (
                        <TabsTrigger
                            key={variant_index}
                            value={`variant-${variant_index}`} 
                            className={`text-center text-gray-200 hover:text-gray-100 hover:bg-gray-600
                            focus:bg-black/50 transition-all duration-200 w-full col-span-${(variant_index == 0 && data.variants.length> 4) ? 3 : Math.floor(12/data.variants.length)}`}
                        >
                            {variant_index === 0 ? "Características principales" : `Variante ${variant_index}`}
                        </TabsTrigger>
                    ))
                    }
                </TabsList>

                {data.variants.map((variant: ProductVariantsType, variant_index: number) => (
                    <TabsContent value={`variant-${variant_index}`} key={variant_index} className="bg-gray-900/50">
                        <CardContent key={variant_index} className="space-y-4 rounded-lg">
                            <div className="flex justify-between items-center">                                
                                <div className="flex flex-row space-x-2 items-center">
                                    <Checkbox
                                        id={`is_available_${variant_index+1}`}
                                        checked={variant.is_available}
                                        onCheckedChange={(checked) => handleVariantChange(variant_index, 'is_available', !!checked)}
                                    />
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
                                
                                <div>
                                    {(data.variants.length > 1 && variant_index >= 1 ) && (
                                        <DangerButton
                                            type="button"
                                            title="Eliminar variante"
                                            onClick={() => removeVariant(variant_index)}
                                            className="text-red-500 hover:text-gray-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </DangerButton>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-12 gap-5 items-end">
                                <div className="col-span-12">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row">
                                            <InputLabel htmlFor="feature-color" value="Colores disponibles" />
                                            <span className="text-gray-500 ml-2">(Opcional)</span>
                                        </div>
                                        
                                        <Button 
                                            type="button" 
                                            className="max-h-[20px] bg-transparent py-0 text-blue-500 hover:text-blue-700" 
                                            title="Añade un color personalizado" 
                                            onClick={() => addCustomColorVariant(variant_index)}
                                        >
                                            <PlusIcon />Agregar color personalizado
                                        </Button>
                                    </div>
                                    <div className="flex flex-row gap-3 bg-gray-950/50 rounded-lg items-center justify-center p-1">
                                        {data.variants[variant_index].variant_attributes.colors.map((item, index) => (
                                            item.value.startsWith("#") ? (
                                                <div className="variant__color-picker relative flex items-center gap-2" key={index}>
                                                    <ColorPicker
                                                        value={item.value}
                                                        onChange={(e) => handleColorsChange(variant_index, index, e)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        title="Eliminar color"
                                                        onClick={() => removeVariantColor(variant_index, index)}
                                                        className="variant__color-picker__delete"
                                                    >
                                                        <Trash2 className="h-2 w-2" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <ToggleGroup 
                                                    key={index}
                                                    type="single" 
                                                    size="sm"
                                                    value={item.selected ? item.value : ''}
                                                    onValueChange={(selectedValues: string) => {
                                                        const isSelected = selectedValues.includes(item.value);
                                                        handleColorsChange(variant_index, index, isSelected);
                                                    }}
                                                >
                                                    <ToggleGroupItem
                                                        value={item.value}
                                                        className="data-[state=on]:bg-gray-800 data-[state=on]:shadow-lg
                                                            bg-transparent hover:bg-gray-700/50
                                                            border-0 rounded-md px-3 py-1 text-sm
                                                            transition-all duration-150
                                                            flex items-center gap-2"
                                                    >
                                                        <span className={item.color}>{item.label}</span>
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                            )
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-12">
                                    <InputLabel value="Dimensiones y peso" />

                                    <div className="flex flex-row gap-1 outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                        {data.variants[variant_index].variant_attributes.dimensions && 
                                            Object.entries(data.variants[variant_index].variant_attributes.dimensions).map(([key, { value, unit }]) => (
                                                <InputWithAddons
                                                    key={key}
                                                    value={value || ""}
                                                    placeholder="0"
                                                    className="pl-[60px]"
                                                    onChange={(e) => handleChangeVariantDimensions(variant_index, key, String(e), "dimension")}
                                                    inputId={`${key}-${variant_index + 1}`}
                                                    prefix={getDimensionsSpanish(key as 'length' | 'width' | 'height' | 'weight')}
                                                    suffixes={key === 'weight' ? weightUnits : dimensionUnits}
                                                    sufixValue={unit || ""}
                                                    onChangeSuffix={(key, value) => handleChangeVariantDimensions(variant_index, unit , value, "unit")}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                                {variant_index >= 1 && (
                                <>
                                    {/* Precio de la variante */}
                                    <div className="col-span-4">
                                        <InputWithAddons
                                            value={variant.price || ""}
                                            label="Precio de esta variante"
                                            placeholder="0.00"
                                            type="number"
                                            className="pl-[60px]"
                                            onChangeWithEvent={(e) => handleVariantChange(variant_index, 'price', e.target.value)}
                                            inputId={`variant_price_${variant_index}`}
                                            prefix="Precio"
                                            suffixes={["COP", "USD", "EUR"]}
                                            sufixValue="COP"
                                            onChangeSuffix={(e) => handleVariantChange(variant_index, 'currency_price', e)}
                                        />
                                    </div>

                                    {/* Precio comparativo variante */}
                                    <div className="col-span-4">
                                        <InputWithAddons
                                            value={variant.compare_price || ""}
                                            placeholder="0.00"
                                            type="number"
                                            className="pl-[145px]"
                                            onChangeWithEvent={(e) => handleVariantChange(variant_index, 'compare_price', e.target.value)}
                                            inputId={`variant_compare_price_${variant_index}`}
                                            prefix="Precio comparativo"
                                            suffixes={["COP", "USD", "EUR"]}
                                            sufixValue="COP"
                                            onChangeSuffix={(e) => handleVariantChange(variant_index, 'currency_price', e)}
                                        />
                                    </div>
                                    
                                    {/* Stock variante */}
                                    <div className="col-span-4">
                                        <div className="flex justify-between">
                                            <InputLabel htmlFor={`variant_stock_${variant_index}`} value="Stock" />
                                            {stockIncoherent && (
                                                <InputError message="¡Stock incoherente!" />
                                            )}
                                            <span className="text-gray-500">(Opcional)</span>
                                        </div>
                                        <Input 
                                            id={`variant_stock_${variant_index}`}
                                            type="number" 
                                            value={variant.stock}
                                            onChange={(e) => handleVariantChange(variant_index, 'stock', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.stock} />                                        
                                    </div>
                                </>
                                )}
                            </div>
                            
                            <Separator />

                            <div className='flex flex-col gap-4'>
                                {variant.variant_attributes.custom && variant.variant_attributes.custom.map((feature, index) => (
                                    <InputsFeatures
                                        key={index}
                                        name={feature.name}
                                        value={feature.value}
                                        index={index}
                                        variantIndex={variant_index}
                                        handleFeatureChange={handleFeatureVariantChange}
                                    >
                                        {(variant.variant_attributes.custom.length > 1) && (
                                            <div className="col-span-1">
                                                <Button
                                                    type="button"
                                                    onClick={() => removeFeature(index, variant_index)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </InputsFeatures>
                                ))}

                                <ButtonAdd
                                    onClick={() => addFeatureVariant(variant_index)}
                                    className="mb-1" 
                                    title="Añade una nueva característica"
                                    text="Agregar nueva característica"
                                />
                                <InputError message={errors.variants} />
                            </div>
                        </CardContent>
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    )
}
