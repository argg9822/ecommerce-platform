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

export default function Conditions() {
    const {
        data,
        setData,
        addCondition,
        handleConditionChange,
        handleNumberChangeInput
    } = useCouponFormContext();

    return (
        <Card>
            <CardContent className='flex flex-col gap-5'>
                {/* Tipo de descuento */}
                <div className="flex flex-col gap-10">
                    {data.conditions.length > 0 &&
                        data.conditions.map((item, index) => (
                            <div key={index} className="relative">
                                {/* Título */}
                                <h3 className="text-sm font-semibold text-blue-300 mb-3">
                                    Condición {index + 1}
                                </h3>

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
                                            <SelectGroup>
                                                <SelectItem value="min_amount">Compra mayor a</SelectItem>
                                                <SelectItem value="category">Categoría</SelectItem>
                                                <SelectItem value="product">Productos</SelectItem>
                                                <SelectItem value="city">Ciudad</SelectItem>
                                                <SelectItem value="client">Cliente</SelectItem>
                                            </SelectGroup>
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
                                            onChange={(e) => handleConditionChange(Number(e), 'value', index)}
                                        />
                                    )}
                                </div>

                                <InputError message="" />

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