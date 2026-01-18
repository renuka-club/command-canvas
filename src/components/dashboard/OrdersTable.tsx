import { motion } from "framer-motion";
import { Eye, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  email: string;
  design: string;
  size: string;
  status: "pending" | "printing" | "shipped" | "delivered";
  total: number;
  date: string;
}

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "Alex Thompson",
    email: "alex@email.com",
    design: "Neon Dreams Collection",
    size: "L",
    status: "pending",
    total: 49.99,
    date: "2024-01-18",
  },
  {
    id: "ORD-002",
    customer: "Sarah Chen",
    email: "sarah@email.com",
    design: "Abstract Waves",
    size: "M",
    status: "printing",
    total: 39.99,
    date: "2024-01-18",
  },
  {
    id: "ORD-003",
    customer: "Marcus Williams",
    email: "marcus@email.com",
    design: "Urban Street Art",
    size: "XL",
    status: "shipped",
    total: 54.99,
    date: "2024-01-17",
  },
  {
    id: "ORD-004",
    customer: "Emma Davis",
    email: "emma@email.com",
    design: "Minimalist Logo",
    size: "S",
    status: "delivered",
    total: 34.99,
    date: "2024-01-16",
  },
  {
    id: "ORD-005",
    customer: "James Miller",
    email: "james@email.com",
    design: "Vintage Retro",
    size: "M",
    status: "pending",
    total: 44.99,
    date: "2024-01-18",
  },
];

const statusLabels = {
  pending: "Pending",
  printing: "Printing",
  shipped: "Shipped",
  delivered: "Delivered",
};

export function OrdersTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg text-foreground">Recent Orders</h3>
            <p className="text-sm text-muted-foreground">Latest customer orders</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Order
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Design
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Size
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total
              </th>
              <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="p-4">
                  <span className="font-medium text-foreground">{order.id}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{order.customer}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.email}</p>
                </td>
                <td className="p-4">
                  <span className="text-foreground">{order.design}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-secondary rounded text-sm text-secondary-foreground">
                    {order.size}
                  </span>
                </td>
                <td className="p-4">
                  <span className={cn("status-badge", `status-${order.status}`)}>
                    {statusLabels[order.status]}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-foreground">${order.total}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
