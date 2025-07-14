export default function RequiredMark() {
    return (
        <span 
            className="h-5 w-5 inline-flex items-center justify-center align-middle rounded-md  text-red-400 text-sm font-bold"
            title="Campo obligatorio"
        >
            *
        </span>
    );
}