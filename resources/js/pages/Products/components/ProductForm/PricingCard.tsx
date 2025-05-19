
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import InputLabel from '@/components/InputLabel';
import { CircleHelp } from 'lucide-react';
import InputError from '@/components/InputError';
import { useProductFormContext } from "@/context/product-form.context";
import { Input } from "@/components/ui/input";

export default function PricingCard() {
    const {
        data,
        setData,
        errors,
        recentlySuccessful,
        handleNumberChangeInput
    } = useProductFormContext();

    const handleProfit = (e: React.ChangeEvent<HTMLInputElement>, field: "price" | "cost") => {
        handleNumberChangeInput(e, field);
        const cost_product = field === 'cost' ? parseFloat(e.target.value) : data.cost;
        const price = field === 'price' ? parseFloat(e.target.value) : data?.price;
        const profit = (price ?? 0) - (cost_product ?? 0);
        setData('profit', profit);
    }
    
    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <div className="flex">
                            <InputLabel htmlFor="price" value="Precio del producto" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Precio de venta del artículo, sin incluir envíos.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">$</span>
                            <Input
                                id="price"
                                type="number"
                                placeholder='0.00'
                                className="w-full pl-6 pr-18 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>  handleProfit(e, 'price')}
                            />
                            <div className="absolute right-0 top-0 h-full flex items-center">
                                <Select onValueChange={(e) => { setData('currency', e) }} defaultValue={data.currency}>
                                    <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                                        <SelectValue placeholder="COP" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='COP'>COP</SelectItem>
                                        <SelectItem value='USD'>USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <InputError message={errors.price} />
                    </div>

                    <div className="col-span-6">
                        <div className="flex">
                            <InputLabel htmlFor="price" value="Precio comparativo" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Si este producto tiene descuento, ingresa aquí el precio anterior para mostrar el ahorro.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">$</span>
                            <Input
                                id="compare_price"
                                type="number"
                                step="0.01"
                                placeholder='0.00'
                                className="w-full pl-6 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={data.compare_price}
                                onChange={(e) => handleNumberChangeInput(e, 'compare_price')}
                            />

                            <div className="absolute right-0 top-0 h-full flex items-center">
                                <Select onValueChange={(e) => { setData('currency', e) }} defaultValue={data.currency}>
                                    <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                                        <SelectValue placeholder="COP" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='COP'>COP</SelectItem>
                                        <SelectItem value='USD'>USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <InputError message={errors.compare_price} />
                    </div>

                    <div className="col-span-6">
                        <div className="flex">
                            <InputLabel htmlFor="price" value="Costo" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">Precio de compra al proveedor</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">$</span>
                            <Input
                                id="cost"
                                type="number"
                                step="0.01"
                                placeholder='0.00'
                                className="w-full pl-6 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={data.compare_price}
                                onChange={(e) =>  handleProfit(e, 'cost')}
                            />

                            <div className="absolute right-0 top-0 h-full flex items-center">
                                <Select onValueChange={(e) => { setData('currency', e) }} defaultValue={data.currency}>
                                    <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                                        <SelectValue placeholder="COP" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='COP'>COP</SelectItem>
                                        <SelectItem value='USD'>USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

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

                    <div className="col-span-6">
                        <div className="flex">
                            <InputLabel htmlFor="shipment" value="Costo de envío" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CircleHelp size={16} className="text-gray-100 ml-2 cursor-pointer" />
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p className="text-gray-100">¿Tiene costo de envío? Agrégalo aquí</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        <div className="relative flex items-center rounded-md outline-1 outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <span className="absolute left-3 z-10 shrink-0 text-base text-gray-300 select-none sm:text-sm/6">$</span>
                            <Input
                                id="shipment"
                                type="number"
                                step="0.01"
                                placeholder='0.00'
                                className="w-full pl-6 pr-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                value={data.shipment}
                                onChange={(e) => handleNumberChangeInput(e, 'shipment')}
                            />

                            <div className="absolute right-0 top-0 h-full flex items-center">
                                <Select onValueChange={(e) => { setData('currency', e) }} defaultValue={data.currency}>
                                    <SelectTrigger className='h-[30px] w-[80px] text-base text-gray-400 placeholder:text-gray-400 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0'>
                                        <SelectValue placeholder="COP" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='COP'>COP</SelectItem>
                                        <SelectItem value='USD'>USD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <InputError message={errors.shipment} />
                    </div>

                    <div className="col-span-6 flex flex-row gap-2">
                        <div>
                            <InputLabel htmlFor="stock" value="Stock" />
                            <Input id="stock" type="number" value={data.stock} onChange={(e) => handleNumberChangeInput(e, 'stock')} />
                            <InputError message={errors.stock} />
                        </div>
                        
                        <div className="col-span-6">
                            <InputLabel htmlFor="sku" value="SKU" />
                            <Input id="sku" type="text" value={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                            <InputError message={errors.sku} />
                        </div>

                        <div className="col-span-6">
                            <InputLabel htmlFor="barcode" value="Código de barras" />
                            <Input id="barcode" type="text" value={data.barcode} onChange={(e) => setData('barcode', e.target.value)} />
                            <InputError message={errors.barcode} />
                        </div>
                    </div>
                   
                </div>
            </CardContent>
        </Card>
    )
}