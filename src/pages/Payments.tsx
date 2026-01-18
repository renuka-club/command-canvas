import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, DollarSign, TrendingUp, CreditCard, RefreshCcw, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transactions = [
  { id: "TXN-001", customer: "John Smith", type: "payment", amount: 89.98, status: "completed", date: "2024-01-15", method: "Stripe" },
  { id: "TXN-002", customer: "Sarah Wilson", type: "payment", amount: 44.99, status: "completed", date: "2024-01-15", method: "PayPal" },
  { id: "TXN-003", customer: "Mike Johnson", type: "refund", amount: -34.99, status: "processed", date: "2024-01-14", method: "Stripe" },
  { id: "TXN-004", customer: "Emily Brown", type: "payment", amount: 134.97, status: "pending", date: "2024-01-14", method: "Stripe" },
  { id: "TXN-005", customer: "David Lee", type: "payment", amount: 79.98, status: "completed", date: "2024-01-13", method: "Stripe" },
  { id: "TXN-006", customer: "Lisa Chen", type: "refund", amount: -24.99, status: "processed", date: "2024-01-13", method: "PayPal" },
  { id: "TXN-007", customer: "Tom Harris", type: "payment", amount: 179.96, status: "completed", date: "2024-01-12", method: "Stripe" },
  { id: "TXN-008", customer: "Anna Martinez", type: "payment", amount: 49.99, status: "failed", date: "2024-01-12", method: "Stripe" },
];

const invoices = [
  { id: "INV-001", customer: "John Smith", amount: 89.98, status: "paid", date: "2024-01-15", dueDate: "2024-01-22" },
  { id: "INV-002", customer: "Corporate Client A", amount: 1249.50, status: "pending", date: "2024-01-14", dueDate: "2024-01-28" },
  { id: "INV-003", customer: "Corporate Client B", amount: 856.00, status: "overdue", date: "2024-01-01", dueDate: "2024-01-15" },
  { id: "INV-004", customer: "Mike Johnson", amount: 134.97, status: "paid", date: "2024-01-10", dueDate: "2024-01-17" },
];

const Payments = () => {
  const [activeRoute, setActiveRoute] = useState("/payments");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(txn =>
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string, type: string) => {
    if (type === "refund") {
      return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 border">Refund</Badge>;
    }
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">Failed</Badge>;
      case "processed":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 border">Processed</Badge>;
      default:
        return null;
    }
  };

  const getInvoiceStatus = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">Overdue</Badge>;
      default:
        return null;
    }
  };

  const totalRevenue = transactions.filter(t => t.type === "payment" && t.status === "completed").reduce((acc, t) => acc + t.amount, 0);
  const totalRefunds = Math.abs(transactions.filter(t => t.type === "refund").reduce((acc, t) => acc + t.amount, 0));

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
                <h1 className="text-3xl font-display font-bold text-foreground">Payments</h1>
                <p className="text-muted-foreground mt-1">Transactions, refunds, and revenue tracking</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <RefreshCcw className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${totalRefunds.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Refunds</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{transactions.length}</p>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">+12.5%</p>
                    <p className="text-sm text-muted-foreground">vs Last Month</p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="transactions" className="space-y-6">
              <TabsList className="bg-secondary">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>

              {/* Transactions Tab */}
              <TabsContent value="transactions" className="space-y-6">
                <div className="glass-card rounded-xl p-6">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Transaction ID</TableHead>
                        <TableHead className="text-muted-foreground">Customer</TableHead>
                        <TableHead className="text-muted-foreground">Amount</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-muted-foreground">Method</TableHead>
                        <TableHead className="text-muted-foreground">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((txn, index) => (
                        <motion.tr
                          key={txn.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-border hover:bg-secondary/50"
                        >
                          <TableCell className="font-medium text-foreground">{txn.id}</TableCell>
                          <TableCell className="text-foreground">{txn.customer}</TableCell>
                          <TableCell>
                            <span className={`font-medium flex items-center gap-1 ${txn.amount < 0 ? "text-red-400" : "text-green-400"}`}>
                              {txn.amount < 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                              ${Math.abs(txn.amount).toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(txn.status, txn.type)}</TableCell>
                          <TableCell className="text-muted-foreground">{txn.method}</TableCell>
                          <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Invoices Tab */}
              <TabsContent value="invoices" className="space-y-6">
                <div className="glass-card rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Invoice ID</TableHead>
                        <TableHead className="text-muted-foreground">Customer</TableHead>
                        <TableHead className="text-muted-foreground">Amount</TableHead>
                        <TableHead className="text-muted-foreground">Status</TableHead>
                        <TableHead className="text-muted-foreground">Issue Date</TableHead>
                        <TableHead className="text-muted-foreground">Due Date</TableHead>
                        <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice, index) => (
                        <motion.tr
                          key={invoice.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-border hover:bg-secondary/50"
                        >
                          <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                          <TableCell className="text-foreground">{invoice.customer}</TableCell>
                          <TableCell className="text-foreground font-medium">${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{getInvoiceStatus(invoice.status)}</TableCell>
                          <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                          <TableCell className="text-muted-foreground">{invoice.dueDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payments;
