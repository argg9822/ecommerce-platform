import { Conditions, CouponForm } from "@/types/coupon-form.type";
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

type CouponFormData = CouponForm & Record<string, any>;

export function useCouponForm() {
    const initConditions: Conditions = {
        name: 'min_amount',
        value: undefined
    };

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm<CouponFormData>({
        code: '',
        type: 'percentage',
        conditions: [initConditions],
        usage_limit: undefined,
        usage_per_user: undefined
    });

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? undefined : parsed);
    }

    const handleConditionChange = (value: number | string, field: string, index: number) => {
        const dataConditions: Conditions[] = [...data.conditions];
        const currentCondition = dataConditions[index];
        const updatedCurrentCondition = {
            ...currentCondition,
            [field]: value
        };

        const updatedConditions = [...dataConditions];
        updatedConditions[index] = updatedCurrentCondition;
        console.log(updatedConditions);

        setData('conditions', updatedConditions);
    }

    const addCondition = () => {
        const newCondition = [...data.conditions, initConditions]
        setData('conditions', newCondition);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('coupons_store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                alert('Actualizado correctamente');
            },
            onError: (errors) => {
                alert('Ocurrió un error');
                // handleErrors(errors)
            },
        });
        
    };

    return {
        data,
        submit,
        setData,
        addCondition,
        handleConditionChange,
        handleNumberChangeInput
    }
}