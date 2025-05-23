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

export default function SeoDetails() {
    const {
            data,
            setData,
            errors,
            handleNumberChangeSelect
    } = useProductFormContext();

    return (
        <Card>
            <CardContent className="grid grid-cols-12 gap-6">
                <div className="flex flex-col col-span-6">
                    <div className="flex justify-between">
                        <div className="flex flex-row">
                            <InputLabel htmlFor="meta_title" value="Título de la página" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Este título se mostrará en los motores de búsqueda y en la pestaña del navegador. Idealmente entre 50 y 60 caracteres.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <span className="text-gray-500 ml-2">(Opcional)</span>
                    </div> 
                
                    <Input
                        id="meta_title"
                        type="text"
                        value={data.meta_title} 
                        onChange={(e) => setData('meta_title', e.target.value)} 
                        autoComplete="off"
                    />
                    <InputError message={errors.meta_title} />
                </div>

                <div className="flex flex-col col-span-12 md:col-span-6">
                    <div className="flex justify-between">
                        <div className="flex flex-row">
                            <InputLabel htmlFor="key_words" value="Palabras clave para búsqueda" />
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
                        <span className="text-gray-500 ml-2">(Opcional)</span>
                    </div>

                    <Input
                        id="key_words"
                        type="text" 
                        value={data.key_words}
                        placeholder="Palabras clave separadas por comas"
                        onChange={(e) => setData('key_words', e.target.value)} 
                    />

                    <InputError message={errors.key_words} />
                </div>

                <div className="flex flex-col col-span-12">
                    <div className="flex flex-row">
                        <InputLabel htmlFor="meta_description" value="Resumen corto para buscadores" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p className="text-gray-100">Ayuda a los motores de búsqueda a entender y mostrar mejor tu producto. Idealmente entre 120 y 160 caracteres.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                
                    <Input
                        id="meta_description"
                        type="text"
                        value={data.meta_description} 
                        onChange={(e) => setData('meta_description', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError message={errors.meta_description} />
                </div>
            </CardContent>
        </Card>
    );
}