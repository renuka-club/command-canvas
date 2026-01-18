import { useState } from "react";
import { ShoppingCart, Users, DollarSign, Package } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { PopularDesigns } from "@/components/dashboard/PopularDesigns";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

const Index = () => {
  const [activeRoute, setActiveRoute] = useState("/");

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar activeRoute={activeRoute} onNavigate={setActiveRoute} />
      
      <main className="flex-1 min-w-0">
        <DashboardHeader />
        
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Today's Orders"
              value="156"
              change={12.5}
              changeLabel="vs yesterday"
              icon={ShoppingCart}
              variant="primary"
              delay={0}
            />
            <StatCard
              title="Monthly Revenue"
              value="$48,250"
              change={8.2}
              changeLabel="vs last month"
              icon={DollarSign}
              variant="success"
              delay={0.1}
            />
            <StatCard
              title="Active Users"
              value="2,847"
              change={-2.4}
              changeLabel="vs last week"
              icon={Users}
              variant="accent"
              delay={0.2}
            />
            <StatCard
              title="Pending Orders"
              value="23"
              change={15.3}
              changeLabel="needs attention"
              icon={Package}
              variant="warning"
              delay={0.3}
            />
          </div>

          {/* Charts & Widgets Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <PopularDesigns />
          </div>

          {/* Orders & Activity Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <OrdersTable />
            </div>
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
