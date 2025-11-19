import { useState } from "react";
import Header from "@/components/Header";
import SearchPanel from "@/components/SearchPanel";
import MapView from "@/components/MapView";
import RouteSummary from "@/components/RouteSummary";
import { calculateRoute } from "@/utils/routeAlgorithm";
import type { RouteType } from "@/components/SearchPanel";
import { toast } from "sonner";

const Index = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [routeData, setRouteData] = useState<any>(null);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    toast.success(`Language changed to ${lang === 'en' ? 'English' : lang === 'te' ? 'Telugu' : 'Hindi'}`);
  };

  const handleSearch = (source: string, destination: string, routeType: RouteType) => {
    const result = calculateRoute(source, destination, routeType);
    
    if (result) {
      setRouteData(result);
      toast.success("✨ Route found successfully!", {
        description: `${result.totalTime} mins via ${routeType === 'metro-only' ? 'Metro' : routeType === 'bus-only' ? 'Bus' : 'Mixed routes'}`
      });
    } else {
      toast.error("No route found", {
        description: "Please try different locations or route type."
      });
      setRouteData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-mesh">
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-1 max-w-[1800px] mx-auto w-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Search Panel - Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <SearchPanel onSearch={handleSearch} />
            
            {routeData && (
              <div className="hidden lg:block">
                <RouteSummary
                  totalTime={routeData.totalTime}
                  predictedDelay={routeData.predictedDelay}
                  segments={routeData.segments}
                />
              </div>
            )}
          </div>

          {/* Map View - Main Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="h-[500px] lg:h-[calc(100vh-10rem)] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
              <MapView routeData={routeData} />
            </div>
          </div>

          {/* Mobile Route Summary */}
          {routeData && (
            <div className="lg:hidden">
              <RouteSummary
                totalTime={routeData.totalTime}
                predictedDelay={routeData.predictedDelay}
                segments={routeData.segments}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="glass-card border-t mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Smart Route Planner for Hyderabad • Powered by AI & Real-time Data
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <button className="hover:text-primary smooth-transition">About</button>
              <button className="hover:text-primary smooth-transition">Privacy</button>
              <button className="hover:text-primary smooth-transition">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
