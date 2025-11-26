import { useState } from "react";
import Header from "@/components/Header";
import SearchPanel from "@/components/SearchPanel";
import MapView from "@/components/MapView";
import RouteSummary from "@/components/RouteSummary";
import { calculateRoute } from "@/utils/routeAlgorithm";
import type { RouteType } from "@/components/SearchPanel";
import { toast } from "sonner";
import { getTranslation, type Language } from "@/utils/translations";

const Index = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [routeData, setRouteData] = useState<any>(null);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    const t = getTranslation(lang as Language);
    toast.success(t.languageChanged);
  };

  const handleSearch = (source: string, destination: string, routeType: RouteType) => {
    const t = getTranslation(currentLang as Language);
    const result = calculateRoute(source, destination, routeType);
    
    if (result) {
      setRouteData(result);
      const routeTypeText = routeType === 'metro-only' ? t.metroOnly : routeType === 'bus-only' ? t.busOnly : t.mixedRoutes;
      toast.success(t.routeFound, {
        description: `${result.totalTime} ${t.mins} ${t.routeFoundDesc} ${routeTypeText}`
      });
    } else {
      toast.error(t.noRoute, {
        description: t.noRouteDesc
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
            <SearchPanel onSearch={handleSearch} currentLang={currentLang} />
            
            {routeData && (
              <div className="hidden lg:block">
                <RouteSummary
                  totalTime={routeData.totalTime}
                  predictedDelay={routeData.predictedDelay}
                  segments={routeData.segments}
                  currentLang={currentLang}
                />
              </div>
            )}
          </div>

          {/* Map View - Main Area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="h-[500px] lg:h-[calc(100vh-10rem)] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
              <MapView routeData={routeData} currentLang={currentLang} />
            </div>
          </div>

          {/* Mobile Route Summary */}
          {routeData && (
            <div className="lg:hidden">
              <RouteSummary
                totalTime={routeData.totalTime}
                predictedDelay={routeData.predictedDelay}
                segments={routeData.segments}
                currentLang={currentLang}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="glass-card border-t mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {getTranslation(currentLang as Language).footerText}
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <button className="hover:text-primary smooth-transition">{getTranslation(currentLang as Language).about}</button>
              <button className="hover:text-primary smooth-transition">{getTranslation(currentLang as Language).privacy}</button>
              <button className="hover:text-primary smooth-transition">{getTranslation(currentLang as Language).terms}</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
