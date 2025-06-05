import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FlashMessage } from '@/types';

export function useCategoryForm(){
    const { toast } = useToast();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful
    } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        parent_id: ''
    });

    const { flash } = usePage().props as {
        flash?: {
            success?: FlashMessage;
            error?: FlashMessage;
        };
    };

    useEffect(() => {
        if(!flash) return;
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
    }, [flash]); 

    const storeCategory = (onSuccess?:  () => void) => {
        post(route('categories_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                if (errors.name) reset('name');
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
        setImageCategory,
        recentlySuccessful
    }
}