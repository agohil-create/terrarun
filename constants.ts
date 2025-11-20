import { User, LeaderboardEntry, LatLng } from './types';

export const THEME = {
  Cyan: '#0FF0FC',
  Pink: '#FF00A8',
  Green: '#00FF90',
  Purple: '#BD00FF',
  Dark: '#0A0A0F',
  Surface: '#13131F',
  SurfaceHighlight: '#232333',
  TextSecondary: '#94A3B8',
};

// Map Configuration
export const ORIGIN_LOC: LatLng = { lat: 37.7749, lng: -122.4194 }; // SF Downtown Center (0,0 in meters)
export const TILE_SIZE_METERS = 60; // Size of Hexagon (Radius in Meters)
export const VISIBLE_RADIUS = 15; // Hexes visible around player

// Scoring Weights
export const SCORING = {
  DISTANCE_WEIGHT: 0.3,
  AREA_CAPTURED_WEIGHT: 0.4,
  AREA_RETAINED_WEIGHT: 0.3,
};

// Mock User
export const CURRENT_USER: User = {
  id: 'user_001',
  username: 'NeonRunner',
  walletAddress: '0x71C...9A2',
  trustScore: 98,
  level: 15,
  xp: 14250,
  stats: {
    totalDistance: 124500, // 124.5 km
    totalArea: 450000, // 45 hectares
    seasonRank: 42,
  },
  clanId: 'clan_alpha',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeonRunner',
};

// Mock Leaderboard
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'SpeedDemon', score: 9850, clanTag: 'VELO', change: 'same' },
  { rank: 2, username: 'MapPainter', score: 9420, clanTag: 'ART', change: 'up' },
  { rank: 3, username: 'ChainLink', score: 8900, clanTag: 'DEFI', change: 'down' },
  { rank: 4, username: 'BaseGod', score: 8750, clanTag: 'BASE', change: 'up' },
  { rank: 5, username: 'CyberStride', score: 8200, change: 'same' },
  { rank: 6, username: 'NightCity', score: 7800, clanTag: '2077', change: 'down' },
];