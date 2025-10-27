import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function SalesBarChart({ data }: { data: { month: string; total_sold: number }[] }) {
  return (
    <Card className="w-full bg-background border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Ventas mensuales</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00DEE3" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#00CED1" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" opacity={0.15} />
              <XAxis
                dataKey="month"
                stroke="#888"
                fontSize={12}
                tickMargin={8}
              />
              <YAxis
                stroke="#888"
                fontSize={12}
                tickMargin={8}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 17, 17, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "0.5rem",
                  backdropFilter: "blur(4px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                labelStyle={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.8rem",
                }}
                itemStyle={{
                  color: "#00DEE3",
                  fontSize: "0.8rem",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                formatter={(value) => [`${value} ventas`, "Total"]}
                labelFormatter={(month) => `Mes: ${month}`}
              />

              <Legend
                formatter={(value) => {
                  return "Productos vendidos";
                }}
                wrapperStyle={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "0.75rem",
                  marginTop: "1rem",
                }}
              />

              <Bar
                dataKey="total_sold"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
