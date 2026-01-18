import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Printer, Truck, CheckCircle, Clock, Package } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  { id: "ORD-001", customer: "John Smith", email: "john@email.com", design: "Neon Dreams", size: "L", qty: 2, total: 89.98, status: "pending", date: "2024-01-15" },
  { id: "ORD-002", customer: "Sarah Wilson", email: "sarah@email.com", design: "Urban Jungle", size: "M", qty: 1, total: 44.99, status: "printing", date: "2024-01-15" },
  { id: "ORD-003", customer: "Mike Johnson", email: "mike@email.com", design: "Retro Wave", size: "XL", qty: 3, total: 134.97, status: "shipped", date: "2024-01-14" },
  { id: "ORD-004", customer: "Emily Brown", email: "emily@email.com", design: "Minimal Art", size: "S", qty: 1, total: 39.99, status: "delivered", date: "2024-01-13" },
  { id: "ORD-005", customer: "David Lee", email: "david@email.com", design: "Cyber Punk", size: "M", qty: 2, total: 79.98, status: "pending", date: "2024-01-15" },
  { id: "ORD-006", customer: "Lisa Chen", email: "lisa@email.com", design: "Abstract Flow", size: "L", qty: 1, total: 49.99, status: "printing", date: "2024-01-14" },
  { id: "ORD-007", customer: "Tom Harris", email: "tom@email.com", design: "Vintage Logo", size: "XL", qty: 4, total: 179.96, status: "shipped", date: "2024-01-12" },
  { id: "ORD-008", customer: "Anna Martinez", email: "anna@email.com", design: "Neon Dreams", size: "M", qty: 1, total: 44.99, status: "delivered", date: "2024-01-11" },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  printing: { label: "Printing", icon: Printer, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
};

const Orders = () => {
  const [activeRoute, setActiveRoute] = useState("/orders");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.design.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />
      
      <main className="flex-1 min-w-0">
        <DashboardHeader />
        
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">Orders</h1>
                <p className="text-muted-foreground mt-1">Manage and track all customer orders</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(statusConfig).map(([key, config]) => {
                const count = orders.filter(o => o.status === key).length;
                const Icon = config.icon;
                return (
                  <div key={key} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{count}</p>
                        <p className="text-sm text-muted-foreground">{config.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-secondary border-border">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="printing">Printing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Order ID</TableHead>
                    <TableHead className="text-muted-foreground">Customer</TableHead>
                    <TableHead className="text-muted-foreground">Design</TableHead>
                    <TableHead className="text-muted-foreground">Size/Qty</TableHead>
                    <TableHead className="text-muted-foreground">Total</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Date</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order, index) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">{order.design}</TableCell>
                        <TableCell className="text-muted-foreground">{order.size} × {order.qty}</TableCell>
                        <TableCell className="text-foreground font-medium">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={`${status.color} border gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Orders;
