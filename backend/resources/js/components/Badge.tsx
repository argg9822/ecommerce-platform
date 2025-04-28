
type props = {
    color?: 'danger' | 'warning' | 'success' | 'info' | 'primary' | 'purple' | 'pink',
    text: string
}

export default function Badge ({ color = 'danger', text } : props){
    const badgesClassNames: Record<string, string> = {
        danger: 'text-red-400 border-red-400/50 hover:bg-red-400/10',
        warning: 'text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10',
        success: 'text-green-400 border-green-400/50 hover:bg-green-400/10',
        info: 'text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10',
        primary: 'text-blue-400 border-blue-400/50 hover:bg-blue-400/10',
        purple: 'text-purple-400 border-purple-400/50 hover:bg-purple-400/10',
        pink: 'text-pink-400 border-pink-400/50 hover:bg-pink-400/10',
    }
    return (
        <div className={`inline-block px-3 py-1 rounded-full border ${badgesClassNames[color]} text-sm transition`}>
            {text}
        </div>
    );
}