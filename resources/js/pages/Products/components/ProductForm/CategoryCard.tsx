import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox"
import InputLabel from '@/components/InputLabel';
import SecondaryButton from '@/components/SecondaryButton';
import { PlusIcon, Layers, CircleHelp, Trash2, PlusCircle } from 'lucide-react';
import InputError from '@/components/InputError';
import { Textarea } from '@/components/ui/textarea';
import { useProductFormContext } from "@/context/product-form.context";
import { Category } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type CategoryCardProps = {
    setOpenDialogCategory: (isOpen: boolean) => void,
    categories: Category[]
}

export default function CategoryCard( {setOpenDialogCategory, categories} : CategoryCardProps ) {
    const {
        data,
        setData,
        errors,
        recentlySuccessful,
        handleNumberChangeSelect
    } = useProductFormContext();

    useEffect(() => {
        setData('features', [{name: '', values: ''}]);
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

    return (
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-lg text-center">Especificaciones del producto</h2>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <InputLabel htmlFor="category_id" value="Categoría" />
                    <div className='flex'>
                        <Select onValueChange={(e) => { handleNumberChangeSelect(e, 'category_id') }} defaultValue={String(data.category_id)}>
                            <SelectTrigger className='h-[45px]'>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}>
                                        <div className='flex flex-row'>{ }
                                            <div className='flex place-content-center flex-wrap'>
                                                <div className="w-8 h-8 rounded-sm overflow-hidden mr-3">
                                                    {category?.image ? (
                                                        <img
                                                            src={route('tenant_media_owner', { path: category?.image })}
                                                            alt={category.name}
                                                            className="w-full h-full object-cover opacity-75"
                                                        />
                                                    ) : (<Layers />)}
                                                </div>
                                            </div>
                                            <div className='flex flex-col text-left'>
                                                <span>{category.name}</span>
                                                <span className='text-sm text-gray-500'>{category?.description}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <SecondaryButton type='button' className='max-h-[45px]' title='Añadir categoría' onClick={() => setOpenDialogCategory(true)}>
                            <PlusIcon className="w-5 h-5 text-gray-100" />
                        </SecondaryButton>
                    </div>
                    <InputError message={errors.category_id} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="items-top flex space-x-2">
                        <Checkbox
                            id="is_available"
                            checked={data.is_available}
                            onCheckedChange={(checked) => setData('is_available', !!checked)}
                        />
                        <div className="grid gap-1.5 leading-none">
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

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_feature"
                            checked={Boolean(data.is_feature) || false}
                            onCheckedChange={(checked) => setData('is_feature', !!checked)}
                        />
                        <div className="grid leading-none">
                            <label
                                htmlFor="is_feature"
                                className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                            >
                                Destacar en homepage
                            </label>
                            <p className="text-sm text-gray-600">
                                Hacer que sea más visible este producto
                            </p>
                        </div>
                    </div>
                </div>

                <Separator/>

                <div className="flex flex-col gap-4">
                    {data.features.map((feature, index) => (
                        <div key={index} className="grid grid-cols-12 gap-3 items-end">
                            <div className="col-span-5">
                                <InputLabel htmlFor={`feature-name-${index}`} value="Característica"/>
                                <Input
                                    id={`feature-name-${index}`}
                                    placeholder="Ej: Material, Color, Tamaño"
                                    value={feature.name}
                                    onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                                />
                            </div>

                            <div className="col-span-6">
                                <InputLabel htmlFor={`feature-values-${index}`} value="Valores" />
                                <Input
                                id={`feature-values-${index}`}
                                placeholder="Separados por coma. Ej: Viscoelástico, Queen, Blanco"
                                value={feature.values}
                                onChange={(e) => handleFeatureChange(index, "values", e.target.value)}
                                />
                            </div>

                            <div className="col-span-1">
                                {data.features.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFeature(index)}
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
                        onClick={addFeature}
                        className="mt-2 gap-2 bg-gray-900 hover:bg-gray-800 text-gray-50 transition-all duration-300 shadow-lg hover:shadow-gray-900/30 rounded-lg border border-gray-700 hover:border-gray-600 group"
                        >
                        <PlusCircle className="h-4 w-4 text-gray-300 group-hover:text-white" />
                        <span className="text-gray-100 group-hover:text-white font-medium text-sm">
                            Agregar otra característica
                        </span>
                    </Button>
                    <InputError message={errors.features} />
                </div>
            </CardContent>
        </Card>
    )
}