import {
  Card,
  CardContent
} from "@/components/ui/card";
import InputLabel from '@/components/InputLabel';
import InputError from '@/components/InputError';
import { useProductFormContext } from "@/context/product-form.context";
import { Input } from "@/components/ui/input";
import InputWithAddons from "@/components/ui/input-with-addons";

export default function Inventory() {
    const {
        data,
        setData,
        errors,
        recentlySuccessful,
        handleNumberChangeInput,
        handleProfit
    } = useProductFormContext();

    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4">

                    {/* Precio */}
                    <div className="col-span-6">
                        <InputWithAddons
                            label="Precio del producto"
                            messageTooltip="Precio de venta del artículo, sin incluir envíos."
                            value={data.price || ""}
                            placeholder="0.00"
                            className="pl-6 pr-18"
                            onChangeWithEvent={(e) => handleProfit(e, 'price')}
                            inputId="price"
                            prefix="$"
                            suffixes={["COP", "USD", "EUR"]}
                            onChangeSuffix={(e) => { setData('currency', e) }} 
                            sufixValue={data.currency}
                            required
                        />

                        <InputError message={errors.price} />
                    </div>

                    {/* Precio comparativo */}
                    <div className="col-span-6">
                        <InputWithAddons
                            label="Precio comparativo"
                            messageTooltip="Si este producto tiene descuento, ingresa aquí el precio anterior para mostrar el ahorro."
                            value={data.compare_price || ""}
                            placeholder="0.00"
                            className="pl-6 pr-18"
                            onChangeWithEvent={(e) => handleNumberChangeInput(e, 'compare_price')}
                            inputId="compare_price"
                            prefix="$"
                            suffixes={["COP", "USD", "EUR"]}
                            onChangeSuffix={(e) => { setData('currency', e) }} 
                            sufixValue={data.currency}
                        />

                        <InputError message={errors.compare_price} />
                    </div>
                    
                    {/* Costo */}
                    <div className="col-span-6">
                        <InputWithAddons
                            label="Costo"
                            messageTooltip="Precio de compra al proveedor"
                            required
                            value={data.cost || ""}
                            placeholder="0.00"
                            className="pl-6 pr-18"
                            onChangeWithEvent={(e) => handleProfit(e, 'cost')}
                            inputId="cost"
                            prefix="$"
                            suffixes={["COP", "USD", "EUR"]}
                            onChangeSuffix={(e) => { setData('currency', e) }} 
                            sufixValue={data.currency}
                        />

                        <InputError message={errors.cost} />
                    </div>

                    {/* Ganancias */}
                    <div className="col-span-6">
                        <InputLabel htmlFor="profit" value="Ganancias" />

                        <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">$</span>
                            <Input
                                id="profit"
                                type="text"
                                step="0.01"
                                placeholder='0.00'
                                className="w-full pl-6 pr-[20px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                readOnly
                                value={new Intl.NumberFormat('es-CO', {
                                    style: 'decimal',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 2
                                }).format(data.profit ?? 0)}
                                onChange={(e) => handleNumberChangeInput(e, 'profit')}
                            />
                        </div>
                    </div>

                    {/* Costo de envío */}
                    <div className="col-span-6">
                       <InputWithAddons
                            label="Costo de envío"
                            messageTooltip="¿Tiene costo de envío? Agrégalo aquí"
                            value={data.shipment || ""}
                            placeholder="0.00"
                            className="pl-6 pr-18"
                            onChangeWithEvent={(e) => handleNumberChangeInput(e, 'shipment')}
                            inputId="shipment"
                            prefix="$"
                            suffixes={["COP", "USD"]}
                            onChangeSuffix={(e) => { setData('currency', e) }} 
                            sufixValue={data.currency}
                        />

                        <InputError message={errors.shipment} />
                    </div>

                    <div className="col-span-6 flex flex-row gap-2">
                        <div>
                            <InputLabel htmlFor="stock" value="Stock" />
                            <Input id="stock" type="number" value={data.stock} onChange={(e) => handleNumberChangeInput(e, 'stock')} />
                            <InputError message={errors.stock} />
                        </div>
                        
                        <div>
                            <InputLabel htmlFor="sku" value="SKU" />
                            <Input id="sku" type="text" value={data.sku} onChange={(e) => setData('sku', e.target.value)} autoComplete="off"/>
                            <InputError message={errors.sku} />
                        </div>

                        <div>
                            <InputLabel htmlFor="barcode" value="Código de barras" />
                            <Input id="barcode" type="text" value={data.barcode} onChange={(e) => setData('barcode', e.target.value)} autoComplete="off"/>
                            <InputError message={errors.barcode} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}