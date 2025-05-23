import InputLabel from '@/components/InputLabel';
import { Input } from "@/components/ui/input";
import { PropsWithChildren } from 'react';

type FeatureProps = {
    name?: string;
    value?: string;
    index?: number;
    variantIndex: number;
    handleFeatureChange?: (index: number, field: "name" | "value", value: string, variantIndex: number) => void;
    addFeatureVariant?: (variantIndex: number) => void;
}

export default function InputsFeatures({
    name, 
    value, 
    index, 
    variantIndex, 
    handleFeatureChange,
    addFeatureVariant,
    children
} : PropsWithChildren<FeatureProps>) {
    return (
        <div className='flex flex-col gap-4'>
            <div className="grid grid-cols-12 gap-3 items-end">
                <div className={`${children ? "col-span-5" : "col-span-6"} relative`}>
                    <InputLabel htmlFor={`feature-name-${index}`} value="Característica" />
      
                    <Input
                        id={`feature-name-${index}`}
                        placeholder="Ej: Material, Color, Talla"
                        value={name}
                        onChange={(e) => 
                            handleFeatureChange &&
                            variantIndex !== undefined &&
                            index !== undefined &&
                            handleFeatureChange(index, "name", e.target.value, variantIndex)}
                    />
                </div>

                <div className="col-span-6">
                    <InputLabel htmlFor={`feature-values-${index}`} value="Valores" />
                    <Input
                        id={`feature-values-${index}`}
                        placeholder="Separados por coma. Ej: Viscoelástico, Queen, Blanco"
                        value={value}
                        onChange={(e) => 
                            handleFeatureChange && 
                            variantIndex !== undefined &&
                            index !== undefined &&
                            handleFeatureChange(index, "value", e.target.value, variantIndex)}
                    />
                </div>

                {children}
            </div>
        </ div>
    )
}