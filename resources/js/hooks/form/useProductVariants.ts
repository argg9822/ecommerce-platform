import { useProductFormContext } from "@/context/product-form.context";
import { ProductVariantsType, ProductDimensions } from '@/types/product';
import { useState } from "react";

export default function useProductVariants(){
    const {
        data,
        setData,
        errors,
        recentlySuccessful,
        BASE_NEW_VARIANT
    } = useProductFormContext();

    const [stockIncoherent, setStockIncoherent] = useState(false);

    const handleFeatureVariantChange = (index: number, field: "name" | "value", value: string, variantIndex: number) => {
        const updatedVariants: ProductVariantsType[] = [...data.variants];
        const currentAttributes = updatedVariants[variantIndex].variant_attributes.custom;
        const currentAttribute = currentAttributes[index];
        const updatedAttribute = {
            ...currentAttribute,
            [field]: value,
        };

        const updatedAttributes = [...currentAttributes];
        updatedAttributes[index] = updatedAttribute;

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            variant_attributes: {
                ...updatedVariants[variantIndex].variant_attributes,
                custom: updatedAttributes,
            },
        };
        setData('variants', updatedVariants);
    }

    const removeFeature = (index: number, variantIndex: number) => {
        const updatedVariants: ProductVariantsType[] = [...data.variants];
        const currentAttributes = updatedVariants[variantIndex].variant_attributes.custom;

        if (currentAttributes.length === 1) return;

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            variant_attributes: {
                ...updatedVariants[variantIndex].variant_attributes,
                custom: currentAttributes.filter((_, idx) => idx !== index),
            },
        };

        setData('variants', updatedVariants);
    };

    const addFeatureVariant = (variantIndex: number) => {
        const updatedVariants = [...data.variants];
        const newAttributes = [...updatedVariants[variantIndex].variant_attributes.custom];
        newAttributes.push({name: '', value: ''});
        updatedVariants[variantIndex].variant_attributes.custom = newAttributes;
        setData('variants', updatedVariants);
    }

    const handleChangeVariantDimensions = (index: number, field: string, value: string | number, dimensionKey: string | undefined) => {
        const updatedVariants = [...data.variants];
        const dimensions: ProductDimensions = { ...updatedVariants[index].variant_attributes.dimensions };
        if (dimensionKey === 'unit') {
            dimensions[field as keyof ProductDimensions].unit = value as string;
        }else{
            dimensions[field as keyof ProductDimensions].value = value as number;
        }

        updatedVariants[index].variant_attributes.dimensions = dimensions;
        setData('variants', updatedVariants);
    }

    const handleVariantChange = (
        index: number,
        field: string,
        value: string | boolean | string[] | { value: string; label?: string; color?: string; selected: boolean }[]
    ) => {
        const priceFields = ['price', 'compare_price', 'currency_price', 'stock'];
        const updatedVariants = [...data.variants];

        if (priceFields.includes(field)) {
            (updatedVariants[index] as any)[field] = value;
        }else{
            (updatedVariants[index].variant_attributes as any)[field] = value;
        }
        
        setData('variants', updatedVariants);
        handleStockVariant(updatedVariants);
    }

    const handleStockVariant = (updatedVariants:ProductVariantsType[]) => {
        const totalStockVariants = updatedVariants
            .map(variant => variant.stock ?? 0)
            .reduce((prev, current) => (Number(prev) + Number(current)), 0);
           
        setStockIncoherent(totalStockVariants > (data.stock ?? 0));    
    }

    const removeVariant = (index: number) => {
        if (data.variants.length === 1) return;
        const newVariants = data.variants.filter((_ : ProductVariantsType, idx: number) => index !== idx);
        setData('variants', newVariants);
    }

    const handleColorsChange = (variantIndex: number, index: number, color: string | boolean) => {
        const newVariants = [...data.variants];
        const currentAttributes = [...newVariants[variantIndex].variant_attributes.colors];

        if (index >= currentAttributes.length) {
            currentAttributes[index] = {value: color as string, selected: true};
        }else{
            currentAttributes[index].selected = color as boolean;
        }

        handleVariantChange(variantIndex, "colors", currentAttributes);
    }

    const addCustomColorVariant = (variantIndex: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].variant_attributes.colors, {value: "#FFFFFF", selected: true}];
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const removeVariantColor = (variantIndex: number, index: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].variant_attributes.colors];
        newColors.splice(index, 1);
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const addVariant = () => {
        const newVariants = [...data.variants];
        newVariants.push(BASE_NEW_VARIANT);
        setData('variants', newVariants);
    }

    return {
        handleFeatureVariantChange,
        handleChangeVariantDimensions,
        handleColorsChange,
        addCustomColorVariant,
        removeVariantColor,
        handleVariantChange,
        addFeatureVariant,
        addVariant,
        removeFeature,
        removeVariant,
        errors,
        data,
        stockIncoherent,
        setData
    }
}