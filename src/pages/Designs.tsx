import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Star, Tag, DollarSign, Sparkles } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const designs = [
  { id: 1, name: "Neon Dreams", category: "Abstract", price: 0, type: "free", featured: true, sales: 234, views: 1520, customizable: true, image: "🌈" },
  { id: 2, name: "Urban Jungle", category: "Nature", price: 9.99, type: "paid", featured: false, sales: 156, views: 890, customizable: true, image: "🌿" },
  { id: 3, name: "Retro Wave", category: "Vintage", price: 14.99, type: "premium", featured: true, sales: 312, views: 2100, customizable: false, image: "🌊" },
  { id: 4, name: "Minimal Art", category: "Minimalist", price: 0, type: "free", featured: false, sales: 89, views: 456, customizable: true, image: "◻️" },
  { id: 5, name: "Cyber Punk", category: "Sci-Fi", price: 19.99, type: "premium", featured: true, sales: 445, views: 3200, customizable: true, image: "🤖" },
  { id: 6, name: "Abstract Flow", category: "Abstract", price: 7.99, type: "paid", featured: false, sales: 178, views: 920, customizable: true, image: "💫" },
  { id: 7, name: "Vintage Logo", category: "Vintage", price: 0, type: "free", featured: false, sales: 67, views: 340, customizable: false, image: "🏷️" },
  { id: 8, name: "Galaxy Dreams", category: "Space", price: 12.99, type: "paid", featured: true, sales: 289, views: 1800, customizable: true, image: "🌌" },
];

const typeConfig = {
  free: { label: "Free", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  paid: { label: "Paid", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  premium: { label: "Premium", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

const Designs = () => {
  const [activeRoute, setActiveRoute] = useState("/designs");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [...new Set(designs.map(d => d.category))];

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || design.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || design.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
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
                <h1 className="text-3xl font-display font-bold text-foreground">Designs</h1>
                <p className="text-muted-foreground mt-1">Manage your design gallery and catalog</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Design
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{designs.length}</p>
                    <p className="text-sm text-muted-foreground">Total Designs</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{designs.reduce((acc, d) => acc + d.sales, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Sales</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{designs.filter(d => d.featured).length}</p>
                    <p className="text-sm text-muted-foreground">Featured</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Eye className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{(designs.reduce((acc, d) => acc + d.views, 0) / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
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
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-secondary border-border">
                    <Tag className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-secondary border-border">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Designs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design, index) => {
                const typeInfo = typeConfig[design.type as keyof typeof typeConfig];
                return (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-xl overflow-hidden group"
                  >
                    {/* Design Preview */}
                    <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-6xl relative">
                      {design.image}
                      {design.featured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem><Star className="w-4 h-4 mr-2" />Feature</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {/* Design Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-foreground">{design.name}</h3>
                          <p className="text-sm text-muted-foreground">{design.category}</p>
                        </div>
                        <Badge className={`${typeInfo.color} border text-xs`}>
                          {typeInfo.label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{design.sales} sales</span>
                        <span>{design.views} views</span>
                      </div>
                      {design.price > 0 && (
                        <p className="text-lg font-bold text-primary mt-2">${design.price}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Designs;
