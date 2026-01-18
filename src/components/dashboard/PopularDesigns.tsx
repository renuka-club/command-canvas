import { motion } from "framer-motion";
import { TrendingUp, Heart, Eye } from "lucide-react";

interface Design {
  id: string;
  name: string;
  category: string;
  sales: number;
  views: number;
  likes: number;
  image: string;
}

const designs: Design[] = [
  {
    id: "1",
    name: "Neon Dreams",
    category: "Abstract",
    sales: 245,
    views: 1520,
    likes: 432,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Urban Edge",
    category: "Street Art",
    sales: 189,
    views: 1120,
    likes: 356,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Minimal Wave",
    category: "Minimalist",
    sales: 167,
    views: 980,
    likes: 289,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Retro Vibes",
    category: "Vintage",
    sales: 156,
    views: 890,
    likes: 267,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=200&h=200&fit=crop",
  },
];

export function PopularDesigns() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Popular Designs</h3>
          <p className="text-sm text-muted-foreground">Top performing this month</p>
        </div>
        <div className="flex items-center gap-2 text-success">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+24%</span>
        </div>
      </div>

      <div className="space-y-4">
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img
                src={design.image}
                alt={design.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {design.name}
              </h4>
              <p className="text-xs text-muted-foreground">{design.category}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>{design.views}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span>{design.likes}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{design.sales}</p>
                <p className="text-xs text-muted-foreground">sales</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
