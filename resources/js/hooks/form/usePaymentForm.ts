import { useToast } from "@/hooks/use-toast";
import { PaymentForm } from "@/types/payment-form.type";
import { useForm, usePage } from "@inertiajs/react";
import { FlashMessage } from '@/types';
import { Order } from "@/types/order";
import { useEffect } from "react";

type PaymentFormData = PaymentForm & Record<string, any>;

export function usePaymentForm({ order }: { order: Order }) {
    const { toast } = useToast();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful
    } = useForm<PaymentFormData>({
        order_id: order.id || '',
        amount: order.total || 0,
        status: order.status || "pending",
        payment_method: order.payment_method || 'cash',
        operation_type: order.operation_type || 'payment'
    });

    const { flash } = usePage().props as {
        flash?: {
            success?: FlashMessage;
            error?: FlashMessage;
        };
    };

    useEffect(() => {
        if (!flash) return;
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

    const storePayment = async (updateFilteredOrders: () => void) => {
        post(route('payment_store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                updateFilteredOrders();
            },
            onError: () => {
                if (errors.name) reset('name');
                if (errors.image) reset('image');
                if (errors.description) reset('description');
            }
        });
    };

    return {
        data,
        setData,
        errors,
        processing,
        storePayment,
    };
}
