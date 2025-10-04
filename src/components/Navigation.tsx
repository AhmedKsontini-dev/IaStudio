import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ImageIcon, 
  Video, 
  Sparkles, 
  FolderOpen 
} from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Zap },
    { path: "/studio", label: "Studio", icon: ImageIcon },
    { path: "/video-styles", label: "Video Styles", icon: Video },
    { path: "/generate", label: "Generate", icon: Sparkles },
    { path: "/gallery", label: "My Creations", icon: FolderOpen },
  ];

  return (
    <nav className="glass-card fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3">
      <div className="flex items-center gap-6">
        <div className="gradient-text font-bold text-xl">
          AI Studio
        </div>
        
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "hero" : "ghost"}
                  size="sm"
                  className={`gap-2 ${isActive ? "" : "hover:bg-white/5"}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;