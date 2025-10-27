/* Libraries */
import 'dayjs/locale/es';
import { useState } from 'react';
import { Head } from "@inertiajs/react";
import { Order } from "@/types/order";
import { motion } from "framer-motion";

/* Icons */
import { ChevronDownIcon, RefreshCcw } from "lucide-react";

/* UI */
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import PrimaryButton from "@/components/PrimaryButton";
import InputLabel from '@/components/InputLabel';

/* Components */
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import OrderDetail from '@/pages/Orders/OrderDetail';
import { useOrders } from '@/hooks/use-orders';
import { DataTable } from '@/pages/Orders/components/data-table';
import { Input } from '@/components/ui/input';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

export default function () {
    const {
        orderFilterStatus,
        setOrderFilterStatus,
        orders,
        setOrders,
        filterOrders,
        setOrderFilterDate,
        orderFilterDate,
        isOpenSheet,
        setIsOpenSheet,
        openDatepickerInit,
        setOpenDatepickerInit,
        orderFilterNumber,
        loadingOrders,
        setOrderFilterNumber,
        orderViewDetail,
        setOrderViewDetail,
    } = useOrders();
    
    const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);

    const redirectOrdersIndex = () => {
        window.location.href = route('orders_index');
    }

    return (
        <AuthenticatedLayout>
            <Head title="Órdenes" />
            <div className="text-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Órdenes</h1>

                        {/* Filtro */}
                        <div className='flex items-center gap-4'>
                            {/* Actualizar */}
                            <PrimaryButton onClick={redirectOrdersIndex} title='Actualizar órdenes'>
                                <RefreshCcw />
                            </PrimaryButton>
                            <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                                <SheetTrigger asChild>
                                    <Button onClick={() => setIsOpenSheet(true)} variant="secondary">Filtrar</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Filtrar órdenes</SheetTitle>
                                        <SheetDescription>
                                            Filtro avanzado para las órdenes
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Select
                                                onValueChange={(e) => setOrderFilterStatus(e)}
                                                defaultValue={orderFilterStatus}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un estado" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Estado</SelectLabel>
                                                        <SelectItem value="all">Todos los estados</SelectItem>
                                                        <SelectItem value="pending">Pendiente</SelectItem>
                                                        <SelectItem value="paid">Pagada</SelectItem>
                                                        <SelectItem value="processing">Procesando</SelectItem>
                                                        <SelectItem value="ready_to_ship">Listo para ser enviado</SelectItem>
                                                        <SelectItem value="shipped">Despachada</SelectItem>
                                                        <SelectItem value="out_for_delivery">En reparto</SelectItem>
                                                        <SelectItem value="delivered">Entregada</SelectItem>
                                                        <SelectItem value="cancelled">Cancelada</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="date" className="px-1">
                                                Fecha
                                            </Label>
                                            <Popover open={openDatepickerInit} onOpenChange={setOpenDatepickerInit}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="filterInitDate"
                                                        className="justify-between font-normal"
                                                    >
                                                        {orderFilterDate ? orderFilterDate.toLocaleDateString() : "Selecciona una fecha"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto overflow-hidden p-0"
                                                    align="start"
                                                    onPointerDownOutside={(e) => e.preventDefault()}
                                                    onInteractOutside={(e) => {
                                                        const isTrigger = (e.target as HTMLElement)?.closest('[data-radix-popper-trigger]');
                                                        if (!isTrigger) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={orderFilterDate || undefined}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                setOrderFilterDate(date);
                                                                setOpenDatepickerInit(false);
                                                            }
                                                        }}
                                                        className="[&_*]:pointer-events-auto"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="grid gap-3">
                                            <InputLabel htmlFor="order-number-filter" value="Número de orden" />
                                            <Input
                                                type="text"
                                                id='order-number-filter'
                                                value={orderFilterNumber}
                                                placeholder="Buscar por # de orden"
                                                onChange={(e) => setOrderFilterNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <Button type="submit" onClick={() => filterOrders()}>Aplicar filtros</Button>
                                        <SheetClose asChild>
                                            <Button variant="outline">Cancelar</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    
                    {
                        loadingOrders && (
                            <TableSkeleton />
                        )
                    }

                    {
                        !loadingOrders && orders && orders.length === 0 && (
                            <p className="text-gray-400 text-center mt-20">No se encontraron órdenes.</p>
                        )
                    }

                    {
                        !loadingOrders && orders && orders.length > 0 && (
                            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} >
                                <DataTable data={orders} setOrders={setOrders} setOpenDetails={setOpenOrderDetail} setOrderViewDetail={setOrderViewDetail} />
                            </motion.section>
                        )
                    }
                </div>
            </div>

            {orderViewDetail && (
                <OrderDetail setIsOpen={setOpenOrderDetail} order={orderViewDetail} index={orderViewDetail ? orders.findIndex(order => order.id === orderViewDetail.id) : -1} isOpen={openOrderDetail}/>
            )}

        </AuthenticatedLayout>
    )
}