import { Conditions, CouponForm } from "@/types/coupon-form.type";
import { useForm } from '@inertiajs/react';
import { format } from "date-fns";
import { ChangeEvent, FormEventHandler, useEffect, useRef } from 'react';

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
        discount_type: 'percentage',
        discount_value: undefined,
        expires_at: format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),"yyyy-MM-dd"),
        conditions: initConditions as Conditions[],
        only_first_order: false,
        usage_limit: 1,
        usage_per_user: 1
    });

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? undefined : parsed);
    }

    const handleConditionChange = (newValue: number | string, key: "name" | "value", condition_index: number) => {
        const updated = data.conditions.map((cond, i) => {
            if (i !== condition_index) return cond;

            let newCond = { ...cond };

            if (key === "value") {
                if (Array.isArray(newCond.value)) {
                    const num = Number(newValue);
                    newCond.value = newCond.value.includes(num)
                        ? newCond.value.filter(v => v !== num)
                        : [...newCond.value, num];
                } else {
                    newCond.value = [Number(newValue)];
                }
            }

            if (key === "name") {
                newCond.name = String(newValue);
            }

            return newCond;
        });

        setData("conditions", updated);
    };

    const addCondition = () => {
        const newCondition = [...data.conditions, { name: 'min_amount', value: undefined }]
        setData('conditions', newCondition);
    };

    const removeCondition = (condition_index: number) => {
        const updated = data.conditions.filter((_, i) => i !== condition_index);
        setData("conditions", updated);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log("data.conditions submit", data.conditions);

        post(route('coupons_store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Cupón creado correctamente');
            },
            onError: (errors) => {
                alert('Ocurrió un error');
                //handleErrors(errors)
            },
        });
    };

    const productNameToLower = (productName: string) => {
        if (!productName) return "";

        const firstLetter = productName[0].toUpperCase();
        const rest = productName.slice(1).toLowerCase();

        return firstLetter + rest;
    };

    return {
        data,
        processing,
        errors,
        submit,
        setData,
        addCondition,
        removeCondition,
        productNameToLower,
        handleConditionChange,
        handleNumberChangeInput
    }
}