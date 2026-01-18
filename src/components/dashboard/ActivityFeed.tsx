import { motion } from "framer-motion";
import { ShoppingCart, UserPlus, Palette, CreditCard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "order" | "user" | "design" | "payment" | "shipping";
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    description: "Alex Thompson ordered Neon Dreams (L)",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "user",
    title: "New user registered",
    description: "Sarah Chen joined the platform",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment completed",
    description: "$54.99 received from Marcus Williams",
    time: "32 min ago",
  },
  {
    id: "4",
    type: "design",
    title: "Design uploaded",
    description: "Urban Street Art added to gallery",
    time: "1 hour ago",
  },
  {
    id: "5",
    type: "shipping",
    title: "Order shipped",
    description: "ORD-003 shipped via Express",
    time: "2 hours ago",
  },
];

const iconMap = {
  order: ShoppingCart,
  user: UserPlus,
  design: Palette,
  payment: CreditCard,
  shipping: Package,
};

const colorMap = {
  order: "bg-primary/20 text-primary",
  user: "bg-success/20 text-success",
  design: "bg-accent/20 text-accent",
  payment: "bg-warning/20 text-warning",
  shipping: "bg-muted text-muted-foreground",
};

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Platform updates & events</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className={cn("p-2 rounded-lg", colorMap[activity.type])}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
