import { Conditions, CouponForm } from "@/types/coupon-form.type";
import { useForm } from '@inertiajs/react';
import { log } from "node:console";
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

type CouponFormData = CouponForm & Record<string, any>;

export function useCouponForm() {
    const initConditions: Conditions[] = [
        {
            name: 'min_amount',
            value: undefined
        }
    ];

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
        amount: undefined,
        conditions: initConditions,
        usage_limit: undefined,
        usage_per_user: undefined
    });

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? undefined : parsed);
    }

    const validateIfExistsId = (currentIds: number[], id: number | string) => {
        if (!Array.isArray(currentIds)) return;

        if (currentIds.indexOf(Number(id)) === -1) {
            return [...currentIds, Number(id)];
        } else {
            return currentIds.filter(i => i !== Number(id));
        }
    }

    const handleConditionChange = (
        value: string | number,
        field: keyof Conditions,
        index: number
    ) => {
        const updatedConditions = [...data.conditions];
        const currentCondition = updatedConditions[index];
        if (!currentCondition) return;

        if (field === "value") {
            const newValue = Array.isArray(currentCondition.value)
                ? validateIfExistsId(currentCondition.value, value)
                : [value];

            const filteredValue = Array.isArray(newValue)
                ? newValue.filter(v => typeof v === "number")
                : typeof newValue === "number"
                    ? newValue
                    : undefined;

            updatedConditions[index] = {
                ...currentCondition,
                value: filteredValue,
            };
        } else {
            if (field === "name" && typeof value === "string") {
                updatedConditions[index] = {
                    ...currentCondition,
                    name: value,
                };
            }
        }

        console.log(updatedConditions);
        console.log("data.conditions", data.conditions);

        setData("conditions", updatedConditions);
    };

    const addCondition = () => {
        const newCondition = [...data.conditions, { name: 'min_amount', value: undefined }]
        setData('conditions', newCondition);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('coupons_store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                alert('Cupón creado correctamente');
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