import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useCategoryForm } from "@/hooks/form/useCategoryForm";
import PrimaryButton from "@/components/PrimaryButton";
import { FormEventHandler } from "react";
import { Layers } from 'lucide-react';
import { Category } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface CategoryFormProps {
    openDialog: (isOpen: boolean) => void,
    categories: Category[]
}

export default function CategoryForm({ openDialog, categories }: CategoryFormProps) {
    const {
        storeCategory,
        setData,
        data,
        errors,
        processing,
        setImageCategory,
        recentlySuccessful
    } = useCategoryForm();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        storeCategory(() => {
            openDialog(false);
        });
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
                <div className="flex flex-col">
                    <InputLabel htmlFor="name" value='Nombre' />
                    <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} autoComplete="off" className="col-span-3" placeholder="Escribe aquí el nombre de la categoría" />
                    <InputError message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="category_id" value="Categoría padre" />
                    <div className='flex'>
                        <Select onValueChange={(e) => { setData('patern_id', e) }} defaultValue={data.patern_id}>
                            <SelectTrigger className='h-[45px]'>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='null'>Ninguna</SelectItem>
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
                    </div>
                    <InputError message={errors.patern_id} />
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="name" value='Descripción'/>
                    <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[100px] col-span-3" placeholder="Coloca una pequeña pero concisa descripción de la categoría" />
                    <InputError message={errors.description} />
                </div>

                <div>
                    <UploadImages
                        preview={true}
                        onFilesSelected={setImageCategory}
                        accept="image/jpeg, image/png, image/jpg, image/webp"
                        maxSizeInMB={1} />
                </div>
            </div>

            <PrimaryButton type="submit" className="w-full flex justify-center" disabled={processing}>
                {processing ? 'Guardando' : 'Guardar'}
            </PrimaryButton>
        </form>
    );
}