import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";


export default function CategoryForm(){
    const storeCategory: FormEventHandler = (e) => {
        e.preventDefault();
    }

    const {
        data,
        setData,
        errors
    } = useForm({
        name: '',
        description: ''
    });

    return (
        <form onSubmit={storeCategory} encType="multipart/form-data">
            <div className="flex justify-between">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" onChange={(e) => setData('name', e.target.value)} value={data.name} className="col-span-3" />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Descripción</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} className="min-h-[100px] col-span-3" />
                        <InputError message={errors.description} />
                    </div>
                </div>

                
            </div>
        </form>
    );
}