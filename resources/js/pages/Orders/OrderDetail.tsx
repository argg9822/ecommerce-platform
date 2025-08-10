import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { Package, User, MapPin, Phone, Calendar, ShoppingBag, Pencil } from "lucide-react"

type OrderDetail = {
    isOpen: boolean,
    order: Order,
    setIsOpen: (open: boolean) => void,
    onChangeStatus: (order: Order) => void
}

export default function OrderDetail({ isOpen, order, setIsOpen, onChangeStatus }: OrderDetail) {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Orden #{order.id.slice(0, 8)}
                    </DialogTitle>
                    <DialogDescription>
                        Información detallada de la orden
                    </DialogDescription>
                </DialogHeader>

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
                            <div className="flex items-center gap-1 mt-1">
                                <Phone className="w-4 h-4 text-green-700" />
                                <span>{order.delivery_info.phone}</span>
                            </div>
                        </div>

                        {/* Historial */}
                        <div className="p-4 rounded-lg bg-gray-950">
                            <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                <Calendar className="w-4 h-4" /> Historial
                            </div>
                            <p>Creada: {new Date(order.created_at).toLocaleString()}</p>
                            <p>Actualizada: {new Date(order.updated_at).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {/* Estado y total */}
                        <div className="p-4 rounded-lg bg-gray-950 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Estado actual</p>
                                <Badge variant="outline" className="capitalize text-blue-100 ">
                                    {order.status}
                                </Badge>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">Total</p>
                                <p className="text-lg font-bold text-blue-100">
                                    ${Number(order.total).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Productos */}
                        <div className="p-4 rounded-lg bg-gray-950">
                            <div className="flex items-center gap-2 mb-2 text-blue-100 font-semibold">
                                <ShoppingBag className="w-4 h-4" /> Productos
                            </div>
                            <ul className="space-y-2">
                                {order.items?.map((item) => (
                                    <li key={item.id} className="flex justify-between text-sm border-b pb-1">
                                        <span>Producto #{item.product_id}</span>
                                        <span>{item.quantity} × ${Number(item.unit_price).toLocaleString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notas */}
                        {order.notes && (
                            <div className="p-4 rounded-lg bg-gray-950">
                                <p className="text-sm font-medium text-blue-100">Notas</p>
                                <p className="text-sm">{order.notes}</p>
                            </div>
                        )}

                        {/* Botón cambiar estado */}
                        <Button
                            onClick={() => onChangeStatus(order)}
                            className="w-full flex items-center gap-2"
                        >
                            <Pencil className="w-4 h-4" /> Cambiar estado
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}