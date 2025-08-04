import { LabelHTMLAttributes } from 'react';
import RequiredMark from '@/components/ui/required-mark';

export default function InputLabel({
    value,
    className = '',
    children,
    inputRequired,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string, inputRequired?: boolean }) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-medium text-gray-400 mb-1` +
                className
            }
        >
            {value ? value : children}
            {inputRequired && <RequiredMark />}
        </label>
    );
}
