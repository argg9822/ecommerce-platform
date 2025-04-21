import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">
                Iniciar sesión
                </h2>

                <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" className="text-gray-300" />

                    <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 text-white focus:ring-red-500 focus:border-red-500 rounded-md"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-red-400" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" className="text-gray-300" />

                    <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 text-white focus:ring-red-500 focus:border-red-500 rounded-md"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-red-400" />
                </div>

                <div className="mt-4 flex items-center">
                    <Checkbox
                    name="remember"
                    checked={data.remember}
                    onChange={(e) =>
                        setData('remember', (e.target.checked || false) as false)
                    }
                    />
                    <span className="ms-2 text-sm text-gray-400">Recordarme</span>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="text-sm text-red-400 hover:text-red-300 underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                    )}

                    <PrimaryButton
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition focus:ring-2 focus:ring-red-500"
                    disabled={processing}
                    >
                    Iniciar sesión
                    </PrimaryButton>
                </div>
                </form>
            </div>
        </GuestLayout>
    );
}
