import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", revenue: 4000, orders: 240 },
  { name: "Feb", revenue: 3000, orders: 198 },
  { name: "Mar", revenue: 5000, orders: 320 },
  { name: "Apr", revenue: 4500, orders: 280 },
  { name: "May", revenue: 6000, orders: 410 },
  { name: "Jun", revenue: 5500, orders: 380 },
  { name: "Jul", revenue: 7000, orders: 490 },
  { name: "Aug", revenue: 8500, orders: 560 },
  { name: "Sep", revenue: 7500, orders: 520 },
  { name: "Oct", revenue: 9000, orders: 620 },
  { name: "Nov", revenue: 10500, orders: 710 },
  { name: "Dec", revenue: 12000, orders: 820 },
];

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Monthly revenue and orders</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Orders</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(200, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(280, 100%, 60%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(280, 100%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(0, 0%, 60%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(0, 0%, 60%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 8%, 12%)",
                border: "1px solid hsl(240, 6%, 20%)",
                borderRadius: "8px",
                boxShadow: "0 4px 24px hsla(0, 0%, 0%, 0.4)",
              }}
              labelStyle={{ color: "hsl(0, 0%, 95%)" }}
              formatter={(value: number, name: string) => [
                name === "revenue" ? `$${value.toLocaleString()}` : value,
                name === "revenue" ? "Revenue" : "Orders"
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(200, 100%, 50%)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="hsl(280, 100%, 60%)"
              strokeWidth={2}
              fill="url(#ordersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
