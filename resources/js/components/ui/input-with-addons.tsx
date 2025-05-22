import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import InputLabel from '@/components/InputLabel';
import { CircleHelp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InputWithAddonsProps = {
    placeholder?: string;
    inputId: string;
    value: number | string;
    prefix: string;
    sufixValue?: string;
    type?: string;
    suffixes: string[];
    className?: string;
    label?: string | undefined;
    messageTooltip?: string | undefined;
    onChange?: (value: string | boolean | number) => void;
    onChangeWithEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeSuffix?: (key: string, value: string) => void;
}

export default function InputWithAddons({
    placeholder,
    inputId,
    value,
    prefix,
    sufixValue,
    type,
    suffixes,
    className,
    label,
    messageTooltip,
    onChange,
    onChangeSuffix,
    onChangeWithEvent
} : InputWithAddonsProps) {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeWithEvent) {
            onChangeWithEvent(e);
        } else if (onChange) {
            const value = type === "number" ? parseFloat(e.target.value) : e.target.value;
            onChange(value);
        }
    };

    return (
        <>
            <div className="flex">
                {label && (
                    <InputLabel htmlFor="price" value={label} />
                )}
                {messageTooltip && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                            </TooltipTrigger>

                            <TooltipContent>
                                <p className="text-gray-100">{messageTooltip}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>

            <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">{prefix}</span>
                <Input
                    id={inputId}
                    type={type || "number"}
                    step="0.01"
                    placeholder={placeholder || ""}
                    className={`w-full pl-6 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
                    value={value}
                    onChange={handleInputChange}
                />

                <div className="absolute right-0 top-0 h-full flex items-center">
                    <Select onValueChange={(e) => { onChangeSuffix && onChangeSuffix }} defaultValue={sufixValue}>
                        <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                            <SelectValue placeholder="--" />
                        </SelectTrigger>
                        <SelectContent>
                            {suffixes.map((item, index) => (
                                <SelectItem key={index} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}