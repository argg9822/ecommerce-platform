import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function (){
    return (
        <AuthenticatedLayout>
            <Head title="Cupones" />

            <div className="text-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Cupones</h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}