import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Palette,
  Package,
  Image,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shirt
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Orders", href: "/orders", badge: 12 },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Palette, label: "Designs", href: "/designs" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Image, label: "Branding", href: "/branding" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

interface AdminSidebarProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

export function AdminSidebar({ activeRoute = "/", onNavigate }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
    onNavigate?.(href);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center p-1">
          <img src="/logo.png" alt="Command Canvas" className="w-full h-full object-contain" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-display font-bold text-lg text-foreground">Command Canvas</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.href;

          return (
            <button
              key={item.href}
              onClick={() => handleNavigate(item.href)}
              className={cn(
                "nav-link w-full relative group",
                isActive && "active"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 text-left"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {item.badge && !isCollapsed && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground"
                >
                  {item.badge}
                </motion.span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
