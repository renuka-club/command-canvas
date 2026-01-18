import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Edit, Eye, Package, Shirt, DollarSign, Layers } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { id: 1, name: "Classic Tee", type: "T-Shirt", sizes: ["S", "M", "L", "XL", "XXL"], colors: 8, basePrice: 24.99, stock: 450, available: true },
  { id: 2, name: "Premium Fitted", type: "T-Shirt", sizes: ["S", "M", "L", "XL"], colors: 5, basePrice: 34.99, stock: 280, available: true },
  { id: 3, name: "Oversized Tee", type: "T-Shirt", sizes: ["M", "L", "XL", "XXL"], colors: 6, basePrice: 29.99, stock: 320, available: true },
  { id: 4, name: "V-Neck Essential", type: "T-Shirt", sizes: ["S", "M", "L", "XL"], colors: 4, basePrice: 27.99, stock: 180, available: false },
  { id: 5, name: "Long Sleeve Classic", type: "Long Sleeve", sizes: ["S", "M", "L", "XL", "XXL"], colors: 6, basePrice: 32.99, stock: 240, available: true },
  { id: 6, name: "Crop Top", type: "T-Shirt", sizes: ["XS", "S", "M", "L"], colors: 7, basePrice: 22.99, stock: 150, available: true },
  { id: 7, name: "Tank Top", type: "Tank", sizes: ["S", "M", "L", "XL"], colors: 5, basePrice: 19.99, stock: 200, available: true },
  { id: 8, name: "Hoodie Essential", type: "Hoodie", sizes: ["S", "M", "L", "XL", "XXL"], colors: 4, basePrice: 49.99, stock: 120, available: true },
];

const Products = () => {
  const [activeRoute, setActiveRoute] = useState("/products");
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState(products);

  const filteredProducts = productList.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAvailability = (id: number) => {
    setProductList(prev =>
      prev.map(p => p.id === id ? { ...p, available: !p.available } : p)
    );
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
                <h1 className="text-3xl font-display font-bold text-foreground">Products</h1>
                <p className="text-muted-foreground mt-1">Manage T-shirt types, sizes, and pricing</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Shirt className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{products.length}</p>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{products.reduce((acc, p) => acc + p.stock, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Stock</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Layers className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{products.reduce((acc, p) => acc + p.colors, 0)}</p>
                    <p className="text-sm text-muted-foreground">Color Options</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">${(products.reduce((acc, p) => acc + p.basePrice, 0) / products.length).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Avg. Price</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Product</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-muted-foreground">Sizes</TableHead>
                    <TableHead className="text-muted-foreground">Colors</TableHead>
                    <TableHead className="text-muted-foreground">Base Price</TableHead>
                    <TableHead className="text-muted-foreground">Stock</TableHead>
                    <TableHead className="text-muted-foreground">Available</TableHead>
                    <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-border hover:bg-secondary/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Shirt className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {product.sizes.map(size => (
                            <span key={size} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                              {size}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{product.colors}</TableCell>
                      <TableCell className="text-foreground font-medium">${product.basePrice}</TableCell>
                      <TableCell>
                        <Badge className={product.stock < 200 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border" : "bg-green-500/20 text-green-400 border-green-500/30 border"}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={product.available}
                          onCheckedChange={() => toggleAvailability(product.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
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

export default Products;
