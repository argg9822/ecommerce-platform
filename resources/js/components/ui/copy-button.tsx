import { Check, Copy } from "lucide-react";
import { useState } from "react";


export default function CopyButton ({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-md transition-all ${copied 
        ? 'text-emerald-400 bg-emerald-900/20' 
        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
      aria-label="Copiar token"
    >
      {copied ? (
        <Check className="w-4 h-4" strokeWidth={3} />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};