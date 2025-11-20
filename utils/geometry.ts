import { Point } from '../types';
import { TILE_SIZE_METERS as GRID_SIZE } from '../constants';

// Hexagon Geometry Utilities (Flat-topped)

export const hexToPixel = (q: number, r: number): Point => {
  const x = GRID_SIZE * (3/2 * q);
  const y = GRID_SIZE * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
  return { x, y };
};

export const pixelToHex = (x: number, y: number) => {
  const q = (2/3 * x) / GRID_SIZE;
  const r = (-1/3 * x + Math.sqrt(3)/3 * y) / GRID_SIZE;
  return hexRound(q, r);
};

const hexRound = (q: number, r: number) => {
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

export const getHexKey = (q: number, r: number) => `${q},${r}`;

export const getHexCorners = (center: Point): string => {
    const corners = [];
    for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i;
        const angle_rad = Math.PI / 180 * angle_deg;
        const cx = center.x + GRID_SIZE * Math.cos(angle_rad);
        const cy = center.y + GRID_SIZE * Math.sin(angle_rad);
        corners.push(`${cx},${cy}`);
    }
    return corners.join(" ");
};