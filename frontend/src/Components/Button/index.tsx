import { ButtonProps, Variant } from '../../types/ButtonProps';

function Button ({ variant = 'primary', children, ...props }: ButtonProps) {
    const classBase = "px-4 py-2 rounded transition cursor-pointer";
    const variants: Record<Variant, string> = {
        primary: "bg-primary text-white hover:bg-red-700",
        danger: "bg-red-100 text-red-600 border border-red-600 hover:bg-red-200",
        light: "bg-gray-100 text-black hover:bg-gray-200",
        warning: "bg-yellow-100 text-black hover:bg-yellow-200"
    }

    return (
        <button className={`${classBase} ${variants[variant]}`} {...props}>
            {children}
        </button>
    )
}

export default Button;