import { useProductFormContext } from "@/context/product-form.context";
import { useEffect, useState } from "react";
import { ProductVariants, ProductDimensions, VariantAttributes, ColorOptionsType } from '@/types/product';

const BASE_COLOR_OPTIONS: ColorOptionsType[] = [
    { value: "red", label: "Rojo", color: "text-red-600", selectedColor: "bg-red-700", selected: false },
    { value: "blue", label: "Azul", color: "text-blue-500", selectedColor: "bg-blue-700", selected: false },
    { value: "green", label: "Verde", color: "text-green-600", selectedColor: "bg-green-700", selected: false },
    { value: "yellow", label: "Amarillo", color: "text-yellow-400", selectedColor: "bg-yellow-700", selected: false },
    { value: "purple", label: "Morado", color: "text-purple-400", selectedColor: "bg-purple-700", selected: false },
    { value: "pink", label: "Rosado", color: "text-pink-400", selectedColor: "bg-pink-700", selected: false }
];

export default function useProductSpecificationsCard(){
    const {
        data,
        setData,
        errors,
        recentlySuccessful
    } = useProductFormContext();

    const createColorOptions = () => JSON.parse(JSON.stringify(BASE_COLOR_OPTIONS));

    useEffect(() => {
        const newVariants = [
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
                colors: createColorOptions(),
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
                colors: createColorOptions(),
                attributes: [{name: '', value: ''}],
                weight: undefined,
                is_available: true,
            },
        ];

        setData('variants', newVariants)
    }, []);

    const handleFeatureChange = (index: number, field: "name" | "value", value: string, variantIndex: number) => {
        const updatedVariants: ProductVariants[] = [...data.variants];
        const currentAttributes: VariantAttributes[] = updatedVariants[variantIndex].attributes;
        const currentAttribute = currentAttributes[index];
        const updatedAttribute = {
            ...currentAttribute,
            [field]: value,
        };
        const updatedAttributes = [...currentAttributes];
        updatedAttributes[index] = updatedAttribute;
        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            attributes: updatedAttributes,
        };
        setData('variants', updatedVariants);
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

    const addFeatureVariant = (variantIndex: number) => {
        const updatedVariants = [...data.variants];
        const newAttributes = [...updatedVariants[variantIndex].attributes];
        newAttributes.push({name: '', value: ''});
        updatedVariants[variantIndex].attributes = newAttributes;
        setData('variants', updatedVariants);
    }

    const handleChangeVariantDimensions = (index: number, field: string, value: string ) => {
        const updatedVariants = [...data.variants];
        const dimensions: ProductDimensions = { ...updatedVariants[index].dimensions };
        if (field === 'unitOfMeasurement') {
                dimensions.unitOfMeasurement = value as ProductDimensions['unitOfMeasurement'];
        } else {
            (dimensions as any)[field] = parseFloat(value as string);
        }
        updatedVariants[index].dimensions = dimensions;
        setData('variants', updatedVariants);
    }

    const handleVariantChange = (index: number, field: string, value: string | boolean | string[] | ColorOptionsType[]) => {
        const updatedVariants = [...data.variants];
        (updatedVariants[index] as any)[field] = value;
        setData('variants', updatedVariants);
    }

    const removeVariant = (index: number) => {
        if (data.variants.length === 1) return;
        const newVariants = data.variants.filter((_ : ProductVariants, idx: number) => index !== idx);
        setData('variants', newVariants);
    }

    const handleColorsChange = (variantIndex: number, index: number, color: string | boolean) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors];

        if (index > 5) {
            newColors[index] = {value: color as string};
        }else{
            newColors[index].selected = color as boolean;
        }

        handleVariantChange(variantIndex, "colors", newColors);
    }

    const addCustomColor = (variantIndex: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors, {value: "#FFFFFF"}];
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const removeVariantColor = (variantIndex: number, index: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors];
        newColors.splice(index, 1);
        handleVariantChange(variantIndex, "colors", newColors);
    }

    return {
        handleFeatureChange,
        handleChangeVariantDimensions,
        handleColorsChange,
        addCustomColor,
        removeVariantColor,
        handleVariantChange,
        addFeatureVariant,
        removeFeature,
        removeVariant,
        errors,
        data,
        setData
    }
}