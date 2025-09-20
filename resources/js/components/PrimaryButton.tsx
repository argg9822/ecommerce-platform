import { ButtonHTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button
            {...props}
            className={`inline-flex items-center rounded-md border border-transparent btn-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-700 ${
                disabled && 'opacity-50 cursor-not-allowed'
            } ${className}`}
            disabled={disabled}
            >
            {children}
        </Button>
    );
}
