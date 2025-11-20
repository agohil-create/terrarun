import { User, HexTile } from '../types';
import { CURRENT_USER } from '../constants';

// --- Blockchain Simulation (Base L2) ---

export const MockWallet = {
  connect: async (): Promise<string> => {
    return new Promise(resolve => setTimeout(() => resolve('0x71C...9A2'), 800));
  },
  
  disconnect: async (): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, 500));
  },
  
  getBalance: async (): Promise<number> => {
    return 1250.50; // RUNZ Tokens
  }
};

// --- Game Backend Simulation ---

export const MockBackend = {
  login: async (): Promise<User> => {
    return new Promise(resolve => setTimeout(() => resolve(CURRENT_USER), 500));
  },

  // Returns tiles in a viewport
  fetchTiles: async (lat: number, lng: number): Promise<HexTile[]> => {
    // Generate some mock owned tiles around the user
    // In a real app, this queries PostGIS
    const tiles: HexTile[] = [];
    const r = 5; 
    
    // Generate a "Home Base" of owned tiles
    for (let q = -r; q <= r; q++) {
      for (let r1 = Math.max(-r, -q - r); r1 <= Math.min(r, -q + r); r1++) {
         // Randomly assign some to user, some to enemies
         const isOwned = Math.random() > 0.3;
         if (isOwned) {
             tiles.push({
                 q, r: r1, s: -q - r1,
                 id: `${q},${r1}`,
                 ownerId: CURRENT_USER.id,
                 timestamp: Date.now(),
                 isContested: false
             });
         }
      }
    }
    return Promise.resolve(tiles);
  },

  submitCapture: async (hexIds: string[]): Promise<{success: boolean, points: number, txHash: string}> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                success: true,
                points: hexIds.length * 10 + 500, // Bonus
                txHash: `0x${Math.random().toString(16).slice(2)}`
            });
        }, 1500); // Simulate network + blockchain latency
    });
  }
};