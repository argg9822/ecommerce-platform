import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Coupon } from "@/types/coupon"
import { Conditions } from "@/types/coupon";

export const columns: ColumnDef<Coupon>[] = [
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
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "expires_at",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-left"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Válido hasta
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{new Date(row.getValue("expires_at")).toLocaleDateString()}</div>,
  },
  {
    accessorKey: "discount_value",
    header: () => <div className="text-right">Descuento</div>,
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discount_value"))
      const discount_type = row.original.discount_type;

      const formatted = () => {
        switch (discount_type) {
          case 'fixed':
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            }).format(discount);

          case 'percentage':
            return new Intl.NumberFormat("es-CO", {
              style: "percent",
            }).format(discount / 100) ?? "";

          default:
            return "";
        }
      }

      return <div className="text-right font-medium">{formatted()}</div>
    },
  },
  {
    accessorKey: "conditions",
    header: () => <div className="text-right">Condiciones</div>,
    cell: ({ row }) => {
      const conditions: Conditions[] = Array.from(row.getValue("conditions"));

      const conditionLabel = (type: string) => {
        switch (type) {
          case "min_amount":
            return "Monto mínimo";
          case "App\\Models\\Category":
            return "Categorías";
          case "App\\Models\\Product":
            return "Productos";
          case "App\\Models\\City":
            return "Ciudades";
          case "App\\Models\\User":
            return "Clientes";
          default:
            return "Condición";
        }
      };

      const conditionValue = (condition: Conditions) => {
        switch (condition.condition_type) {
          case "min_amount":
            return `${condition.condition_value} COP`;
          case "App\\Models\\Category":
            return condition.items.categories?.map(cat => cat.name).join(", ");
          case "App\\Models\\Product":
            return condition.items.products?.map(prod => prod.name).join(", ");
          case "App\\Models\\City":
            return condition.items.cities?.map(city => city.name).join(", "); 
          case "App\\Models\\User":
            return condition.items.clients?.map(user => user.name).join(", ");
          default:
            return "N/A";
        }
      };

      return (
        <div className="flex flex-col gap-2 text-right">
          {conditions.length > 0 ?conditions.map((condition) => (
            <div
              key={condition.id}
              className="rounded-md bg-gray-950 px-3 py-2 text-sm text-gray-300"
            >
              <span className="block font-medium text-gray-200">
                {conditionLabel(condition.condition_type)}
              </span>
              <span className="block text-muted-foreground text-xs">
                {conditionValue(condition)}
              </span>
            </div>
          ))
        : (
          <div className="rounded-md bg-gray-950 px-3 py-2 text-sm text-gray-300">
            <span className="block font-medium text-gray-200">
              Sin condiciones
            </span>
          </div>
        )}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const coupon = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(coupon.code)}
  //           >
  //             Copy coupon ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]

export function DataTable({ data }: { data: Coupon[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar cupones..."
          value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const label = {
                  'code': 'Código',
                  'expires_at': 'Fecha de expiración',
                  'created_at': 'Fecha de creación',
                  'discount_value': 'Valor de descuento',
                  'conditions': 'Condiciones',
                }[column.id] || column.id

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id}>
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
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
