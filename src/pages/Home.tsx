import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Wand2, 
  Video, 
  Sparkles, 
  Zap,
  ImageIcon
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: ImageIcon,
      title: "AI Image Editing",
      description: "Remove backgrounds, add elements, and edit with smart prompts.",
      href: "/studio"
    },
    {
      icon: Video,
      title: "Ad Video Styles",
      description: "Choose from professional video styles to create impactful ads.",
      href: "/video-styles"
    },
    {
      icon: Sparkles,
      title: "AI Video Generation",
      description: "Turn your images into professional ad videos with AI.",
      href: "/generate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">AI Studio</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create stunning ad videos from your images using advanced AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/studio">
              <Button variant="hero" size="lg" className="gap-2">
                <Wand2 className="w-5 h-5" />
                Start Editing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/video-styles">
              <Button variant="neon" size="lg" className="gap-2">
                <Video className="w-5 h-5" />
                Browse Styles
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 float">
          <div className="w-20 h-20 rounded-full bg-gradient-neon opacity-20 blur-xl" />
        </div>
        <div className="absolute bottom-20 right-10 float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 rounded-full bg-gradient-tech opacity-20 blur-2xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI tools to turn your creative ideas into reality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.href}>
                  <Card className="glass-card p-8 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    <div className="flex items-center text-primary group-hover:text-primary-glow transition-colors">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animated-border p-12">
            <Card className="glass-card p-12 border-0">
              <Zap className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to create <span className="gradient-text">viral content</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators using our platform to generate high-converting ad videos
              </p>
              <Link to="/studio">
                <Button variant="hero" size="lg" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;