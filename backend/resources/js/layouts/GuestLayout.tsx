import ApplicationLogo from '@/components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4">
            <div className="mb-6">
                <Link href="/">
                    <ApplicationLogo/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6">
                {children}
            </div>
        </div>
    );
}
