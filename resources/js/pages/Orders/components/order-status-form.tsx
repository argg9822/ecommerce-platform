import { useEffect, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronsUpDown } from "lucide-react"
import { Order } from "@/types/order"
import InputWithAddons from "@/components/ui/input-with-addons"
import InputLabel from "@/components/InputLabel"
import { usePaymentForm } from "@/hooks/form/usePaymentForm"

export function OrderStatusForm({ order }: { order: Order }) {
    const [isOpen, setIsOpen] = useState(false);
    const {
        data,
        setData,
        errors,
        processing,
        storePayment
    } = usePaymentForm({ order });

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-4 h-full"
        >
            <div className="flex items-center justify-between gap-4">
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-full bg-gray-950 hover:bg-gray-700"
                    >
                        <span className="text-sm font-semibold text-gray-200">Cargar pago</span>
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <form onSubmit={storePayment} className="flex flex-col gap-4 rounded-t-md bg-gray-950 p-4">
                    <div className="flex flex-row gap-3">
                        {/* Amount */}
                        <div className="w-1/2">
                            <InputWithAddons
                                label="Monto"
                                type="number"
                                value={data.total}
                                placeholder="0.00"
                                className="pl-[30px]"
                                inputId={`payment-${order.id}`}
                                prefix={"$"}
                                onChange={(e) => setData("total", Number(e))}
                                required
                                suffixes={["USD", "EUR", "MXN", "COP"]}
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <InputLabel htmlFor={`payment-${order.id}-method`} value="Método de pago" inputRequired={true} className="mb-0" />
                            <Select
                                defaultValue={data.payment_method}
                                onValueChange={(e) => setData("payment_method", e)}
                            >
                                <SelectTrigger className="h-[30px]">
                                    <SelectValue placeholder="Selecciona método" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="card">Tarjeta</SelectItem>
                                        <SelectItem value="cash">Efectivo</SelectItem>
                                        <SelectItem value="transfer">Transferencia</SelectItem>
                                        <SelectItem value="paypal">PayPal</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3">
                        {/* Status */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <InputLabel htmlFor={`payment-${order.id}-status`} value="Estado" inputRequired={true} className="mb-0" />
                            <Select
                                defaultValue={data.status}
                                onValueChange={(e) => setData("status", e)}
                            >
                                <SelectTrigger className="h-[30px]">
                                    <SelectValue placeholder="Selecciona estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pending">Pendiente</SelectItem>
                                        <SelectItem value="approved">Aprobado</SelectItem>
                                        <SelectItem value="cancelled">Cancelado</SelectItem>
                                        <SelectItem value="refunded">Reembolsado</SelectItem>
                                        <SelectItem value="in_process">En proceso</SelectItem>
                                        <SelectItem value="rejected">Rechazado</SelectItem>
                                        <SelectItem value="charged_back">Contracargo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Operation Type */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <InputLabel htmlFor={`payment-${order.id}-operation`} value="Tipo de operación" inputRequired={true} className="mb-0" />
                            <Select
                                defaultValue={data.operation_type}
                                onValueChange={(e) => setData("operation_type", e)}
                            >
                                <SelectTrigger className="h-[30px]">
                                    <SelectValue placeholder="Selecciona tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="payment">Pago</SelectItem>
                                        <SelectItem value="refund">Reembolso</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" disabled={processing}>
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </CollapsibleContent>
        </Collapsible>
    )
}
