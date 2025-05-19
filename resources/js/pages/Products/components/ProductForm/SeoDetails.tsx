import {
    Card,
    CardContent
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from 'lucide-react';
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import { Input } from "@/components/ui/input";
import { useProductFormContext } from "@/context/product-form.context";

export default function SeoDetails () {
    const {
            data,
            setData,
            errors,
            handleNumberChangeSelect
    } = useProductFormContext();

    return (
        <Card>
            <CardContent className="grid grid-cols-12 gap-4">
                <div className="flex flex-col col-span-6">
                    <div className="flex flex-row">
                        <InputLabel htmlFor="disponibility_text" value="Título de la página" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p className="text-gray-100">Coloca aquí las palabras clave de este producto para que tus clientes puedan encontrarlo fácilmente</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                
                    <Input
                        id="disponibility_text"
                        type="text"
                        value={data.disponibility_text} 
                        onChange={(e) => setData('disponibility_text', e.target.value)} 
                    />
                    <InputError message={errors.relevance} />
                </div>
            </CardContent>
        </Card>
    );
}