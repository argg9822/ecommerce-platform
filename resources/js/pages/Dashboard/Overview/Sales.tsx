import { useEffect, useState } from 'react';
import { AreaChart, Area, Tooltip, YAxis, XAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import ChartSkeleton from '@/components/ChartSkeleton';

type data = {
    month: string;
    ventas: number;
    ganancias: number;
}

type months = {
    [key: string]: string;
}

export default function Sales() {
    const [sales, setSales] = useState<data[]>([]);
    // const [filterMonth, setFilterMonth] = useState<string>((new Date().getMonth() + 1).toString());
    const currentYear = new Date().getFullYear();
    const [filterYear, setFilterYear] = useState<number>(currentYear);
    const previewYears = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    const [isloading, setIsloading] = useState<boolean>(true);

    const months: months = {
        '1': 'Enero',
        '2': 'Febrero',
        '3': 'Marzo',
        '4': 'Abril',
        '5': 'Mayo',
        '6': 'Junio',
        '7': 'Julio',
        '8': 'Agosto',
        '9': 'Septiembre',
        '10': 'Octubre',
        '11': 'Noviembre',
        '12': 'Diciembre'
    }

    const transformData = (data: data[]) => {
        if (Array.isArray(data) && data.length === 0) return [];

        return data.map(item => ({
            month: months[item.month].substring(0, 3),
            ventas: item.ventas,
            ganancias: item.ganancias
        }));
    }

    useEffect(() => {
        setIsloading(true);
        const fetchData = async () => {
            const response = await axios.post(route('dashboard_sales'), {
                // month: filterMonth,
                year: filterYear
            });

            setSales(transformData(response.data.sales));
            setIsloading(false);
        };
        fetchData();
    }, [filterYear]);

    return (
        <div className="dashboard__card dashboard__sales">
            <div className='dashboard__header'>
                <h3 className='dashboard__title'>Ventas</h3>
                <div className='hidden md:items-center md:flex'>
                    {/* <Select
                        onValueChange={setFilterMonth}
                        defaultValue={filterMonth}
                    >
                        <SelectTrigger className="h-[25px] text-xs">
                            <SelectValue placeholder="Mes" />
                        </SelectTrigger>

                        <SelectContent>
                            {Object.keys(months).map((option) => (
                                <SelectItem key={option} value={option}>
                                    {months[option]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> */}

                    <Select
                        onValueChange={(value) => setFilterYear(Number(value))}
                        defaultValue={filterYear.toString()}
                    >
                        <SelectTrigger className="h-[25px] ml-2 border-none text-blue-300">
                            <SelectValue placeholder="Año" />
                        </SelectTrigger>

                        <SelectContent>
                            {previewYears.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isloading ? <ChartSkeleton /> :
                (sales.length > 0
                    ?
                    (
                        <AreaChart width={730} height={250} data={sales}
                            margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.7} />
                                    <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00FF9C" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#00FF9C" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis dataKey="month" />
                            <YAxis domain={[0, Math.max(
                                ...sales.map(item => Math.max(item.ventas, item.ganancias))
                            )]} />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1E1E1E",
                                    border: "1px solid #333",
                                    borderRadius: "8px",
                                    color: "#E0E0E0",
                                    padding: "10px",
                                }}
                                labelStyle={{ color: "#FFFFFF", fontWeight: 600 }}
                            />
                            <Area type="monotone" dataKey="ventas" stroke="#00B4D8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="ganancias" stroke="#00FF9C" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    )
                    :
                    (
                        <p className="text-center text-sm my-8 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-gray-300">
                            No hay datos para mostrar
                        </p>
                    )
                )
            }
        </div>
    );
}
