import { useForm } from '@inertiajs/react';


export default function useTenantForm(){
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        tenant_name: 'ToysNow',
        domain: 'toysnow',
        plan: '3',
        tenant_logo: null as File | null,
        tenant_language: 'es',
        tenant_timezone: 'America/Bogota',
        currency: 'COP',
        tenant_email: 'info@toysnow.com',
        domain_extension: 'localhost',
        user_name: 'Viviana Marin',
        user_email: 'viviana@gmail.com',
        user_password: '12345678',
        user_phone: '32131654654',
        phone_indicator: '+57'
    });

    return {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    }
}