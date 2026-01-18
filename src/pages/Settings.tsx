import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Bell, Shield, Globe, Palette, Zap, Mail } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Settings = () => {
  const [activeRoute, setActiveRoute] = useState("/settings");
  const [notifications, setNotifications] = useState({
    orders: true,
    users: true,
    revenue: false,
    security: true,
  });

  const [features, setFeatures] = useState({
    customDesigns: true,
    aiDesigns: true,
    bulkOrders: false,
    guestCheckout: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
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
                <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage platform configuration and preferences</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="bg-secondary flex-wrap">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Site Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-muted-foreground">Site Name</Label>
                      <Input defaultValue="ThreadForge" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Contact Email</Label>
                      <Input defaultValue="support@threadforge.com" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-muted-foreground">Site Description</Label>
                      <Textarea
                        defaultValue="Create unique, custom t-shirts with our powerful design tools. Premium quality, fast shipping."
                        className="mt-2 bg-secondary border-border"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" />
                    Admin Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-muted-foreground">Name</Label>
                      <Input defaultValue="Admin User" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <Input defaultValue="admin@threadforge.com" className="mt-2 bg-secondary border-border" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Email Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "orders", label: "New Orders", desc: "Get notified when a new order is placed" },
                      { key: "users", label: "New Users", desc: "Get notified when a new user registers" },
                      { key: "revenue", label: "Revenue Milestones", desc: "Get notified when you hit revenue goals" },
                      { key: "security", label: "Security Alerts", desc: "Get notified of suspicious activity" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Feature Toggles
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: "customDesigns", label: "Custom Design Tool", desc: "Allow users to create custom designs" },
                      { key: "aiDesigns", label: "AI Design Generator", desc: "Enable AI-powered design suggestions" },
                      { key: "bulkOrders", label: "Bulk Orders", desc: "Allow bulk order discounts" },
                      { key: "guestCheckout", label: "Guest Checkout", desc: "Allow checkout without account" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={features[item.key as keyof typeof features]}
                          onCheckedChange={(checked) =>
                            setFeatures((prev) => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    SEO Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-muted-foreground">Meta Title</Label>
                      <Input
                        defaultValue="ThreadForge - Custom T-Shirt Design & Printing"
                        className="mt-2 bg-secondary border-border"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Recommended: 50-60 characters</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Meta Description</Label>
                      <Textarea
                        defaultValue="Create unique, custom t-shirts with ThreadForge's powerful design tools. Premium quality materials, fast shipping worldwide."
                        className="mt-2 bg-secondary border-border"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Recommended: 150-160 characters</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Keywords</Label>
                      <Input
                        defaultValue="custom t-shirts, t-shirt design, print on demand, custom apparel"
                        className="mt-2 bg-secondary border-border"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Settings
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Current Password</Label>
                      <Input type="password" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">New Password</Label>
                        <Input type="password" className="mt-2 bg-secondary border-border" />
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Confirm Password</Label>
                        <Input type="password" className="mt-2 bg-secondary border-border" />
                      </div>
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
