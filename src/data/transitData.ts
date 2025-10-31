export interface TransitStop {
  id: string;
  name: string;
  lat: number;
  lon: number;
  mode: 'metro' | 'bus' | 'both';
}

export interface RouteSegment {
  from: string;
  to: string;
  mode: 'metro' | 'bus';
  distance: number;
  time: number; // in minutes
  routeName?: string;
}

// Hyderabad transit stops (sample data covering major areas)
export const transitStops: TransitStop[] = [
  // Metro Stations - Blue Line
  { id: 'nagole', name: 'Nagole', lat: 17.3591, lon: 78.5506, mode: 'metro' },
  { id: 'uppal', name: 'Uppal', lat: 17.4052, lon: 78.5564, mode: 'both' },
  { id: 'stadium', name: 'Stadium', lat: 17.4063, lon: 78.5364, mode: 'metro' },
  { id: 'ngri', name: 'NGRI', lat: 17.4168, lon: 78.5244, mode: 'metro' },
  { id: 'habsiguda', name: 'Habsiguda', lat: 17.4185, lon: 78.5147, mode: 'metro' },
  { id: 'tarnaka', name: 'Tarnaka', lat: 17.4222, lon: 78.5047, mode: 'both' },
  { id: 'mettuguda', name: 'Mettuguda', lat: 17.4255, lon: 78.4955, mode: 'metro' },
  { id: 'secunderabad_east', name: 'Secunderabad East', lat: 17.4378, lon: 78.4926, mode: 'metro' },
  { id: 'paradise', name: 'Paradise', lat: 17.4414, lon: 78.4911, mode: 'both' },
  { id: 'rasoolpura', name: 'Rasoolpura', lat: 17.4446, lon: 78.4891, mode: 'metro' },
  { id: 'prakash_nagar', name: 'Prakash Nagar', lat: 17.4492, lon: 78.4869, mode: 'metro' },
  { id: 'begumpet', name: 'Begumpet', lat: 17.4442, lon: 78.4680, mode: 'both' },
  { id: 'ameerpet', name: 'Ameerpet', lat: 17.4372, lon: 78.4483, mode: 'both' },
  { id: 'sr_nagar', name: 'SR Nagar', lat: 17.4355, lon: 78.4407, mode: 'metro' },
  { id: 'erragadda', name: 'Erragadda', lat: 17.4344, lon: 78.4314, mode: 'both' },
  { id: 'bharat_nagar', name: 'Bharat Nagar', lat: 17.4339, lon: 78.4207, mode: 'metro' },
  { id: 'moosapet', name: 'Moosapet', lat: 17.4335, lon: 78.4094, mode: 'both' },
  { id: 'dr_br_ambedkar', name: 'Dr BR Ambedkar Balanagar', lat: 17.4333, lon: 78.3982, mode: 'metro' },
  { id: 'kphb', name: 'KPHB Colony', lat: 17.4460, lon: 78.3914, mode: 'both' },
  { id: 'kukatpally', name: 'Kukatpally', lat: 17.4850, lon: 78.3914, mode: 'both' },
  { id: 'miyapur', name: 'Miyapur', lat: 17.4950, lon: 78.3585, mode: 'both' },
  
  // Metro Stations - Red Line
  { id: 'mgbs', name: 'MGBS', lat: 17.3754, lon: 78.4852, mode: 'both' },
  { id: 'malakpet', name: 'Malakpet', lat: 17.3891, lon: 78.4865, mode: 'both' },
  { id: 'new_market', name: 'New Market', lat: 17.3966, lon: 78.4868, mode: 'metro' },
  { id: 'musarambagh', name: 'Musarambagh', lat: 17.4012, lon: 78.4871, mode: 'metro' },
  { id: 'dilsukhnagar', name: 'Dilsukhnagar', lat: 17.3691, lon: 78.5246, mode: 'both' },
  { id: 'chaitanyapuri', name: 'Chaitanyapuri', lat: 17.3752, lon: 78.5128, mode: 'metro' },
  { id: 'victoria_memorial', name: 'Victoria Memorial', lat: 17.3810, lon: 78.5014, mode: 'metro' },
  
  // Major Bus Stops
  { id: 'hitech_city', name: 'Hi-Tech City', lat: 17.4484, lon: 78.3772, mode: 'both' },
  { id: 'madhapur', name: 'Madhapur', lat: 17.4483, lon: 78.3915, mode: 'both' },
  { id: 'jubilee_hills', name: 'Jubilee Hills', lat: 17.4239, lon: 78.4080, mode: 'bus' },
  { id: 'banjara_hills', name: 'Banjara Hills', lat: 17.4126, lon: 78.4502, mode: 'bus' },
  { id: 'somajiguda', name: 'Somajiguda', lat: 17.4316, lon: 78.4609, mode: 'bus' },
  { id: 'punjagutta', name: 'Punjagutta', lat: 17.4287, lon: 78.4529, mode: 'both' },
  { id: 'lakdi_ka_pul', name: 'Lakdi Ka Pul', lat: 17.4061, lon: 78.4591, mode: 'both' },
  { id: 'nampally', name: 'Nampally', lat: 17.3922, lon: 78.4666, mode: 'both' },
  { id: 'abids', name: 'Abids', lat: 17.3974, lon: 78.4797, mode: 'both' },
  { id: 'koti', name: 'Koti', lat: 17.3835, lon: 78.4805, mode: 'both' },
  { id: 'lb_nagar', name: 'LB Nagar', lat: 17.3417, lon: 78.5527, mode: 'both' },
  { id: 'vanasthalipuram', name: 'Vanasthalipuram', lat: 17.3375, lon: 78.5817, mode: 'bus' },
  { id: 'uppal_depot', name: 'Uppal Depot', lat: 17.4054, lon: 78.5630, mode: 'bus' },
  { id: 'ecil', name: 'ECIL', lat: 17.4713, lon: 78.5827, mode: 'bus' },
  { id: 'kompally', name: 'Kompally', lat: 17.5374, lon: 78.4906, mode: 'bus' },
  { id: 'secunderabad', name: 'Secunderabad', lat: 17.4399, lon: 78.4983, mode: 'both' },
  { id: 'trimulgherry', name: 'Trimulgherry', lat: 17.4539, lon: 78.5039, mode: 'bus' },
  { id: 'alwal', name: 'Alwal', lat: 17.4982, lon: 78.5162, mode: 'bus' },
  { id: 'patancheru', name: 'Patancheru', lat: 17.5333, lon: 78.2647, mode: 'bus' },
  { id: 'mehdipatnam', name: 'Mehdipatnam', lat: 17.3974, lon: 78.4370, mode: 'both' },
  { id: 'tolichowki', name: 'Tolichowki', lat: 17.4002, lon: 78.3989, mode: 'bus' },
  { id: 'lingampally', name: 'Lingampally', lat: 17.4910, lon: 78.3265, mode: 'both' },
  { id: 'gachibowli', name: 'Gachibowli', lat: 17.4399, lon: 78.3487, mode: 'both' },
  { id: 'kondapur', name: 'Kondapur', lat: 17.4625, lon: 78.3636, mode: 'both' },
  { id: 'shamshabad', name: 'Shamshabad Airport', lat: 17.2403, lon: 78.4294, mode: 'bus' },
];

