import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreHorizontal, Mail, ShoppingBag, Palette, Ban, CheckCircle, XCircle } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  { id: 1, name: "John Smith", email: "john@email.com", avatar: "", orders: 12, designs: 5, spent: 524.88, status: "active", joined: "2024-01-01" },
  { id: 2, name: "Sarah Wilson", email: "sarah@email.com", avatar: "", orders: 8, designs: 3, spent: 359.92, status: "active", joined: "2024-01-05" },
  { id: 3, name: "Mike Johnson", email: "mike@email.com", avatar: "", orders: 23, designs: 8, spent: 1034.77, status: "active", joined: "2023-12-15" },
  { id: 4, name: "Emily Brown", email: "emily@email.com", avatar: "", orders: 5, designs: 2, spent: 199.95, status: "suspended", joined: "2024-01-10" },
  { id: 5, name: "David Lee", email: "david@email.com", avatar: "", orders: 15, designs: 6, spent: 674.85, status: "active", joined: "2023-11-20" },
  { id: 6, name: "Lisa Chen", email: "lisa@email.com", avatar: "", orders: 3, designs: 1, spent: 134.97, status: "active", joined: "2024-01-12" },
  { id: 7, name: "Tom Harris", email: "tom@email.com", avatar: "", orders: 0, designs: 0, spent: 0, status: "blocked", joined: "2024-01-08" },
  { id: 8, name: "Anna Martinez", email: "anna@email.com", avatar: "", orders: 18, designs: 7, spent: 809.82, status: "active", joined: "2023-10-25" },
];

const Users = () => {
  const [activeRoute, setActiveRoute] = useState("/users");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "suspended":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border"><Ban className="w-3 h-3 mr-1" />Suspended</Badge>;
      case "blocked":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border"><XCircle className="w-3 h-3 mr-1" />Blocked</Badge>;
      default:
        return null;
    }
  };

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
                <h1 className="text-3xl font-display font-bold text-foreground">Users</h1>
                <p className="text-muted-foreground mt-1">Manage customer accounts and activity</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-sm py-1.5 px-3">
                  {users.filter(u => u.status === "active").length} Active
                </Badge>
                <Badge variant="outline" className="text-sm py-1.5 px-3">
                  {users.length} Total
                </Badge>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/20">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{users.reduce((acc, u) => acc + u.orders, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent/20">
                    <Palette className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{users.reduce((acc, u) => acc + u.designs, 0)}</p>
                    <p className="text-sm text-muted-foreground">Designs Created</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-dashboard-success/20">
                    <Mail className="w-6 h-6 text-dashboard-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${users.reduce((acc, u) => acc + u.spent, 0).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "active" ? "default" : "outline"}
                  onClick={() => setStatusFilter("active")}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === "suspended" ? "default" : "outline"}
                  onClick={() => setStatusFilter("suspended")}
                >
                  Suspended
                </Button>
              </div>
            </div>

            {/* Users Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">User</TableHead>
                    <TableHead className="text-muted-foreground">Orders</TableHead>
                    <TableHead className="text-muted-foreground">Designs</TableHead>
                    <TableHead className="text-muted-foreground">Total Spent</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Joined</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-border hover:bg-secondary/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{user.orders}</TableCell>
                      <TableCell className="text-foreground">{user.designs}</TableCell>
                      <TableCell className="text-foreground font-medium">${user.spent.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Orders</DropdownMenuItem>
                            <DropdownMenuItem>View Designs</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-yellow-400">Suspend User</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">Block User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Users;
