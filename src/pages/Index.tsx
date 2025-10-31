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
      toast.success("Route found successfully!");
    } else {
      toast.error("No route found. Please try different locations or route type.");
      setRouteData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-1 container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Search Panel */}
          <div className="lg:col-span-1 space-y-6">
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

          {/* Map View */}
          <div className="lg:col-span-2 h-[500px] lg:h-[calc(100vh-12rem)]">
            <MapView routeData={routeData} />
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

      <footer className="bg-card border-t border-border py-4 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Smart Route Planner for Hyderabad • Data-driven transit optimization</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