// Route connections with estimated times
export const routeConnections: RouteSegment[] = [
  // Metro Blue Line (Nagole to Miyapur)
  { from: 'nagole', to: 'uppal', mode: 'metro', distance: 5.2, time: 7, routeName: 'Blue Line' },
  { from: 'uppal', to: 'stadium', mode: 'metro', distance: 2.1, time: 3, routeName: 'Blue Line' },
  { from: 'stadium', to: 'ngri', mode: 'metro', distance: 1.5, time: 2, routeName: 'Blue Line' },
  { from: 'ngri', to: 'habsiguda', mode: 'metro', distance: 1.3, time: 2, routeName: 'Blue Line' },
  { from: 'habsiguda', to: 'tarnaka', mode: 'metro', distance: 1.2, time: 2, routeName: 'Blue Line' },
  { from: 'tarnaka', to: 'mettuguda', mode: 'metro', distance: 1.1, time: 2, routeName: 'Blue Line' },
  { from: 'mettuguda', to: 'secunderabad_east', mode: 'metro', distance: 1.8, time: 3, routeName: 'Blue Line' },
  { from: 'secunderabad_east', to: 'paradise', mode: 'metro', distance: 0.6, time: 1, routeName: 'Blue Line' },
  { from: 'paradise', to: 'rasoolpura', mode: 'metro', distance: 0.5, time: 1, routeName: 'Blue Line' },
  { from: 'rasoolpura', to: 'prakash_nagar', mode: 'metro', distance: 0.6, time: 1, routeName: 'Blue Line' },
  { from: 'prakash_nagar', to: 'begumpet', mode: 'metro', distance: 2.3, time: 3, routeName: 'Blue Line' },
  { from: 'begumpet', to: 'ameerpet', mode: 'metro', distance: 2.1, time: 3, routeName: 'Blue Line' },
  { from: 'ameerpet', to: 'sr_nagar', mode: 'metro', distance: 0.9, time: 2, routeName: 'Blue Line' },
  { from: 'sr_nagar', to: 'erragadda', mode: 'metro', distance: 1.0, time: 2, routeName: 'Blue Line' },
  { from: 'erragadda', to: 'bharat_nagar', mode: 'metro', distance: 1.1, time: 2, routeName: 'Blue Line' },
  { from: 'bharat_nagar', to: 'moosapet', mode: 'metro', distance: 1.2, time: 2, routeName: 'Blue Line' },
  { from: 'moosapet', to: 'dr_br_ambedkar', mode: 'metro', distance: 1.2, time: 2, routeName: 'Blue Line' },
  { from: 'dr_br_ambedkar', to: 'kphb', mode: 'metro', distance: 1.5, time: 2, routeName: 'Blue Line' },
  { from: 'kphb', to: 'kukatpally', mode: 'metro', distance: 4.2, time: 5, routeName: 'Blue Line' },
  { from: 'kukatpally', to: 'miyapur', mode: 'metro', distance: 3.5, time: 4, routeName: 'Blue Line' },
  
  // Bus Routes (Major corridors)
  { from: 'miyapur', to: 'kondapur', mode: 'bus', distance: 5.8, time: 15, routeName: 'Bus 219' },
  { from: 'kondapur', to: 'hitech_city', mode: 'bus', distance: 3.2, time: 8, routeName: 'Bus 219' },
  { from: 'hitech_city', to: 'madhapur', mode: 'bus', distance: 1.5, time: 5, routeName: 'Bus 219' },
  { from: 'madhapur', to: 'jubilee_hills', mode: 'bus', distance: 2.8, time: 10, routeName: 'Bus 10K' },
  { from: 'jubilee_hills', to: 'banjara_hills', mode: 'bus', distance: 2.5, time: 8, routeName: 'Bus 10K' },
  { from: 'banjara_hills', to: 'somajiguda', mode: 'bus', distance: 2.3, time: 7, routeName: 'Bus 5K' },
  { from: 'somajiguda', to: 'punjagutta', mode: 'bus', distance: 1.2, time: 5, routeName: 'Bus 5K' },
  { from: 'punjagutta', to: 'ameerpet', mode: 'bus', distance: 1.5, time: 6, routeName: 'Bus 5K' },
  { from: 'ameerpet', to: 'begumpet', mode: 'bus', distance: 2.1, time: 8, routeName: 'Bus 8A' },
  { from: 'begumpet', to: 'secunderabad', mode: 'bus', distance: 3.2, time: 12, routeName: 'Bus 8A' },
  { from: 'secunderabad', to: 'tarnaka', mode: 'bus', distance: 4.5, time: 15, routeName: 'Bus 3K' },
  { from: 'tarnaka', to: 'uppal', mode: 'bus', distance: 5.8, time: 18, routeName: 'Bus 3K' },
  { from: 'uppal', to: 'lb_nagar', mode: 'bus', distance: 8.5, time: 25, routeName: 'Bus 277D' },
  { from: 'lb_nagar', to: 'dilsukhnagar', mode: 'bus', distance: 4.2, time: 12, routeName: 'Bus 277D' },
  { from: 'dilsukhnagar', to: 'koti', mode: 'bus', distance: 5.8, time: 18, routeName: 'Bus 277D' },
  { from: 'koti', to: 'abids', mode: 'bus', distance: 1.2, time: 5, routeName: 'Bus 5' },
  { from: 'abids', to: 'nampally', mode: 'bus', distance: 1.5, time: 6, routeName: 'Bus 5' },
  { from: 'nampally', to: 'lakdi_ka_pul', mode: 'bus', distance: 1.8, time: 7, routeName: 'Bus 5' },
  { from: 'lakdi_ka_pul', to: 'mehdipatnam', mode: 'bus', distance: 2.5, time: 10, routeName: 'Bus 127K' },
  { from: 'mehdipatnam', to: 'tolichowki', mode: 'bus', distance: 2.2, time: 8, routeName: 'Bus 127K' },
  { from: 'tolichowki', to: 'gachibowli', mode: 'bus', distance: 4.5, time: 15, routeName: 'Bus 127K' },
  { from: 'gachibowli', to: 'hitech_city', mode: 'bus', distance: 3.8, time: 12, routeName: 'Bus 216' },
  { from: 'lingampally', to: 'gachibowli', mode: 'bus', distance: 6.2, time: 20, routeName: 'Bus 216' },
  { from: 'kphb', to: 'miyapur', mode: 'bus', distance: 4.5, time: 12, routeName: 'Bus 119M' },
];

// Helper function to get stop by ID
export const getStopById = (id: string): TransitStop | undefined => {
  return transitStops.find(stop => stop.id === id);
};

// Helper function to get stop by name (fuzzy search)
export const searchStops = (query: string): TransitStop[] => {
  const lowerQuery = query.toLowerCase();
  return transitStops.filter(stop => 
    stop.name.toLowerCase().includes(lowerQuery)
  );
};
