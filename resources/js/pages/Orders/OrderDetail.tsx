import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order";
import { Package, User, MapPin, Calendar, ShoppingBag, Pencil } from "lucide-react"
import { OrderStatusBadge } from "@/pages/Orders/components/order-status-badge";
import { SendWhatsapp } from "@/components/SendWhatsapp";
import { OrderPaymentForm } from "@/pages/Orders/components/order-payment-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderPaymentsHistory from "@/pages/Orders/components/order-payments-history";
import OrderStatusHistory from "@/pages/Orders/components/order-status-history";

type OrderDetail = {
    isOpen: boolean,
    order: Order,
    setIsOpen: (open: boolean) => void,
    index: number
}

export default function OrderDetail({ isOpen, order, setIsOpen, index }: OrderDetail) {
    const statusNotUpdate = ['cancelled', 'refunded', 'delivered', 'paid'];
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-4xl h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Orden #{order.id.slice(0, 8)}
                    </DialogTitle>
                    <DialogDescription>
                        Información detallada de la orden
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Columna izquierda */}
                        <div className="flex-1 space-y-4">
                            {/* Cliente */}
                            <div className="p-4 rounded-lg bg-gray-950">
                                <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                    <User className="w-4 h-4" /> Cliente
                                </div>
                                <p className="font-medium">{order.user.name}</p>
                                <p className="text-sm text-muted-foreground">{order.user.email}</p>
                                <p className="text-sm text-muted-foreground">{order.delivery_info.phone}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <SendWhatsapp phone={`57${order.delivery_info.phone}`} />
                                </div>
                            </div>

                            {/* Envío */}
                            <div className="p-4 rounded-lg bg-gray-950">
                                <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                    <MapPin className="w-4 h-4" /> Envío
                                </div>
                                <p>{order.delivery_info.address}</p>
                                <p>{order.delivery_info.apartment}</p>
                                <p>{order.delivery_info.province} - {order.shipping_city}</p>
                                <p>CP: {order.delivery_info.postalCode}</p>
                                <p>Tipo: {order.delivery_info.deliveryType}</p>
                                {/* Notas */}
                                {order.notes && (
                                    <div className="p-4">
                                        <p className="text-sm font-medium text-blue-100">Notas</p>
                                        <p className="text-sm">{order.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="flex flex-col h-100 justify-between p-4 flex-1 rounded-lg bg-gray-950">
                            {/* Productos */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                    <ShoppingBag className="w-4 h-4" /> Productos
                                </div>

                                <ul className="space-y-2">
                                    {order.items?.map((item) => (
                                        <li key={item.id} className="flex justify-between text-sm border-b border-gray-800 pb-1">
                                            {item.products && item.products.map((product) => (
                                                <>
                                                    <span key={product.id} className="font-medium">{product.name}</span>
                                                    <span>{item.quantity} × ${Number(item.unit_price).toLocaleString()}</span>
                                                </>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Estado y total */}
                            <div className="flex items-center justify-between">

                                <OrderStatusBadge status={order.status} paymentType={order.payment_type} />

                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-100">
                                        ${Number(order.total).toLocaleString()}
                                    </p>
                                    <p className="text-sm font-medium">Total</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actualizar pago */}
                    {(order.payment_type === 'contra_entrega' && !statusNotUpdate.includes(order.status)) 
                        ? (
                            <div className="rounded-lg mt-4">
                                <OrderPaymentForm order={order} orderIndex={index} />
                            </div>
                        ) 
                    : <OrderPaymentsHistory payments={order.payments} />}

                    {/* Historial */}
                    {(order.status_history && order.status_history.length > 0) && (
                        <OrderStatusHistory history={order.status_history} />
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}