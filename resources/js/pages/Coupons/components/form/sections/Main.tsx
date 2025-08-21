import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";
import DatePicker from "@/components/DatePicker";
import { useCouponFormContext } from "@/context/coupon-form.context";

export default function Main () {
    const {
        data,
        errors,
        setData,
    } = useCouponFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-center w-full">
                    Configurar cupón
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-5 p-6">
                {/* Código del cupón */}
                <div>
                    <InputLabel htmlFor="code" value="Código del cupón" />
                    <TextInput
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                        placeholder="EJEMPLO2025"
                    />
                    <InputError message={errors.code} />
                </div>

                {/* Tipo de descuento */}
                <div className="mt-0">
                    <InputLabel value="Tipo de descuento" />
                    <Select
                        onValueChange={(e) => setData('discount_type', e as 'percentage' | 'fixed' | 'free_shipping' | 'bogo')}
                        defaultValue={data.discount_type}
                    >
                        <SelectTrigger className='h-[30px]'>
                            <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="percentage">Porcentaje</SelectItem>
                                <SelectItem value="fixed">Valor fijo</SelectItem>
                                <SelectItem value="free_shipping">Envío gratis</SelectItem>
                                <SelectItem value="bogo">2 x 1</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.discount_type} />
                </div>

                {/* Valor del descuento */}
                {data.type !== 'free_shipping' && (
                    <div>
                        <InputLabel htmlFor="discount_value" value="Valor del descuento" />
                        <TextInput
                            id="discount_value"
                            step={0.1}
                            type="number"
                            value={data.discount_value ?? ''}
                            onChange={(e) => setData('discount_value', e.target.value ? parseFloat(e.target.value) : undefined)}
                            name="discount_value"
                            placeholder="Ej: 20"
                        />
                        <InputError message={errors.discount_value} />
                    </div>
                )}

                {/* Fecha de expiración */}
                <div>
                    <DatePicker labelText="Fecha de expiración" disablePast={true} />
                    <InputError message={errors.expires_at} />
                </div>
            </CardContent>
        </Card>
    );
}