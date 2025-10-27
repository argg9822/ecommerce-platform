import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";
import { Order } from "@/types/order";
import InputWithAddons from "@/components/ui/input-with-addons";
import InputLabel from "@/components/InputLabel";
import { usePaymentForm } from "@/hooks/form/usePaymentForm";
import InputError from "@/components/InputError";
import { useOrders } from "@/hooks/use-orders";

export function OrderLoadPaymentForm({ order, orderIndex }: { order: Order, orderIndex: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const {
        data,
        setData,
        errors,
        processing,
        storePayment
    } = usePaymentForm({ order });

    const statusNotUpdatePayment = ['cancelled', 'refunded', 'delivered', 'paid'];
    const canSetPayment = order.payment_type === 'contra_entrega' && !statusNotUpdatePayment.includes(order.status);

    const updateFilteredOrders = () => {
        console.log('Updating filtered orders');

        const {
            filteredOrders,
            setFilteredOrder
        } = useOrders();

        const newFilteredOrders = [...filteredOrders];

        setFilteredOrder(newFilteredOrders.map((order, index) => {
            if (index === orderIndex) {
                return { ...order, payment: data };
            }
            return order;
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        storePayment(() => {
            updateFilteredOrders();
        });
    }

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
                        <span className="text-sm font-semibold text-gray-200">{canSetPayment ? 'Cargar pago' : 'Actualizar estado'}</span>
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-t-md bg-gray-950 p-4">
                    {canSetPayment
                        ? (
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Amount */}
                                <div className="md:w-1/2">
                                    <InputWithAddons
                                        label="Monto"
                                        type="number"
                                        value={data.amount}
                                        placeholder="0.00"
                                        className="pl-[30px]"
                                        inputId={`payment-${order.id}`}
                                        prefix={"$"}
                                        onChange={(e) => setData("amount", Number(e))}
                                        required
                                        suffixes={["USD", "EUR", "MXN", "COP"]}
                                    />
                                    <InputError message={errors.amount} />
                                </div>

                                {/* Payment Method */}
                                <div className="flex flex-col gap-1 md:w-1/2">
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
                                                <SelectItem value="other">Otro</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.payment_method} />
                                </div>

                                {/* Status */}
                                <div className="flex flex-col gap-1 md:w-1/2">
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
                                    <InputError message={errors.status} />
                                </div>

                                {/* Operation Type */}
                                <div className="flex flex-col gap-1 md:w-1/2">
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
                                    <InputError message={errors.operation_type} />
                                </div>
                            </div>
                        )
                        : (
                            <div className="flex flex-col gap-1 w-1/2">
                                {/* Status */}
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
                                            <SelectItem value="ready_to_ship">Listo para enviar</SelectItem>
                                            <SelectItem value="shipped">Enviado</SelectItem>
                                            <SelectItem value="out_for_delivery">En reparto</SelectItem>
                                            <SelectItem value="delivered">Entregado</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        )
                    }

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
