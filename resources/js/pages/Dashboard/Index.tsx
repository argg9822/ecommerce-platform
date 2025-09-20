import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sales from '@/pages/Dashboard/Overview/Sales';
import '@/pages/Dashboard/Overview/charts.scss';

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Home" />

            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold">Dashboard</h1>

                <div className="text-gray-100 min-h-screen p-6">
                    <div className="parent">    
                        <div className="div1"> </div>
                        <div className="div2"> </div>
                        <Sales />
                        <div className="div4"> </div>
                    </div>
                </div>
            </div>
           
        </AuthenticatedLayout>
    );
}
