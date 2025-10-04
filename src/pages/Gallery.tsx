import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Play, 
  Download, 
  Share2, 
  Trash2, 
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Video,
  Image as ImageIcon
} from "lucide-react";
import heroImage from "@/assets/sa.png";

const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'images' | 'videos'>('all');

  type Creation = {
    id: number;
    type: 'image' | 'video';
    title: string;
    thumbnail: string;
    style: string;
    createdAt: string;
    size: string;
    duration?: string;
  };

  // Données statiques: une seule image depuis assets
  const creations: Creation[] = [
    {
      id: 1,
      type: 'image',
      title: 'Static image',
      thumbnail: heroImage,
      style: 'Preview',
      createdAt: '2025-10-03',
      size: '2.1 MB'
    }
  ];

  const filteredCreations = creations.filter(creation => {
    const matchesSearch = creation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creation.style.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'images' && creation.type === 'image') ||
      (filterType === 'videos' && creation.type === 'video');
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    return type === 'video' ? Video : ImageIcon;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Creations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find all your edited images and generated videos
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search in my creations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/20 border-muted-foreground/20"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              All
            </Button>
            <Button
              variant={filterType === 'images' ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setFilterType('images')}
              className="gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Images
            </Button>
            <Button
              variant={filterType === 'videos' ? 'hero' : 'outline'}
              size="sm"
              onClick={() => setFilterType('videos')}
              className="gap-2"
            >
              <Video className="w-4 h-4" />
              Videos
            </Button>
          </div>

          <div className="flex border border-muted-foreground/20 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {filteredCreations.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No results</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreations.map((creation) => {
              const TypeIcon = getTypeIcon(creation.type);
              return (
                <Card key={creation.id} className="glass-card overflow-hidden group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img 
                      src={creation.thumbnail} 
                      alt={creation.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="hero" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-black/70">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-black/50 text-white gap-1">
                        <TypeIcon className="w-3 h-3" />
                        Image
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{creation.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{creation.style}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(creation.createdAt)}
                      </span>
                      <span>{creation.size}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCreations.map((creation) => {
              const TypeIcon = getTypeIcon(creation.type);
              return (
                <Card key={creation.id} className="glass-card p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={creation.thumbnail} 
                      alt={creation.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <TypeIcon className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold truncate">{creation.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Image
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{creation.style}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(creation.createdAt)}
                        </span>
                        <span>{creation.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;