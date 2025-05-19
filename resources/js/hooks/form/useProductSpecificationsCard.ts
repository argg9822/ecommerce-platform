import { useProductFormContext } from "@/context/product-form.context";
import { useEffect } from "react";
import { ProductVariants } from '@/types/product';

export default function useProductSpecificationsCard(){
    const {
        data,
        setData,
        errors,
        recentlySuccessful
    } = useProductFormContext();

    useEffect(() => {
        setData('features', [
            {name: '', values: ''}
        ]);

        setData('variants', [
            {
                price: undefined,
                compare_prince: undefined,
                stock: 0,
                cost_shipping: undefined,
                dimensions: '',
                colors: [],
                variant_attributes: [{name: '', values: ''}],
                weight: undefined,
                is_available: true,
            },
            {
                price: undefined,
                compare_prince: undefined,
                stock: 0,
                cost_shipping: undefined,
                dimensions: '',
                colors: [],
                variant_attributes: [{name: '', values: ''}],
                weight: undefined,
                is_available: true,
            }
        ])
    }, []);

    const handleFeatureChange = (index: number, field: "name" | "values", value: string) => {
        const updatedFeatures = [...data.features];
        updatedFeatures[index][field] = value;
        setData('features', updatedFeatures);
    }

    const removeFeature = (index: number) => {
        if(data.features.length === 1) return;
        const newFeatures = data.features.filter((_, idx) => index !== idx);
        setData('features', newFeatures);
    }
    
    const addFeature = () => {
        setData('features', [...data.features, {name: '', values: ''}])
    }

    const colorOptions = [
        { value: "red", label: "Rojo", color: "text-red-600", selectedColor: "bg-red-700" },
        { value: "blue", label: "Azul", color: "text-blue-500", selectedColor: "bg-blue-700" },
        { value: "green", label: "Verde", color: "text-green-600", selectedColor: "bg-green-700" },
        { value: "yellow", label: "Amarillo", color: "text-yellow-400", selectedColor: "bg-yellow-700" },
        { value: "purple", label: "Morado", color: "text-purple-400", selectedColor: "bg-purple-700" },
        { value: "pink", label: "Rosado", color: "text-pink-400", selectedColor: "bg-pink-700" },
    ];

    const handleVariantChange = (index: number, field: string, value: string | boolean) => {
        const updatedVariants = [...data.variants];
        updatedVariants[index][field] = value;
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
        errors,
        data,
        setData
    }
}