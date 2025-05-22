import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

type ButtonAddProps = {
    onClick: () => void;
    className?: string;
    title?: string;
    text: string;
}

export default function ButtonAdd({ onClick, className, title, text }: ButtonAddProps) {
    return (
        <Button
            type="button" 
            className={`max-h-[20px] bg-transparent py-0 text-blue-500 hover:text-blue-700 mb-1 ${className}`} 
            title={title}
            onClick={() => onClick()}
        >
            <PlusIcon />{text}
        </Button>
);
}