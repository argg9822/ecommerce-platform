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
        type: 'percentage',
        amount: undefined,
        expiration_date: format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),"yyyy-MM-dd"),
        conditions: initConditions as Conditions[],
        usage_limit: undefined,
        usage_per_user: undefined
    });

    const handleNumberChangeInput = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const number = e.target.value;
        const parsed = e.target.step === '0.01' ? parseFloat(number) : parseInt(number);
        setData(key, isNaN(parsed) ? undefined : parsed);
    }

    useEffect(() => {
        console.log("data.conditions cambió:", data);
    }, [data]);

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

    return {
        data,
        submit,
        setData,
        addCondition,
        handleConditionChange,
        handleNumberChangeInput
    }
}