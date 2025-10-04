import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Wand2, 
  Download, 
  Play,
  Settings,
  Sparkles,
  Video,
  Clock,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const Generate = () => {
  const location = useLocation();
  const selectedStyle = location.state?.selectedStyle || null;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [duration, setDuration] = useState("15");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedImage || !videoPrompt.trim()) {
      toast.error("Please select an image and enter a description");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    // Simulated generation process
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          setGeneratedVideo("https://via.placeholder.com/800x450/000000/FFFFFF?text=Generated+Video");
          toast.success("Video generated successfully!");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const generationSteps = [
    { step: 1, title: "Analyzing image", progress: 25 },
    { step: 2, title: "Applying style", progress: 50 },
    { step: 3, title: "Generating transitions", progress: 75 },
    { step: 4, title: "Finalizing", progress: 100 }
  ];

  const currentStep = generationSteps.find(s => progress < s.progress) || generationSteps[3];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="gradient-text">Video Generation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your images into professional ad videos with AI
          </p>
          {selectedStyle && (
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary">
                <Video className="w-4 h-4" />
                Style sélectionné: {selectedStyle}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-primary" />
              Setup
            </h2>

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Image source
                </label>
                {!imagePreview ? (
                  <div 
                    className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium mb-1">Click to upload</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG, WEBP</p>
                  </div>
                ) : (
                  <div className="relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <Button 
                        variant="hero"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Video Description */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Video description
                </label>
                <Textarea
                  placeholder="Describe the message, mood and style of your ad..."
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  className="min-h-[100px] bg-muted/20 border-muted-foreground/20"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Duration (seconds)
                </label>
                <div className="flex gap-2">
                  {["15", "30", "60"].map((dur) => (
                    <Button
                      key={dur}
                      variant={duration === dur ? "hero" : "outline"}
                      size="sm"
                      onClick={() => setDuration(dur)}
                      className="flex-1"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      {dur}s
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Preview/Generation Section */}
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              {isGenerating ? "Generating" : "Preview"}
            </h2>

            {!isGenerating && !generatedVideo && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Ready to generate</p>
                <p className="text-muted-foreground mb-6">
                  Your video will appear here once generated
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={handleGenerateVideo}
                  disabled={!selectedImage || !videoPrompt.trim()}
                  className="gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  Generate video
                </Button>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary-foreground animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
                  <p className="text-muted-foreground">
                    AI is working on your video...
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progression</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {generationSteps.map((step) => (
                    <div 
                      key={step.step}
                      className={`p-3 rounded-lg border ${
                        progress >= step.progress 
                          ? "border-primary bg-primary/10" 
                          : "border-muted-foreground/20"
                      }`}
                    >
                      <div className="text-sm font-medium">{step.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedVideo && (
              <div className="space-y-6">
                <div className="relative">
                  <div className="aspect-video bg-black rounded-xl flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="hero" size="lg" className="gap-2">
                      <Play className="w-5 h-5" />
                      Play video
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" className="flex-1 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Generate;