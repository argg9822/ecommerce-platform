import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Sales from '@/pages/Dashboard/Overview/Sales';
import RecentPayments from '@/pages/Dashboard/Overview/RecentPayments';
import '@/pages/Dashboard/Overview/scss/charts.scss';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                <div className="text-gray-100 min-h-screen px-6">
                    <div className="dashboard">
                        <div className="dashboard__card dashboard__summary"></div>
                        <Sales />
                        <RecentPayments />
                        <div className="dashboard__card dashboard__invoices"></div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
