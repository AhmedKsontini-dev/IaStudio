import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  Wand2, 
  Download, 
  ImageIcon,
  Scissors,
  Palette,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const Studio = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleProcessImage = async () => {
    if (!selectedImage || !prompt.trim()) {
      toast.error("Please select an image and enter a prompt");
      return;
    }

    setIsProcessing(true);
    // Simulated AI processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Image successfully modified!");
    }, 3000);
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      setIsProcessing(true);
      setProcessedImageUrl("");

      const formData = new FormData();
      formData.append("image_file", selectedImage);
      formData.append("size", "auto");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "1QDKbVvyvV47damJz6bw8g6y",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API Error (${response.status})`);
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(objectUrl);
      toast.success("Background successfully removed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove background");
    } finally {
      setIsProcessing(false);
    }
  };

  const presetActions = [
    {
      icon: Scissors,
      title: "Remove Background",
      prompt: "Remove the background from this image, keep only the main subject",
      color: "from-red-500 to-pink-500",
      action: "remove_bg" as const,
    },
    {
      icon: Palette,
      title: "Change Background",
      prompt: "Replace the background with a modern office environment",
      color: "from-blue-500 to-cyan-500",
      action: "prompt_only" as const,
    },
    {
      icon: Sparkles,
      title: "Enhance Quality",
      prompt: "Enhance image quality, improve lighting and sharpness",
      color: "from-purple-500 to-indigo-500",
      action: "prompt_only" as const,
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="gradient-text">Editing Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your images and use smart prompts to transform them
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary" />
              Image Source
            </h2>

            {!imagePreview ? (
              <div 
                className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Click to upload an image</p>
                <p className="text-muted-foreground">JPG, PNG, WEBP up to 10MB</p>
              </div>
            ) : (
              <div className="relative group">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full rounded-xl shadow-elevated"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <Button 
                    variant="hero"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Image
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
          </Card>

          {/* Editing Section */}
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Wand2 className="w-6 h-6 text-primary" />
              AI Editing
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Editing Prompt
                </label>
                <Textarea
                  placeholder="Describe how you want to modify the image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] bg-muted/20 border-muted-foreground/20"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  Quick Actions
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {presetActions.map((action, index) => {
                    const Icon = action.icon;
                    const handleClick = () => {
                      if (action.action === "remove_bg") {
                        void handleRemoveBackground();
                      } else {
                        setPrompt(action.prompt);
                      }
                    };
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start gap-3 p-4 h-auto bg-muted/10 border-muted-foreground/20 hover:bg-muted/20"
                        onClick={handleClick}
                        disabled={action.action === "remove_bg" && (!selectedImage || isProcessing)}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span>{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full gap-2"
                onClick={handleProcessImage}
                disabled={!selectedImage || !prompt.trim() || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Modify Image
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {imagePreview && (
          <Card className="glass-card p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Download className="w-6 h-6 text-primary" />
              Result
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Original Image</h3>
                <img src={imagePreview} alt="Original" className="w-full rounded-lg shadow-lg" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Modified Image</h3>
                {processedImageUrl ? (
                  <div className="relative group">
                    <img src={processedImageUrl} alt="Result" className="w-full rounded-lg shadow-lg" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <a
                        href={processedImageUrl}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/90 text-black hover:bg-white shadow"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <p className="text-muted-foreground">The result will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};


export default Studio;