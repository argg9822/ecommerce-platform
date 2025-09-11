import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FlashMessage } from '@/types';
import { OrderForm } from "@/types/order-form.type";

type OrderFormData = OrderForm & Record<string, any>;

export function useOrderForm(){
    const { toast } = useToast();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful
    } = useForm<OrderFormData>({
        id: '',
        preference_id: '',
        user_id: undefined,
        status: 'pending',
        total: undefined,
        payment_type: 'mercado_pago',
        notes: undefined,
        shipping_city: undefined,
        shipping_address: undefined,
        delivery_info: undefined
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

    const storeOrder = (onSuccess?:  () => void) => {
        post(route('categories_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                if (errors.name) reset('name');
                if (errors.description) reset('description');
            }
        });
    }

    const updateOrderStatus = (orderId: string, status: | 'paid' | 'shipped' | 'delivered' | 'canceled', onSuccess?:  () => void) => {
        setData('status', status);

        post(route('orders_update_status', { order: orderId }), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                if (errors.status) reset('status');
            }
        });
    }

    return {
        storeOrder,
        setData,
        data,
        errors,
        processing,
        recentlySuccessful,
        updateOrderStatus
    }
}