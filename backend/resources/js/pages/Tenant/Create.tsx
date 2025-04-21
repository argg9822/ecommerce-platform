import TenantForm from '@/pages/Tenant/Partials/TenantForm';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plan } from '@/types';

type CreateProps = {
    plans: Plan[];
}

export default function Create ({ plans }: CreateProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Nueva tienda"/>
            <TenantForm className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 mt-8" props={plans}/>
        </AuthenticatedLayout>
    );
}