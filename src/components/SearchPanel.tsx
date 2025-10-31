import { useState, useEffect } from "react";
import { Search, Navigation2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchStops } from "@/data/transitData";

export type RouteType = 'fastest' | 'least-delay' | 'metro-only' | 'bus-only';

interface SearchPanelProps {
  onSearch: (source: string, destination: string, routeType: RouteType) => void;
}

const SearchPanel = ({ onSearch }: SearchPanelProps) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRouteType, setSelectedRouteType] = useState<RouteType>('fastest');
  const [sourceSuggestions, setSourceSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  useEffect(() => {
    if (source.length > 1) {
      const results = searchStops(source);
      setSourceSuggestions(results.slice(0, 5).map(stop => stop.name));
      setShowSourceSuggestions(true);
    } else {
      setShowSourceSuggestions(false);
    }
  }, [source]);

  useEffect(() => {
    if (destination.length > 1) {
      const results = searchStops(destination);
      setDestSuggestions(results.slice(0, 5).map(stop => stop.name));
      setShowDestSuggestions(true);
    } else {
      setShowDestSuggestions(false);
    }
  }, [destination]);

  const routeTypes: { type: RouteType; label: string }[] = [
    { type: 'fastest', label: 'Fastest route' },
    { type: 'least-delay', label: 'Least delay' },
    { type: 'metro-only', label: 'Metro-only' },
    { type: 'bus-only', label: 'Bus-only' },
  ];

  const handleSearch = () => {
    if (source && destination) {
      onSearch(source, destination, selectedRouteType);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-4 space-y-4">
      <div className="space-y-2 relative">
        <Label htmlFor="source" className="text-sm font-medium">Source</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="source"
            placeholder="Enter starting point"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onFocus={() => source.length > 1 && setShowSourceSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
            className="pl-10"
          />
        </div>
        {showSourceSuggestions && sourceSuggestions.length > 0 && (
          <div className="absolute z-50 w-full bg-popover border border-border rounded-md shadow-lg mt-1 max-h-48 overflow-auto">
            {sourceSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                onClick={() => {
                  setSource(suggestion);
                  setShowSourceSuggestions(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="destination" className="text-sm font-medium">Destination</Label>
        <div className="relative">
          <Navigation2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => destination.length > 1 && setShowDestSuggestions(true)}
            onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
            className="pl-10"
          />
        </div>
        {showDestSuggestions && destSuggestions.length > 0 && (
          <div className="absolute z-50 w-full bg-popover border border-border rounded-md shadow-lg mt-1 max-h-48 overflow-auto">
            {destSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                onClick={() => {
                  setDestination(suggestion);
                  setShowDestSuggestions(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {routeTypes.map(({ type, label }) => (
          <Button
            key={type}
            variant={selectedRouteType === type ? "default" : "outline"}
            className="w-full justify-start font-medium transition-all duration-150"
            onClick={() => setSelectedRouteType(type)}
          >
            {label}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleSearch}
        className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-150"
        size="lg"
      >
        Find Route
      </Button>
    </div>
  );
};

export default SearchPanel;
