import { transitStops, routeConnections, getStopById } from "@/data/transitData";
import type { RouteType } from "@/components/SearchPanel";

interface PathNode {
  id: string;
  distance: number;
  time: number;
  previous: string | null;
  mode: string;
  routeName?: string;
}

export const calculateRoute = (
  sourceName: string,
  destinationName: string,
  routeType: RouteType
) => {
  // Find source and destination stops
  const sourceStop = transitStops.find(
    (stop) => stop.name.toLowerCase() === sourceName.toLowerCase()
  );
  const destStop = transitStops.find(
    (stop) => stop.name.toLowerCase() === destinationName.toLowerCase()
  );

  if (!sourceStop || !destStop) {
    return null;
  }

  // Filter connections based on route type
  let filteredConnections = routeConnections;
  if (routeType === 'metro-only') {
    filteredConnections = routeConnections.filter(conn => conn.mode === 'metro');
  } else if (routeType === 'bus-only') {
    filteredConnections = routeConnections.filter(conn => conn.mode === 'bus');
  }

  // Build adjacency graph
  const graph: Map<string, Array<{ to: string; time: number; distance: number; mode: string; routeName?: string }>> = new Map();
  
  filteredConnections.forEach((conn) => {
    if (!graph.has(conn.from)) {
      graph.set(conn.from, []);
    }
    if (!graph.has(conn.to)) {
      graph.set(conn.to, []);
    }
    
    // Add edge in both directions
    graph.get(conn.from)?.push({
      to: conn.to,
      time: conn.time,
      distance: conn.distance,
      mode: conn.mode,
      routeName: conn.routeName,
    });
    
    graph.get(conn.to)?.push({
      to: conn.from,
      time: conn.time,
      distance: conn.distance,
      mode: conn.mode,
      routeName: conn.routeName,
    });
  });

  // Dijkstra's algorithm
  const nodes: Map<string, PathNode> = new Map();
  const unvisited = new Set<string>();

  transitStops.forEach((stop) => {
    nodes.set(stop.id, {
      id: stop.id,
      distance: Infinity,
      time: Infinity,
      previous: null,
      mode: '',
    });
    unvisited.add(stop.id);
  });

  const startNode = nodes.get(sourceStop.id);
  if (startNode) {
    startNode.distance = 0;
    startNode.time = 0;
  }

  while (unvisited.size > 0) {
    // Find unvisited node with minimum time
    let currentId: string | null = null;
    let minTime = Infinity;

    unvisited.forEach((id) => {
      const node = nodes.get(id);
      if (node && node.time < minTime) {
        minTime = node.time;
        currentId = id;
      }
    });

    if (!currentId || minTime === Infinity) break;

    unvisited.delete(currentId);

    if (currentId === destStop.id) break;

    const currentNode = nodes.get(currentId);
    if (!currentNode) continue;

    const neighbors = graph.get(currentId) || [];
    neighbors.forEach((neighbor) => {
      if (!unvisited.has(neighbor.to)) return;

      const neighborNode = nodes.get(neighbor.to);
      if (!neighborNode) return;

      // Apply delay estimation based on route type
      let delayFactor = 1.0;
      if (routeType === 'least-delay') {
        delayFactor = neighbor.mode === 'metro' ? 1.05 : 1.15; // Metro has less delay
      } else if (routeType === 'fastest') {
        delayFactor = neighbor.mode === 'metro' ? 1.0 : 1.1;
      }

      const newTime = currentNode.time + neighbor.time * delayFactor;
      const newDistance = currentNode.distance + neighbor.distance;

      if (newTime < neighborNode.time) {
        neighborNode.time = newTime;
        neighborNode.distance = newDistance;
        neighborNode.previous = currentId;
        neighborNode.mode = neighbor.mode;
        neighborNode.routeName = neighbor.routeName;
      }
    });
  }

  // Reconstruct path
  const path: Array<{ lat: number; lon: number; name: string; mode: string }> = [];
  const segments: Array<{ from: string; to: string; mode: string; time: number; routeName?: string }> = [];
  
  let current: string | null = destStop.id;
  const pathIds: string[] = [];

  while (current) {
    pathIds.unshift(current);
    const node = nodes.get(current);
    current = node?.previous || null;
  }

  // Build path and segments
  for (let i = 0; i < pathIds.length; i++) {
    const stop = getStopById(pathIds[i]);
    const node = nodes.get(pathIds[i]);
    
    if (stop) {
      path.push({
        lat: stop.lat,
        lon: stop.lon,
        name: stop.name,
        mode: node?.mode || '',
      });

      if (i < pathIds.length - 1) {
        const nextStop = getStopById(pathIds[i + 1]);
        const connection = filteredConnections.find(
          (conn) =>
            (conn.from === pathIds[i] && conn.to === pathIds[i + 1]) ||
            (conn.to === pathIds[i] && conn.from === pathIds[i + 1])
        );

        if (nextStop && connection) {
          segments.push({
            from: stop.name,
            to: nextStop.name,
            mode: connection.mode,
            time: connection.time,
            routeName: connection.routeName,
          });
        }
      }
    }
  }

  const finalNode = nodes.get(destStop.id);
  if (!finalNode || finalNode.time === Infinity) {
    return null;
  }

  // Calculate predicted delay (mock estimation)
  const baseDelay = routeType === 'least-delay' ? 3 : 5;
  const busSegments = segments.filter(s => s.mode === 'bus').length;
  const predictedDelay = baseDelay + busSegments * 2;

  return {
    path,
    segments,
    totalTime: Math.round(finalNode.time),
    predictedDelay,
    totalDistance: Math.round(finalNode.distance * 10) / 10,
  };
};
