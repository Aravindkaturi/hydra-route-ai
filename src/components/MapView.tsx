import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { transitStops } from "@/data/transitData";

interface MapViewProps {
  routeData?: {
    path: Array<{ lat: number; lon: number; name: string; mode: string }>;
    segments: Array<{ mode: string }>;
  };
}

const MapView = ({ routeData }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Hyderabad
    const map = L.map(mapContainerRef.current).setView([17.4399, 78.4483], 12);
    mapRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenstreetMap contributors</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add markers for all transit stops
    transitStops.forEach((stop) => {
      const color = stop.mode === 'metro' ? '#2F80ED' : 
                    stop.mode === 'bus' ? '#27AE60' : 
                    '#F2994A';
      
      const marker = L.circleMarker([stop.lat, stop.lon], {
        radius: 6,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map);

      marker.bindPopup(`<strong>${stop.name}</strong><br/>${stop.mode === 'both' ? 'Metro & Bus' : stop.mode}`);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !routeData) return;

    // Clear existing route layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Polyline || (layer instanceof L.CircleMarker && layer.options.radius === 8)) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Draw route
    const coordinates: [number, number][] = routeData.path.map(point => [point.lat, point.lon]);
    
    // Draw segments with different colors
    for (let i = 0; i < routeData.segments.length; i++) {
      const segment = routeData.segments[i];
      const color = segment.mode === 'metro' ? '#2F80ED' : '#27AE60';
      const segmentCoords = [coordinates[i], coordinates[i + 1]];
      
      L.polyline(segmentCoords, {
        color: color,
        weight: 5,
        opacity: 0.8,
      }).addTo(mapRef.current);
    }

    // Add start and end markers
    if (coordinates.length > 0) {
      L.circleMarker(coordinates[0], {
        radius: 8,
        fillColor: '#2F80ED',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
      }).addTo(mapRef.current).bindPopup('<strong>Start</strong>');

      L.circleMarker(coordinates[coordinates.length - 1], {
        radius: 8,
        fillColor: '#E74C3C',
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 1,
      }).addTo(mapRef.current).bindPopup('<strong>Destination</strong>');

      // Fit bounds to show entire route
      mapRef.current.fitBounds(coordinates, { padding: [50, 50] });
    }
  }, [routeData]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full rounded-lg shadow-md"
      style={{ minHeight: '400px' }}
    />
  );
};

export default MapView;
