import { Clock, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RouteSegment {
  from: string;
  to: string;
  mode: string;
  time: number;
  routeName?: string;
}

interface RouteSummaryProps {
  totalTime: number;
  predictedDelay: number;
  segments: RouteSegment[];
}

const RouteSummary = ({ totalTime, predictedDelay, segments }: RouteSummaryProps) => {
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;
  const delayMinutes = Math.floor(predictedDelay);

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <Card className="border-border shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Route Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total travel time</span>
            </div>
            <span className="font-bold text-lg">
              {hours > 0 && `${hours} hr `}{minutes} mins
            </span>
          </div>
          
          {predictedDelay > 0 && (
            <div className="flex items-center justify-between p-3 bg-delay/10 rounded-lg border border-delay/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-delay" />
                <span className="text-sm font-medium text-delay">Predicted delay</span>
              </div>
              <span className="font-bold text-lg text-delay">
                {delayMinutes} mins
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Segments Card */}
      <Card className="border-border shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Route Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-3 h-3 rounded-full ${
                      segment.mode === 'metro' ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                  {index < segments.length - 1 && (
                    <div className="w-0.5 h-12 bg-border" />
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{segment.from}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{segment.to}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant={segment.mode === 'metro' ? 'default' : 'secondary'}
                      className="text-xs font-medium"
                    >
                      {segment.mode === 'metro' ? 'Metro' : 'Bus'}
                    </Badge>
                    {segment.routeName && (
                      <span className="text-xs text-muted-foreground">{segment.routeName}</span>
                    )}
                    <span className="text-xs text-muted-foreground">• {segment.time} mins</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteSummary;
