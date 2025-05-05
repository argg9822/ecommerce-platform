import InputError from "@/components/InputError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "@/components/UploadImages";
import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import PrimaryButton from "@/components/PrimaryButton";
import { useToast } from "@/hooks/use-toast";

export default function BrandForm(){
    const { toast } = useToast();

    const {
        data,
        setData,
        errors,
        post,
        reset
    } = useForm({
        name: '',
        description: '',
        logo: null as File | null
    });

    const { success, error } = usePage().props as {
        success?:  {
            title?: string,
            description?: string
        },
        error?:  {
            title?: string,
            description?: string
        },
    }

    useEffect(() => {
        if (success) {
            console.log(success);
            
            toast({
                title: success.title,
                description: success.description
            });
        }

        if (error) {
            toast({
                title: error.title,
                description: error.description
            });
        }
    }, [success, error]);

    const productNameRef = useRef<HTMLInputElement>(null);

    const storeCategory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();

            },
            onError: () => {
                if (errors.name) {
                    reset('name');
                    productNameRef.current?.focus();
                }

                if (errors.logo) reset('logo');
                if (errors.description) reset('description');
            }
        });
    }

    const setLogoBrand = (newImage: File[]) => {
        setData('logo', newImage[0]);
    }

    return (
        <>
            <form onSubmit={storeCategory} encType="multipart/form-data">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} className="col-span-3" placeholder="Escribe aquí el nombre de la categoría"/>
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
                            onFilesSelected={setLogoBrand} 
                            accept="image/jpeg, image/png, image/jpg, image/webp"
                            maxSizeInMB={1}/>
                    </div>
                </div>

                <PrimaryButton type="submit" className="w-full flex justify-center">
                    Guardar
                </PrimaryButton>
            </form>
        </>
    );
}