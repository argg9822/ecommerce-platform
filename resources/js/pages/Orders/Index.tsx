import 'dayjs/locale/es';

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { ChevronDownIcon, ListChecks } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useOrders } from '@/hooks/use-orders';
import { OrderStatusBadge } from './OrderStatusBadge';
import OrderDetail from './OrderDetail';
import { DataTable } from './components/data-table';
import { log } from 'node:console';

interface OnKeyDownEvent extends React.KeyboardEvent<HTMLInputElement> { }

interface OrderProps {
    orders: Order[]
}

export default function ({ orders }: OrderProps) {
    const {
        orderFilterStatus,
        setOrderFilterStatus,
        filteredOrders,
        filterOrders,
        isOpenSheet,
        setIsOpenSheet,
        formatDate,
        openDatepickerInit,
        setOpenDatepickerInit,
        dateFilterInitDate,
        setDateFilterInitDate,
        onChangeStatus
    } = useOrders(orders);

    const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false);
    const [orderViewDetail, setOrderViewDetail] = useState<Order>(orders[0] ?? []);

    return (
        <AuthenticatedLayout>
            <Head title="Órdenes" />
            <div className="text-gray-100 min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Órdenes</h1>

                        <div className='flex items-center gap-4'>
                            <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                                <SheetTrigger asChild>
                                    <Button onClick={() => setIsOpenSheet(true)} variant="outline">Filtrar</Button>
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
                                                        <SelectItem value="all">Todos</SelectItem>
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
                                                Fecha (desde)
                                            </Label>
                                            <Popover open={openDatepickerInit} onOpenChange={setOpenDatepickerInit}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="filterInitDate"
                                                        className="justify-between font-normal"
                                                    >
                                                        {dateFilterInitDate ? dateFilterInitDate.toLocaleDateString() : "Selecciona una fecha"}
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
                                                        selected={dateFilterInitDate}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                setDateFilterInitDate(date);
                                                                setOpenDatepickerInit(false);
                                                            }
                                                        }}
                                                        className="[&_*]:pointer-events-auto"
                                                    />
                                                </PopoverContent>
                                            </Popover>
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

                    <DataTable data={filteredOrders} />
                </div>
            </div>

            {filteredOrders.length > 0 && (
                <OrderDetail onChangeStatus={onChangeStatus} setIsOpen={setOpenOrderDetail} order={orderViewDetail} isOpen={openOrderDetail}/>
            )}

        </AuthenticatedLayout>
    )
}