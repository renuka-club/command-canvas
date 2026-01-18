import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image, Palette, Eye, Sparkles, Sun, Moon, Snowflake, Flower2 } from "lucide-react";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const seasonalThemes = [
  { id: "summer", name: "Summer Vibes", icon: Sun, colors: ["#FF6B35", "#F7C59F", "#2EC4B6"] },
  { id: "winter", name: "Winter Frost", icon: Snowflake, colors: ["#A8DADC", "#457B9D", "#1D3557"] },
  { id: "spring", name: "Spring Bloom", icon: Flower2, colors: ["#FFB5E8", "#B5DEFF", "#97F9B1"] },
  { id: "default", name: "Default Dark", icon: Moon, colors: ["#00F0FF", "#8B5CF6", "#0F0F0F"] },
];

const Branding = () => {
  const [activeRoute, setActiveRoute] = useState("/branding");
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState("default");

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
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground">Branding</h1>
              <p className="text-muted-foreground mt-1">Manage logos, watermarks, and visual identity</p>
            </div>

            <Tabs defaultValue="assets" className="space-y-6">
              <TabsList className="bg-secondary">
                <TabsTrigger value="assets">Brand Assets</TabsTrigger>
                <TabsTrigger value="watermark">Watermark</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal Themes</TabsTrigger>
                <TabsTrigger value="homepage">Homepage</TabsTrigger>
              </TabsList>

              {/* Brand Assets Tab */}
              <TabsContent value="assets" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5 text-primary" />
                      Primary Logo
                    </h3>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium mb-1">Drop your logo here</p>
                      <p className="text-sm text-muted-foreground">PNG, SVG or WebP (max 2MB)</p>
                      <Button variant="outline" className="mt-4">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  {/* Icon Upload */}
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Favicon / App Icon
                    </h3>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium mb-1">Drop your icon here</p>
                      <p className="text-sm text-muted-foreground">Square image, min 512x512px</p>
                      <Button variant="outline" className="mt-4">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Brand Colors */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Brand Colors
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: "Primary", color: "#00F0FF" },
                      { name: "Accent", color: "#8B5CF6" },
                      { name: "Success", color: "#10B981" },
                      { name: "Warning", color: "#F59E0B" },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <Label className="text-muted-foreground">{item.name}</Label>
                        <div className="flex gap-2">
                          <div
                            className="w-10 h-10 rounded-lg border border-border"
                            style={{ backgroundColor: item.color }}
                          />
                          <Input
                            defaultValue={item.color}
                            className="bg-secondary border-border font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Watermark Tab */}
              <TabsContent value="watermark" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Watermark Settings</h3>
                      <p className="text-sm text-muted-foreground">Add watermark to user design previews</p>
                    </div>
                    <Switch checked={watermarkEnabled} onCheckedChange={setWatermarkEnabled} />
                  </div>
                  
                  {watermarkEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-foreground font-medium mb-1">Upload watermark image</p>
                        <p className="text-sm text-muted-foreground">Transparent PNG recommended</p>
                        <Button variant="outline" className="mt-4">Browse Files</Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground">Position</Label>
                          <select className="w-full mt-2 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground">
                            <option>Bottom Right</option>
                            <option>Bottom Left</option>
                            <option>Center</option>
                            <option>Top Right</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Opacity</Label>
                          <Input type="number" defaultValue="30" min="10" max="100" className="mt-2 bg-secondary border-border" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </TabsContent>

              {/* Seasonal Themes Tab */}
              <TabsContent value="seasonal" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Seasonal Themes</h3>
                  <p className="text-muted-foreground mb-6">Apply seasonal branding to your storefront</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {seasonalThemes.map((theme) => {
                      const Icon = theme.icon;
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className={`w-8 h-8 mx-auto mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                          <p className="font-medium text-foreground text-sm">{theme.name}</p>
                          <div className="flex justify-center gap-1 mt-3">
                            {theme.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Homepage Tab */}
              <TabsContent value="homepage" className="space-y-6">
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Homepage Hero
                  </h3>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-foreground font-medium mb-1">Upload hero image</p>
                    <p className="text-sm text-muted-foreground">Recommended: 1920x800px</p>
                    <Button variant="outline" className="mt-4">Browse Files</Button>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Hero Content</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground">Headline</Label>
                      <Input defaultValue="Design Your Perfect Tee" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Subheadline</Label>
                      <Input defaultValue="Create unique, custom t-shirts with our powerful design tools" className="mt-2 bg-secondary border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground">CTA Button Text</Label>
                      <Input defaultValue="Start Designing" className="mt-2 bg-secondary border-border" />
                    </div>
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

export default Branding;
