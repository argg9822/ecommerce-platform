import { useProductFormContext } from "@/context/product-form.context";
import { ProductVariantsType, ProductDimensions, VariantAttributes, ColorOptionsType } from '@/types/product';

export default function useProductVariants(){
    const {
        data,
        setData,
        errors,
        createColorOptions,
        recentlySuccessful
    } = useProductFormContext();

    const handleFeatureVariantChange = (index: number, field: "name" | "value", value: string, variantIndex: number) => {
        const updatedVariants: ProductVariantsType[] = [...data.variants];
        const currentAttributes: VariantAttributes[] = updatedVariants[variantIndex].variant_attributes;
        const currentAttribute = currentAttributes[index];
        const updatedAttribute = {
            ...currentAttribute,
            [field]: value,
        };
        const updatedAttributes = [...currentAttributes];
        updatedAttributes[index] = updatedAttribute;
        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            variant_attributes: updatedAttributes,
        };
        setData('variants', updatedVariants);
    }

    const removeFeature = (index: number, variantIndex: number) => {
        const updatedVariants: ProductVariantsType[] = [...data.variants];
        const currentAttributes = updatedVariants[variantIndex].variant_attributes;

        if (currentAttributes.length === 1) return;

        updatedVariants[variantIndex] = {
            ...updatedVariants[variantIndex],
            variant_attributes: currentAttributes.filter((_, idx) => idx !== index),
        };

        setData('variants', updatedVariants);
    };

    const addFeatureVariant = (variantIndex: number) => {
        const updatedVariants = [...data.variants];
        const newAttributes = [...updatedVariants[variantIndex].variant_attributes];
        newAttributes.push({name: '', value: ''});
        updatedVariants[variantIndex].variant_attributes = newAttributes;
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
        const newVariants = data.variants.filter((_ : ProductVariantsType, idx: number) => index !== idx);
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
            currency_price: 'COP',
            compare_price: undefined,
            stock: 0,
            shipment: undefined,
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
            variant_attributes: [{name: '', value: ''}],
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