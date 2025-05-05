import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FlashMessage  {
    title?: string;
    message?: string;
}

export function useCategoryForm(){
    const { toast } = useToast();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        name: '',
        description: '',
        image: null as File | null
    });
    const test = usePage().props;
    const { flash } = usePage().props as {
        flash?: {
            success?: FlashMessage;
            error?: FlashMessage;
        };
    };

    useEffect(() => {
        if(!flash) return;
        
        const timer = setTimeout(() => {
            if (flash?.success) {
                toast({
                    variant: "default",
                    title: flash.success.title || 'Éxito',
                    description: flash.success.message || 'Operación completada correctamente',
                });
            }
    
            if (flash?.error) {
                toast({
                    variant: "destructive",
                    title: flash.error.title || 'Error',
                    description: flash.error.message || 'Ocurrió un error',
                });
            }
        }, 1000);
        
        return ()=> clearTimeout(timer);
    }, [flash]); 

    const storeCategory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('categories_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // toast({
                //     variant: "default",
                //     title: flash?.success?.title || 'Éxito',
                //     description: flash?.success?.message || 'Operación completada correctamente',
                // });
            },
            onError: () => {
                if (errors.name) {
                    reset('name');
                }

                if (errors.image) reset('image');
                if (errors.description) reset('description');
            }
        });
   }

    const setImageCategory = (newImage: File[]) => {
        if (newImage.length > 0 && newImage[0].type.startsWith('image/')) {
            setData('image', newImage[0]);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Por favor, selecciona un archivo de imagen válido"
            });
        }
    }

    return {
        storeCategory,
        setData,
        data,
        errors,
        processing,
        setImageCategory
    }
}