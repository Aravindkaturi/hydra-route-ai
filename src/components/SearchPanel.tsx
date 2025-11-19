import { useState, useEffect } from "react";
import { Search, MapPin, Navigation, Zap, Train, Bus, Leaf, DollarSign, Clock, History, Home, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchStops, type TransitStop } from "@/data/transitData";

export type RouteType = 'fastest' | 'least-delay' | 'metro-only' | 'bus-only' | 'eco' | 'cheapest';

interface SearchPanelProps {
  onSearch: (source: string, destination: string, routeType: RouteType) => void;
}

const SearchPanel = ({ onSearch }: SearchPanelProps) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType>('fastest');
  const [sourceSuggestions, setSourceSuggestions] = useState<TransitStop[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<TransitStop[]>([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  useEffect(() => {
    if (source.trim()) {
      const suggestions = searchStops(source);
      setSourceSuggestions(suggestions);
      setShowSourceSuggestions(suggestions.length > 0);
    } else {
      setShowSourceSuggestions(false);
    }
  }, [source]);

  useEffect(() => {
    if (destination.trim()) {
      const suggestions = searchStops(destination);
      setDestSuggestions(suggestions);
      setShowDestSuggestions(suggestions.length > 0);
    } else {
      setShowDestSuggestions(false);
    }
  }, [destination]);

  const routeFilters = [
    { type: 'fastest' as RouteType, label: 'Fastest', icon: Zap, color: 'primary' },
    { type: 'metro-only' as RouteType, label: 'Metro', icon: Train, color: 'metro' },
    { type: 'bus-only' as RouteType, label: 'Bus', icon: Bus, color: 'bus' },
    { type: 'eco' as RouteType, label: 'Eco', icon: Leaf, color: 'eco' },
    { type: 'cheapest' as RouteType, label: 'Cheapest', icon: DollarSign, color: 'cheapest' },
    { type: 'least-delay' as RouteType, label: 'No Delay', icon: Clock, color: 'accent' },
  ];

  const quickActions = [
    { icon: Home, label: 'Home', location: 'Kondapur' },
    { icon: Briefcase, label: 'Work', location: 'Hitec City' },
    { icon: History, label: 'Recent', location: 'Ameerpet' },
  ];

  const handleSearch = () => {
    if (source && destination) {
      onSearch(source, destination, selectedRouteType);
    }
  };

  const handleQuickAction = (location: string, isDestination: boolean = false) => {
    if (isDestination) {
      setDestination(location);
    } else {
      setSource(location);
    }
  };

  return (
    <div className="space-y-5">
      {/* Search Card */}
      <Card className="glass-card p-6 animate-slide-in">
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2 mb-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.location)}
                className="flex-1 rounded-xl border-border/50 hover:border-primary hover:bg-primary/5 smooth-transition"
              >
                <action.icon className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Source Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Starting point"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-2 border-border/50 focus:border-primary bg-background/50 text-base font-medium smooth-transition"
            />
            {showSourceSuggestions && (
              <Card className="absolute top-full mt-2 w-full glass-card p-2 z-10 max-h-48 overflow-auto">
                {sourceSuggestions.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => {
                      setSource(stop.name);
                      setShowSourceSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-muted/50 rounded-xl smooth-transition flex items-center gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full ${stop.mode === 'metro' ? 'bg-metro' : 'bg-bus'}`}></div>
                    <div>
                      <div className="font-medium text-sm">{stop.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{stop.mode}</div>
                    </div>
                  </button>
                ))}
              </Card>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
              <Navigation className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-2 border-border/50 focus:border-secondary bg-background/50 text-base font-medium smooth-transition"
            />
            {showDestSuggestions && (
              <Card className="absolute top-full mt-2 w-full glass-card p-2 z-10 max-h-48 overflow-auto">
                {destSuggestions.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => {
                      setDestination(stop.name);
                      setShowDestSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-muted/50 rounded-xl smooth-transition flex items-center gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full ${stop.mode === 'metro' ? 'bg-metro' : 'bg-bus'}`}></div>
                    <div>
                      <div className="font-medium text-sm">{stop.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{stop.mode}</div>
                    </div>
                  </button>
                ))}
              </Card>
            )}
          </div>

          {/* Find Route Button */}
          <Button
            onClick={handleSearch}
            disabled={!source || !destination}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:shadow-xl hover:scale-[1.02] smooth-transition text-base font-semibold"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Best Route
          </Button>
        </div>
      </Card>

      {/* Route Filters */}
      <Card className="glass-card p-5 animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          Route Options
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {routeFilters.map((filter) => (
            <Button
              key={filter.type}
              variant={selectedRouteType === filter.type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRouteType(filter.type)}
              className={`
                rounded-xl h-auto py-3 px-3 smooth-transition
                ${selectedRouteType === filter.type
                  ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-lg border-0'
                  : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1.5 w-full">
                <filter.icon className="h-4 w-4" />
                <span className="text-xs font-semibold">{filter.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="glass-card p-4 animate-slide-in border-primary/20 bg-primary/5" style={{ animationDelay: '0.2s' }}>
        <p className="text-xs text-muted-foreground text-center">
          🚇 Real-time Metro • 🚌 Live Bus Tracking • ⚡ Smart Routing
        </p>
      </Card>
    </div>
  );
};

export default SearchPanel;
