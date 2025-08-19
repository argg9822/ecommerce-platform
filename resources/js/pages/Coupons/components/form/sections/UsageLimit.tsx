import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TextInput from "@/components/TextInput";
import InputLabel from "@/components/InputLabel";
import InputError from "@/components/InputError";
import { useCouponFormContext } from "@/context/coupon-form.context";

export default function () {
    const {
        data,
        setData,
        addCondition,
        handleConditionChange,
        handleNumberChangeInput
    } = useCouponFormContext();

    return (
        <Card>
            <CardContent className="grid grid-cols-2 gap-5 p-6">
                {/* Máximo número de usos por usuario */}
                <div className="mt-0">
                    <InputLabel value="Límite de uso por usuario" />
                    <TextInput
                        id="usage_per_user"
                        type="number"
                        value={data.usage_per_user}
                        onChange={(e) => handleNumberChangeInput(e, 'usage_per_user')}
                        name="usage_per_user"
                        placeholder="Ej: 20"
                    />
                    <InputError message="" />
                </div>

                {/* Máximo número de usos globales */}
                <div className="mt-0">
                    <InputLabel value="Límite de usos globales" />
                    <TextInput
                        id="usage_limit"
                        type="number"
                        name="usage_limit"
                        value={data.usage_limit}
                        onChange={(e) => handleNumberChangeInput(e, 'usage_limit')}
                        placeholder="Ej: 20"
                    />
                    <InputError message="" />
                </div>
            </CardContent>
        </Card>
    )
}