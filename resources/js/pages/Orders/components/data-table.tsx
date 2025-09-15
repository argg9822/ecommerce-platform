import * as React from "react";
import dayjs from 'dayjs';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  FilterFn
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types/order";
import { OrderStatusBadge } from "@/pages/Orders/components/order-status-badge";
import { useOrderForm } from "@/hooks/form/useOrderForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormatDateFn {
  (date: string | number | Date | dayjs.Dayjs): string;
}

const formatDate: FormatDateFn = (date) => {
  return dayjs(date)
    .locale('es')
    .format('dddd D [de] MMMM [de] YYYY');
}

type DataTableProps = {
  data: Order[],
  setOpenDetails: (value: boolean) => void,
  setOrderViewDetail: (order: Order) => void
  setOrders: (orders: Order[]) => void
}

interface User {
  id: number
  name: string
  email: string
}

export function DataTable({ data, setOpenDetails, setOrderViewDetail, setOrders }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Filtro por nombre de usuario
  const userNameFilter: FilterFn<Order> = (row, columnId, filterValue) => {
    const user: User = row.getValue(columnId)
    return user.name.toLowerCase().includes((filterValue as string).toLowerCase())
  }

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: "Cliente",
      cell: ({ row }) => {
        const user = row.original.user;
        return <div className="capitalize">{user?.name}</div>
      },
      filterFn: userNameFilter,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{formatDate(row.getValue("created_at"))}</div>,
    },
    {
      accessorKey: "shipping_city",
      header: "Ciudad",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("shipping_city")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <OrderStatusBadge status={row.getValue("status")} paymentType={row.original.payment_type} />
      ),
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
          minimumFractionDigits: 0,
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const {
          updateOrderStatus
        } = useOrderForm();

        const updateFilteredOrders = (newStatus: string) => {
          const updatedOrders = [...data];
          const index = updatedOrders.findIndex(o => o.id === row.original.id);
          if (index !== -1) {
            updatedOrders[index] = { ...updatedOrders[index], status: newStatus };
            setOrders(updatedOrders);
          }
        }

        const order = row.original
        const isStatusCancelOrder = ['pending', 'failed'].includes(order.status.toLowerCase());

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Copiar ID de la orden
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOrderViewDetail(order);
                  setOpenDetails(true)
                }}
              >
                Ver detalles
              </DropdownMenuItem>

              {isStatusCancelOrder && (
                <DropdownMenuItem className="text-red-400" onClick={() => updateOrderStatus(order.id, 'cancelled', updateFilteredOrders)}>
                  Cancelar orden
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    onPaginationChange: setPagination,
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar cliente..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Mostrar columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const text: { [key: string]: string } = {
                  select: "Seleccionar",
                  user: "Usuario",
                  shipping_city: "Ciudad",
                  total: "Total",
                  status: "Estado",
                  created_at: "Fecha de creación",
                  updated_at: "Fecha de actualización",
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {text[column.id] || column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border border-gray-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} filas seleccionadas.
        </div>

        <div className="flex flex-col space-x-2 space-y-2">
          <div className="flex flex-row gap-2">
            <Select
              defaultValue={String(table.getState().pagination.pageSize)}
              onValueChange={(e) => table.setPageSize(Number(e))}
            >
              <SelectTrigger className="h-[30px]">
                <SelectValue placeholder="..." />
              </SelectTrigger>
              <SelectContent>
                {['5', '10', '20', '50'].map((size) => (
                  <SelectItem key={size} value={size}>
                    {size} registros por página
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-[30px]"
            >
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-[30px]"
            >
              Siguiente
            </Button>

            
          </div>

          <span className="text-sm flex items-center justify-end text-gray-400">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
        </div>

      </div>
    </div>
  )
}
