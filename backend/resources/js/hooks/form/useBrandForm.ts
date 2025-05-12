import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PageProps } from "@/types";

export function useBrandForm(){
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
        logo: null as File | null
    });

    const { props } = usePage<PageProps>();
    const { flash } = props; 

    useEffect(() => {
        if(!flash) return;
        
        if (flash?.success) {
            toast({
                variant: "default",
                title: flash.success.title || 'Éxito',
                description: flash.success.message || 'Operación completada correctamente',
            });

            setTimeout(() => {
                flash.success = {};
            }, 2500);
        }

        if (flash?.error) {
            toast({
                variant: "destructive",
                title: flash.error.title || 'Error',
                description: flash.error.message || 'Ocurrió un error',
            });
            setTimeout(() => {
                flash.error = {};
            }, 2500);
        }
    }, [flash]); 

    const storeBrand = (onSuccess?:  () => void) => {
        post(route('categories_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                if (errors.name) reset('name');
                if (errors.logo) reset('logo');
            }
        });
   }

    const setLogoBrand = (newImage: File[]) => {
        if (newImage.length > 0 && newImage[0].type.startsWith('image/')) {
            setData('logo', newImage[0]);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Por favor, selecciona un archivo de imagen válido"
            });
        }
    }

    return {
        storeBrand,
        setData,
        data,
        errors,
        processing,
        setLogoBrand,
        recentlySuccessful
    }
}