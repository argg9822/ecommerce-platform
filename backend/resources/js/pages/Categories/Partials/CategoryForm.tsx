import InputError from "@/components/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useCategoryForm } from "@/hooks/form/useCategoryForm";
import PrimaryButton from "@/components/PrimaryButton";
import { FormEventHandler } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface CategoryFormProps {
    openDialog: (isOpen: boolean) => void
}

export default function CategoryForm( { openDialog } : CategoryFormProps ){
    const { toast } = useToast();
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
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} autoComplete="off" className="col-span-3" placeholder="Escribe aquí el nombre de la categoría"/>
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="name">Descripción</Label>
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