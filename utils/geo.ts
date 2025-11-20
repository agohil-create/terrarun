import { LatLng, Point, HexCoord } from '../types';
import { TILE_SIZE_METERS, ORIGIN_LOC } from '../constants';

const EARTH_RADIUS = 6378137; // meters

// 1. Project LatLng to Meters (Relative to ORIGIN)
// Uses a simplified Equirectangular projection centered on ORIGIN
export const latLngToMeters = (lat: number, lng: number): Point => {
  const dLat = (lat - ORIGIN_LOC.lat) * (Math.PI / 180);
  const dLng = (lng - ORIGIN_LOC.lng) * (Math.PI / 180);
  
  const y = dLat * EARTH_RADIUS;
  const x = dLng * EARTH_RADIUS * Math.cos(ORIGIN_LOC.lat * (Math.PI / 180));
  
  return { x, y };
};

// 2. Project Meters to LatLng (Inverse)
export const metersToLatLng = (x: number, y: number): LatLng => {
  const dLat = y / EARTH_RADIUS;
  const dLng = x / (EARTH_RADIUS * Math.cos(ORIGIN_LOC.lat * (Math.PI / 180)));
  
  return {
    lat: ORIGIN_LOC.lat + (dLat * 180 / Math.PI),
    lng: ORIGIN_LOC.lng + (dLng * 180 / Math.PI)
  };
};

// 3. Hex Math (Flat Top)
// x = size * 3/2 * q
// y = size * sqrt(3) * (r + q/2)
export const metersToHex = (x: number, y: number, size: number = TILE_SIZE_METERS): HexCoord => {
  const q = (2/3 * x) / size;
  const r = (-1/3 * x + Math.sqrt(3)/3 * y) / size;
  return hexRound(q, r);
};

export const hexToMeters = (q: number, r: number, size: number = TILE_SIZE_METERS): Point => {
  const x = size * (3/2 * q);
  const y = size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
  return { x, y };
};

// 4. Hex Rounding
const hexRound = (q: number, r: number): HexCoord => {
  let rq = Math.round(q);
  let rr = Math.round(r);
  let rs = Math.round(-q - r);

  const q_diff = Math.abs(rq - q);
  const r_diff = Math.abs(rr - r);
  const s_diff = Math.abs(rs - (-q - r));

  if (q_diff > r_diff && q_diff > s_diff) {
    rq = -rr - rs;
  } else if (r_diff > s_diff) {
    rr = -rq - rs;
  } else {
    rs = -rq - rr;
  }

  return { q: rq, r: rr, s: rs };
};

// 5. Helpers for Leaflet
export const getHexKey = (h: HexCoord) => `${h.q},${h.r}`;

export const hasHex = (list: HexCoord[], target: HexCoord): boolean => {
  return list.some(h => h.q === target.q && h.r === target.r);
};

// Returns array of [lat, lng] for a Hex (for Leaflet Polygon)
export const getHexLatLngCorners = (q: number, r: number, size: number = TILE_SIZE_METERS): [number, number][] => {
  const centerMeters = hexToMeters(q, r, size);
  const corners: [number, number][] = [];
  
  for (let i = 0; i < 6; i++) {
    const angle_deg = 60 * i;
    const angle_rad = Math.PI / 180 * angle_deg;
    
    const cx = centerMeters.x + size * Math.cos(angle_rad);
    const cy = centerMeters.y + size * Math.sin(angle_rad);
    
    const ll = metersToLatLng(cx, cy);
    corners.push([ll.lat, ll.lng]);
  }
  return corners;
};

// Simulation Helper
export const moveLatLng = (start: LatLng, dxMeters: number, dyMeters: number): LatLng => {
    const dLat = (dyMeters / EARTH_RADIUS) * (180 / Math.PI);
    const dLng = (dxMeters / (EARTH_RADIUS * Math.cos(Math.PI * start.lat / 180))) * (180 / Math.PI);
    return { lat: start.lat + dLat, lng: start.lng + dLng };
};