import { Brand } from '@/types';
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, CircleHelp, Layers, Check, ChevronsUpDown } from 'lucide-react';
import { useProductFormContext } from '@/context/product-form.context';
import { Button } from '@/components/ui/button';
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import { Checkbox } from "@/components/ui/checkbox"
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
} from "@/components/ui/popover";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from 'react';

type MainInformationCardProps = {
    brands: Brand[],
    setOpenDialogBrand: (isOpen: boolean) => void,
    setOpenDialogCategory: (isOpen: boolean) => void,
    categories: Category[]
}

export default function MainInformationCard({
    brands,
    setOpenDialogBrand,
    setOpenDialogCategory,
    categories
}: MainInformationCardProps) {
    const {
        data,
        setData,
        errors,
        handleNumberChangeSelect
    } = useProductFormContext();
    
    const [openCategoriesSelect, setOpenCategoriesSelect] = useState(false);

    const selectCategories = categories.map(category => {
        return {
            value: category.id,
            label: category.name,
            image: category.image,
            description: category.description
        }
    })

    const categoryFilter = (value:string, search: string) => {
        const item = selectCategories.find(c => c.value === parseInt(value));
        return item?.label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle><h2 className="text-lg text-center">Información del producto</h2></CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nombre del producto" />
                        <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-column">
                                <InputLabel htmlFor="brand_id" value="Marca" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                        </TooltipTrigger>

                                        <TooltipContent>
                                            <p className="text-gray-100">Si no es marca propia, puedes añadirla aquí</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Button type="button" className="max-h-[20px] bg-transparent py-0 text-blue-500 hover:text-blue-700" title="Añade una marca" onClick={() => setOpenDialogBrand(true)}>
                                <PlusIcon />Agregar marca
                            </Button>
                        </div>
                        

                        <div className='flex'>
                            <Select onValueChange={(e) => { handleNumberChangeSelect(e, 'brand_id') }} defaultValue={String(data.brand_id)}>
                                <SelectTrigger className='h-[30px]'>
                                    <SelectValue placeholder="Selecciona una marca" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem
                                        value="Propia">
                                        <span>Propia</span>
                                    </SelectItem>
                                    {brands.length > 0 && (brands.map((brand) => (
                                        <SelectItem
                                            key={brand.id}
                                            value={String(brand.id)}>
                                            <span>{brand.name}</span>
                                        </SelectItem>
                                    ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.category_id} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Descripción" />
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="min-h-[100px]"
                        placeholder="Describe tu producto con detalles útiles: características, beneficios y uso ideal. Ejemplo: «Reloj resistente al agua, correa ajustable y diseño moderno. Perfecto para deportistas y ocasiones casuales.»"
                    />
                    <InputError message={errors.description} />
                </div>

                <div>
                    <div className="flex flex-row justify-between">
                        <InputLabel htmlFor="category_id" value="Categoría" />
                        <Button type="button" className="max-h-[20px] bg-transparent text-blue-500 hover:text-blue-700" title="Añade una categoría" onClick={() => setOpenDialogCategory(true)}>
                            <PlusIcon />Agregar categoría
                        </Button>
                    </div>
                    <Popover open={openCategoriesSelect} onOpenChange={setOpenCategoriesSelect}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCategoriesSelect}
                                className={`
                                    w-full justify-between px-4 py-2
                                    hover:bg-gray-900
                                    border border-gray-600 hover:border-gray-600
                                    text-gray-200 hover:text-white
                                    rounded-lg transition-all duration-200
                                    ${!data.category_id ? "text-gray-400" : ""}
                                `}
                            >
                                {data.category_id
                                    ? selectCategories.find((category) => category.value === data.category_id)?.label
                                    : "Selecciona una categoría"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70 hover:opacity-100 transition-opacity" />
                            </Button>
                        </PopoverTrigger>
                        
                        <PopoverContent
                            className={`
                                w-[var(--radix-popover-trigger-width)] p-0
                                bg-gray-900 border border-gray-700 rounded-lg
                                shadow-lg shadow-black/50
                                overflow-hidden
                                animate-in fade-in-80 zoom-in-95
                            `}
                            align="start"
                            sideOffset={5}
                        >
                            <Command filter={categoryFilter} className="bg-transparent">
                                <CommandInput
                                    placeholder="Buscar categoría..."
                                />
                                <CommandList className="max-h-[250px] overflow-y-auto custom-scrollbar">
                                    <CommandEmpty className="px-3 py-2.5 text-sm text-gray-500">
                                        No hay coincidencias
                                    </CommandEmpty>
                                    <CommandGroup className="p-1">
                                        {selectCategories.map((category) => (
                                            <CommandItem
                                                key={category.value}
                                                value={String(category.value)}
                                                onSelect={(currentValue) => {
                                                    setData('category_id', parseInt(currentValue))
                                                    setOpenCategoriesSelect(false)
                                                }}
                                                className={`
                                                    flex items-center
                                                    aria-selected:bg-gray-800 aria-selected:text-white
                                                `}
                                                >
                                                <div className='flex flex-row'>{ }
                                                    <div className='flex place-content-center flex-wrap'>
                                                        <div className="w-8 h-8 rounded-sm overflow-hidden mr-3">
                                                            {category?.image ? (
                                                                <img
                                                                    src={route('tenant_media_owner', { path: category?.image })}
                                                                    alt={category.label}
                                                                    className="w-full h-full object-cover opacity-75"
                                                                />
                                                            ) : (<Layers />)}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col text-left'>
                                                        <span>{category.label}</span>
                                                        <span className='text-sm text-gray-500'>{category?.description}</span>
                                                    </div>
                                                </div>
                                                <Check
                                                    className={`
                                                        ml-auto h-4 w-4
                                                        ${data.category_id === category.value ? "opacity-100 text-blue-400" : "opacity-0"}
                                                        transition-opacity duration-200
                                                    `}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.category_id} />
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="is_available"
                            checked={data.is_available_product}
                            onCheckedChange={(checked) => setData('is_available_product', !!checked)}
                        />
                        <div className="grid leading-none">
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
                </div>
            </CardContent>
        </Card>
    );
}