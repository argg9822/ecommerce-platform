import InputError from "@/components/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useCategoryForm } from "@/hooks/form/useCategoryForm";
import PrimaryButton from "@/components/PrimaryButton";
import { FormEventHandler, useEffect } from "react";

interface CategoryFormProps {
    openDialog: (isOpen: boolean) => void
}

export default function CategoryForm( { openDialog } : CategoryFormProps ){
    const {
        storeCategory,
        setData,
        data,
        errors,
        processing,
        setImageCategory
    } = useCategoryForm();

    const handleSubmit: FormEventHandler = (e) => {
        storeCategory(e);
        setTimeout(() => {
            if (!processing) {
                openDialog(false);
            }
        }, 1000);
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} autoComplete="off" className="col-span-3" placeholder="Escribe aquí el nombre de la categoría"/>
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Descripción</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[100px] col-span-3" placeholder="Coloca una pequeña pero concisa descripción de la categoría"/>
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <UploadImages 
                            preview={true}
                            onFilesSelected={setImageCategory} 
                            accept="image/jpeg, image/png, image/jpg, image/webp"
                            maxSizeInMB={1}/>
                    </div>
                </div>

                <PrimaryButton type="submit" className="w-full flex justify-center" disabled={processing}>
                    {processing ? 'Guardando' : 'Guardar'}
                </PrimaryButton>
            </form>
        </>
    );
}