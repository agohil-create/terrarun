export type ViewState = 'MAP' | 'LEADERBOARD' | 'PROFILE' | 'CLANS';

export type RunStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'CAPTURING';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface HexCoord {
  q: number;
  r: number;
  s: number; // q + r + s = 0
}

export interface HexTile extends HexCoord {
  id: string; // "q,r"
  ownerId: string | null; // Wallet address or User ID
  timestamp: number;
  isContested: boolean;
}

export interface User {
  id: string;
  username: string;
  walletAddress: string | null;
  trustScore: number; // 0-100 (AI Fraud Score)
  level: number;
  xp: number;
  stats: {
    totalDistance: number; // meters
    totalArea: number; // sq meters
    seasonRank: number;
  };
  clanId?: string;
  avatarUrl: string;
}

export interface GameState {
  status: RunStatus;
  userLocation: LatLng;
  gpsAccuracy: number; // meters
  currentSpeed: number; // m/s
  
  // Territory Data
  ownedTiles: Map<string, HexTile>; // Tiles user owns
  visibleTiles: Map<string, HexTile>; // Tiles in viewport (from server)
  
  // Active Run Data
  currentPath: HexCoord[]; // The "Breadcrumb" trail
  sessionDistance: number;
  sessionDuration: number; // seconds
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number; // Calculated score
  clanTag?: string;
  change: 'up' | 'down' | 'same';
}