import { ScrollArea } from "@/components/ui/scroll-area";
import ButtonAdd from "@/components/ui/button-add";
import CategorySelectList from "@/pages/Coupons/components/form/CategorySelectList";
import ProductSelectList from "@/pages/Coupons/components/form/ProductSelectList";
import InputError from "@/components/InputError";
import InputWithAddons from "@/components/ui/input-with-addons";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCouponForm } from "@/hooks/form/useCouponForm";
import ClientSelectList from "@/pages/Coupons/components/form/ClientSelectList";
import { useCouponFormContext } from "@/context/coupon-form.context";
import { Checkbox } from "@/components/ui/checkbox";
import DangerButton from "@/components/ui/danger-button";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Conditions() {
    const {
        data,
        setData,
        errors,
        addCondition,
        removeCondition,
        handleConditionChange,
        handleNumberChangeInput
    } = useCouponFormContext();

    useEffect(() => {

    }, [data.conditions]);

    return (
        <Card>
            <CardContent className='flex flex-col gap-5'>
                <div className="flex items-center col-span-6 space-x-2">
                    <Checkbox
                        id="only_first_order"
                        checked={Boolean(data.only_first_order) || false}
                        onCheckedChange={(checked) => setData('only_first_order', !!checked)}
                    />

                    <div className="grid leading-none">
                        <label
                            htmlFor="only_first_order"
                            className="text-sm font-medium text-gray-400 hover:text-gray-200 cursor-pointer"
                        >
                            Primera compra
                        </label>
                    </div>

                    <InputError message={errors.only_first_order} />
                </div>

                {/* Tipo de descuento */}
                <div className="flex flex-col gap-10">
                    {data.conditions.length > 0 &&
                        data.conditions.map((item, index) => (
                            <div key={index} className="relative">
                                {/* Título */}
                                <div className="flex items-center w-full justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-blue-300">
                                        Condición {index + 1}
                                    </h3>

                                    {index > 0 && (
                                        <DangerButton
                                            type="button"
                                            title="Eliminar condición"
                                            onClick={() => removeCondition(index)}
                                            className="!px-2"
                                        >
                                            <X className="h-3 w-3" />
                                        </DangerButton>
                                    )}
                                </div>
                                <InputError message={errors.conditions?.[index]} />

                                {/* Select */}
                                <div className="flex items-center">
                                    <Select
                                        onValueChange={(
                                            e: "min_amount" | "category" | "product" | "city" | "client"
                                        ) => handleConditionChange(e, "name", index)}
                                        defaultValue={data.conditions[index].name}
                                    >
                                        <SelectTrigger className="h-[30px]">
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {["min_amount", "category", "product", "city", "client"].map((option) => {
                                                const exists = data.conditions.some((cond) => cond.name === option);
                                                return (
                                                    <SelectItem key={option} value={option} disabled={exists}>
                                                        {option === "min_amount" && "Compra mayor a"}
                                                        {option === "category" && "Categoría"}
                                                        {option === "product" && "Producto"}
                                                        {option === "city" && "Ciudad"}
                                                        {option === "client" && "Cliente"}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>

                                    {/* Si es monto mínimo */}
                                    {item.name === "min_amount" && (
                                        <InputWithAddons
                                            prefix="$"
                                            required
                                            placeholder="0"
                                            inputId={`min_amount_${index}`}
                                            value={
                                                Array.isArray(data.conditions[index].value)
                                                    ? 0 : data.conditions[index].value ?? 0
                                            }
                                            sufixValue="COP"
                                            suffixes={['COP']}
                                            className="ml-2"
                                            onChange={(e) => handleConditionChange(Number(e), 'value', index)}
                                        />
                                    )}
                                </div>

                                {/* <InputError message={errors.conditions?.[index]?.value} /> */}

                                {/* Si es categoría */}
                                {item.name === "category" && (
                                    <CategorySelectList condition_index={index} onChange={handleConditionChange} />
                                )}

                                {/* Si es productos */}
                                {item.name === "product" && (
                                    <ProductSelectList condition_index={index} onChange={handleConditionChange} />
                                )}

                                {/* Si es clientes */}
                                {item.name === "client" && (
                                    <ClientSelectList condition_index={index} onChange={handleConditionChange} />
                                )}
                            </div>
                        ))}
                </div>

                <ButtonAdd
                    onClick={() => addCondition()}
                    title="Añade una nueva condición"
                    text="Añadir condición"
                />
            </CardContent>
        </Card>
    );
}