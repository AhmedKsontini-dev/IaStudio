import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Play, 
  ArrowRight, 
  Zap, 
  Sparkles,
  Briefcase,
  Heart,
  ShoppingBag,
  Gamepad2,
  Music,
  Utensils
} from "lucide-react";
import videoStylesPreview from "@/assets/video-styles-preview.jpg";

const VideoStyles = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const videoStyles = [
    {
      id: "cinematic",
      name: "Cinematic",
      description: "Hollywood style with smooth transitions and dramatic effects",
      category: "Professional",
      icon: Briefcase,
      preview: videoStylesPreview,
      features: ["Transitions cinéma", "Color grading pro", "Effets sonores"],
      color: "from-amber-500 to-orange-600"
    },
    {
      id: "modern",
      name: "Modern & Elegant",
      description: "Minimal design with subtle animations and modern typography",
      category: "Business",
      icon: Sparkles,
      preview: videoStylesPreview,
      features: ["Animations fluides", "Typography premium", "Couleurs tendance"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "energetic",
      name: "Energetic & Dynamic",
      description: "Fast-paced rhythm, vibrant colors and punchy transitions",
      category: "Marketing",
      icon: Zap,
      preview: videoStylesPreview,
      features: ["Rythme soutenu", "Effets percutants", "Musique dynamique"],
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "social",
      name: "Social Media",
      description: "Optimized for Instagram, TikTok with vertical formats",
      category: "Social Media",
      icon: Heart,
      preview: videoStylesPreview,
      features: ["Format 9:16", "Hooks accrocheurs", "Call-to-action"],
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Specifically designed for products and conversions",
      category: "Vente",
      icon: ShoppingBag,
      preview: videoStylesPreview,
      features: ["Focus produit", "Prix attractifs", "Bouton achat"],
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "gaming",
      name: "Gaming & Tech",
      description: "Tech aesthetic with neon effects and futuristic animations",
      category: "Gaming",
      icon: Gamepad2,
      preview: videoStylesPreview,
      features: ["Effets néon", "UI futuriste", "Glitch effects"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "music",
      name: "Music & Art",
      description: "Artistic style with advanced music synchronization",
      category: "Creative",
      icon: Music,
      preview: videoStylesPreview,
      features: ["Sync musicale", "Effets visuels", "Transitions beat"],
      color: "from-red-500 to-pink-500"
    },
    {
      id: "food",
      name: "Food & Lifestyle",
      description: "Warm and appetizing colors for the food industry",
      category: "Lifestyle",
      icon: Utensils,
      preview: videoStylesPreview,
      features: ["Couleurs chaudes", "Zoom appétissant", "Ambiance cosy"],
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const categories = [...new Set(videoStyles.map(style => style.category))];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Video <span className="gradient-text">Styles</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect style to turn your images into captivating ad videos
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant="secondary" 
              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Styles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {videoStyles.map((style) => {
            const Icon = style.icon;
            const isSelected = selectedStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={`glass-card cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-elevated ${
                  isSelected ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                onClick={() => setSelectedStyle(isSelected ? null : style.id)}
              >
                <div className="relative">
                  <img 
                    src={style.preview} 
                    alt={style.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-t-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="hero" size="sm" className="gap-2">
                      <Play className="w-4 h-4" />
                      Preview
                    </Button>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-black/50 text-white"
                  >
                    {style.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${style.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{style.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {style.description}
                  </p>
                  
                  <div className="space-y-2">
                    {style.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Style Action */}
        {selectedStyle && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <Card className="glass-card p-4">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <p className="font-medium">Selected style:</p>
                  <p className="text-primary">
                    {videoStyles.find(s => s.id === selectedStyle)?.name}
                  </p>
                </div>
                <Link to="/generate" state={{ selectedStyle }}>
                  <Button variant="hero" className="gap-2">
                    Generate my video
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoStyles;