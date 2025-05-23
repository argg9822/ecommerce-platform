import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { useProductFormContext } from '@/context/product-form.context';
import InputLabel from '@/components/InputLabel';
import ButtonAdd from "@/components/ui/button-add";

export default function FeaturesCard(){
    const {
        data,
        setData,
        errors
    } = useProductFormContext();

    return (                          
        <div className="grid grid-cols gap-4">
            <div className="col-span-12 flex flex-row space-x-2 items-center">
                <Checkbox
                    id="is_available"
                    checked={data.is_available}
                    onCheckedChange={(checked) => setData('is_available_product', !!checked)}
                />
                <div className="flex flex-col">
                    <label
                        htmlFor="is_available"
                        className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                    >
                        Disponible
                    </label>
                    <p className="text-sm text-gray-600">
                        Establecer producto como disponible en la tienda
                    </p>
                </div>
            </div>

            <div className="col-span-12">
                <div className="flex flex-row items-center justify-between">
                    <InputLabel htmlFor="feature-color" value="Colores disponibles" />
                    <ButtonAdd
                        text="Añade un color personalizado" 
                        onClick={() => addCustomColor(variant_index)}
                    >
                        <PlusIcon />Agregar color personalizado
                    </ButtonAdd>
                </div>
                <div className="flex flex-row gap-3 bg-gray-950/50 rounded-lg items-center justify-center p-1">
                    {variant.colors.map((item, index) => (
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
                                onValueChange={(selectedValues) => {
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
        </div>
    
    )
}