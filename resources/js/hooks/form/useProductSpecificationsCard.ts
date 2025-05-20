import { useProductFormContext } from "@/context/product-form.context";
import { useEffect, useState } from "react";
import { ProductVariants, ProductDimensions, VariantAttributes } from '@/types/product';

type ColorOptionsType ={
    value: string;
    label?: string;
    color?: string;
    selectedColor?: string;
}

export default function useProductSpecificationsCard(){
    const {
        data,
        setData,
        errors,
        recentlySuccessful
    } = useProductFormContext();

    useEffect(() => {
        setData('variants', [
            {
                price: undefined,
                compare_prince: undefined,
                stock: 0,
                cost_shipping: undefined,
                dimensions: {
                    length: 0,
                    width: 0,
                    height: 0,
                    unitOfMeasurement: 'cm'
                },
                colors: [],
                attributes: [{name: '', value: ''}],
                weight: undefined,
                is_available: true,
            },
            {
                price: undefined,
                compare_prince: undefined,
                stock: 0,
                cost_shipping: undefined,
                dimensions: {
                    length: 0,
                    width: 0,
                    height: 0,
                    unitOfMeasurement: 'cm'
                },
                colors: [],
                attributes: [{name: '', value: ''}],
                weight: undefined,
                is_available: true,
            },
        ])
    }, []);

    const handleFeatureChange = (index: number, field: "name" | "values", value: string) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][field] = value;
        setData('variants', updatedFeatures);
    }

    const removeFeature = (index: number, variantIndex: number) => {
        const updatedVariants: ProductVariants[] = [...data.variants];
        const currentAttributes = updatedVariants[variantIndex].attributes;

        if (currentAttributes.length === 1) return;

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            attributes: currentAttributes.filter((_, idx) => idx !== index),
        };

        setData('variants', updatedVariants);
    };

    const addFeature = (variantIndex: number) => {
        const newAttributesVariants = [...data.variants];
        const newAttributes = [...newAttributesVariants[variantIndex].attributes];
        newAttributes.push({name: '', value: ''});
        newAttributesVariants[variantIndex].attributes = newAttributes;
        setData('variants', newAttributesVariants);
    }

    const [colorOptions, setColorOptions] = useState<ColorOptionsType[]>([
        { value: "red", label: "Rojo", color: "text-red-600", selectedColor: "bg-red-700" },
        { value: "blue", label: "Azul", color: "text-blue-500", selectedColor: "bg-blue-700" },
        { value: "green", label: "Verde", color: "text-green-600", selectedColor: "bg-green-700" },
        { value: "yellow", label: "Amarillo", color: "text-yellow-400", selectedColor: "bg-yellow-700" },
        { value: "purple", label: "Morado", color: "text-purple-400", selectedColor: "bg-purple-700" },
        { value: "pink", label: "Rosado", color: "text-pink-400", selectedColor: "bg-pink-700" }
    ]);

    const handleVariantChange = (index: number, field: string, value: string | boolean | string[]) => {
        const updatedVariants = [...data.variants];
        const dimensionsAttributes = ['length', 'width', 'height', 'unitOfMeasurement'];

        if (dimensionsAttributes.includes(field)) {
            const dimensions: ProductDimensions = { ...updatedVariants[index].dimensions };
            if (field === 'unitOfMeasurement') {
                dimensions.unitOfMeasurement = value as ProductDimensions['unitOfMeasurement'];
            } else {
                (dimensions as any)[field] = parseFloat(value as string);
            }
            updatedVariants[index].dimensions = dimensions;
        }else{
            (updatedVariants[index] as any)[field] = value;
        }
        
        setData('variants', updatedVariants);
    }

    const removeVariant = (index: number) => {
        if (data.variants.length === 1) return;
        const newVariants = data.variants.filter((_ : ProductVariants, idx: number) => index !== idx);
        setData('variants', newVariants);
    }

    return {
        handleFeatureChange,
        addFeature,
        removeFeature,
        handleVariantChange,
        removeVariant,
        colorOptions,
        setColorOptions,
        errors,
        data,
        setData
    }
}