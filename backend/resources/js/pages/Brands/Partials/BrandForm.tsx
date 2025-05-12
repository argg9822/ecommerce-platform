import InputError from "@/components/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useBrandForm } from "@/hooks/form/useBrandForm";
import PrimaryButton from "@/components/PrimaryButton";
import { FormEventHandler } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface BrandFormProps {
    openDialog: (isOpen: boolean) => void
}

export default function CategoryForm( { openDialog } : BrandFormProps ){
    const { toast } = useToast();
    const {
        storeBrand,
        setData,
        data,
        errors,
        processing,
        setLogoBrand,
        recentlySuccessful
    } = useBrandForm();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        storeBrand(() => {
            openDialog(false);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} autoComplete="off" className="col-span-3" placeholder="Escribe aquí el nombre de la marca"/>
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <UploadImages 
                            preview={true}
                            onFilesSelected={setLogoBrand} 
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