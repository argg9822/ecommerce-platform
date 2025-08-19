import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index () {
    return (
        <AuthenticatedLayout>
            <Head title="Clientes" />
        </AuthenticatedLayout>
    );
}