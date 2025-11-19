import { Clock, AlertCircle, ArrowRight, Train, Bus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface RouteSegment {
  origin: string;
  destination: string;
  mode: 'metro' | 'bus';
  duration: number;
  routeName?: string;
}

interface RouteSummaryProps {
  totalTime: number;
  predictedDelay: number;
  segments: RouteSegment[];
}

const RouteSummary = ({ totalTime, predictedDelay, segments }: RouteSummaryProps) => {
  const totalHours = Math.floor(totalTime / 60);
  const totalMinutes = totalTime % 60;
  const arrivalTime = new Date(Date.now() + totalTime * 60000);

  return (
    <div className="space-y-4">
      {/* Summary Card - Floating Style */}
      <Card className="glass-card border-primary/30 animate-slide-in shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"></div>
            Route Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Time Display */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {totalHours > 0 && `${totalHours}h `}
                  {totalMinutes}m
                </div>
                <div className="text-xs text-muted-foreground font-medium">Total Duration</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                ETA: {arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-xs text-muted-foreground">Estimated Arrival</div>
            </div>
          </div>

          {/* Delay Alert */}
          {predictedDelay > 0 && (
            <div className="flex items-center gap-3 p-3 bg-delay/10 border border-delay/20 rounded-xl">
              <AlertCircle className="h-5 w-5 text-delay flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-delay">Possible Delay</p>
                <p className="text-xs text-muted-foreground">+{predictedDelay} mins expected</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route Details */}
      <Card className="glass-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Route Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div key={index} className="relative">
                {/* Segment Card */}
                <div className={`
                  p-4 rounded-2xl border-2 smooth-transition
                  ${segment.mode === 'metro' 
                    ? 'bg-metro/5 border-metro/30 hover:border-metro/50' 
                    : 'bg-bus/5 border-bus/30 hover:border-bus/50'
                  }
                `}>
                  <div className="flex items-start gap-3">
                    {/* Mode Icon */}
                    <div className={`
                      p-2.5 rounded-xl flex-shrink-0
                      ${segment.mode === 'metro' ? 'bg-metro/20' : 'bg-bus/20'}
                    `}>
                      {segment.mode === 'metro' ? (
                        <Train className="h-5 w-5 text-metro" />
                      ) : (
                        <Bus className="h-5 w-5 text-bus" />
                      )}
                    </div>

                    {/* Route Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`
                          px-2.5 py-0.5 rounded-full text-xs font-bold
                          ${segment.mode === 'metro' 
                            ? 'bg-metro text-white' 
                            : 'bg-bus text-white'
                          }
                        `}>
                          {segment.mode === 'metro' ? 'METRO' : 'BUS'}
                        </span>
                        {segment.routeName && (
                          <span className="text-xs font-semibold text-foreground bg-muted/50 px-2 py-0.5 rounded-md">
                            {segment.routeName}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-semibold text-foreground truncate">{segment.origin}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="font-semibold text-foreground truncate">{segment.destination}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">
                          {segment.duration} mins
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < segments.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-border to-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteSummary;
