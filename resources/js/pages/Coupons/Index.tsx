import PrimaryButton from "@/components/PrimaryButton";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Coupon } from "@/types/coupon";
import { Head, Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/pages/Coupons/components/data-table";

export default function Index({ coupons } : { coupons: Coupon[] }) {
    console.log(JSON.parse(String(coupons)));
    
    return (
        <AuthenticatedLayout>
            <Head title="Cupones" />

            <div className="text-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Cupones</h1>

                        <Link href={route('coupons_create')}>
                            <PrimaryButton className="rounded-xl shadow-lg flex items-center gap-2">
                            <PlusCircle size={18} />
                                Generar cupón
                            </PrimaryButton>
                        </Link>
                    </div>

                    <DataTable data={JSON.parse(String(coupons))}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}