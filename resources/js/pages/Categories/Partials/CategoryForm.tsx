import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useCategoryForm } from "@/hooks/form/useCategoryForm";
import PrimaryButton from "@/components/PrimaryButton";
import { FormEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Category } from '@/types/category';

interface CategoryFormProps {
    openDialog: (isOpen: boolean) => void;
    category?: Category| null;
}

export default function CategoryForm({ openDialog, category }: CategoryFormProps) {
    const {
        storeCategory,
        updateCategory,
        setData,
        data,
        errors,
        processing,
        setImageCategory,
        recentlySuccessful,
        categories
    } = useCategoryForm(category ? { category } : {});

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (category) {
            updateCategory(() => {
                openDialog(false);
            });
        }else{
            storeCategory(() => {
                openDialog(false);
            });
        }
    }

    const parentsCategories = categories.filter(category => !category.parent);

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
                <div className="flex flex-col">
                    <InputLabel htmlFor="name" value='Nombre' />
                    <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} autoComplete="off" className="col-span-3" placeholder="Escribe aquí el nombre de la categoría" />
                    <InputError message={errors.name} />
                </div>

                {parentsCategories.length > 0 && (
                    <div>
                        <InputLabel htmlFor="category_id" value="Categoría padre" />
                        <div className='flex'>
                            <Select onValueChange={(e) => { setData('parent_id', Number(e)) }} defaultValue={String(data.parent_id) || undefined}>
                                <SelectTrigger className='h-[30px]'>
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>

                                <SelectContent>
                                    {parentsCategories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={String(category.id)}>
                                            <div className='flex flex-row'>
                                                <div className='flex flex-col text-left'>
                                                    <span>{category.name}</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError message={errors.parent_id} />
                    </div>
                )}
                
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