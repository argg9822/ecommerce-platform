import { useProductFormContext } from "@/context/product-form.context";
import { useEffect } from "react";
import { ProductVariants, ProductDimensions, VariantAttributes, ColorOptionsType } from '@/types/product';

const BASE_COLOR_OPTIONS: ColorOptionsType[] = [
    { value: "red", label: "Rojo", color: "text-red-600", selected: false },
    { value: "silver", label: "Plateado", color: "text-gray-500", selected: false },
    { value: "blue", label: "Azul", color: "text-blue-500", selected: false },
    { value: "green", label: "Verde", color: "text-green-600", selected: false },
    { value: "yellow", label: "Amarillo", color: "text-yellow-400", selected: false },
    { value: "purple", label: "Morado", color: "text-purple-400", selected: false },
    { value: "pink", label: "Rosado", color: "text-pink-400", selected: false },
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
                currency_price: 'COP',
                compare_price: undefined,
                stock: 0,
                cost_shipping: undefined,
                dimensions: {
                    length: {
                        value: 0,
                        unit: 'cm',
                    },
                    width: {
                        value: 0,
                        unit: 'cm',
                    },
                    height: {
                        value: 0,
                        unit: 'cm',
                    },
                    weight: {
                        value: 0,
                        unit: 'kg',
                    }
                },
                colors: createColorOptions(),
                attributes: [{name: '', value: ''}],
                is_available: true,
            }
        ];

        setData('variants', newVariants)
    }, []);

    const handleFeatureVariantChange = (index: number, field: "name" | "value", value: string, variantIndex: number) => {
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

    const handleChangeVariantDimensions = (index: number, field: string, value: string | number, dimensionKey: string | undefined) => {
        const updatedVariants = [...data.variants];
        const dimensions: ProductDimensions = { ...updatedVariants[index].dimensions };
        if (dimensionKey === 'unit') {
            dimensions[field as keyof ProductDimensions].unit = value as string;
        }else{
            dimensions[field as keyof ProductDimensions].value = value as number;
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

        if (index > newColors.length) {
            newColors[index] = {value: color as string};
        }else{
            newColors[index].selected = color as boolean;
        }

        handleVariantChange(variantIndex, "colors", newColors);
    }

    const addCustomColorVariant = (variantIndex: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors, {value: "#FFFFFF", selected: true}];
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const removeVariantColor = (variantIndex: number, index: number) => {
        const newVariants = [...data.variants];
        const newColors = [...newVariants[variantIndex].colors];
        newColors.splice(index, 1);
        handleVariantChange(variantIndex, "colors", newColors);
    }

    const addVariant = () => {
        const newVariants = [...data.variants];
        newVariants.push({
            price: undefined,
            compare_price: undefined,
            stock: 0,
            cost_shipping: undefined,
            dimensions: {
                length: {
                    value: 0,
                    unit: 'cm',
                },
                width: {
                    value: 0,
                    unit: 'cm',
                },
                height: {
                    value: 0,
                    unit: 'cm',
                },
                weight: {
                    value: 0,
                    unit: 'kg',
                }
            },
            colors: createColorOptions(),
            attributes: [{name: '', value: ''}],
            is_available: true,
        });
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
        setData
    }
}