import { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, LatLng, HexTile, RunStatus } from '../types';
import { latLngToMeters, metersToHex, moveLatLng, getHexKey, hasHex } from '../utils/geo';
import { MockBackend } from '../services/mockBackend';
import { ORIGIN_LOC } from '../constants';

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'IDLE',
    userLocation: ORIGIN_LOC, // Start at Origin
    gpsAccuracy: 5,
    currentSpeed: 0,
    ownedTiles: new Map(),
    visibleTiles: new Map(),
    currentPath: [],
    sessionDistance: 0,
    sessionDuration: 0
  });

  const stateRef = useRef(gameState);
  stateRef.current = gameState;
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load Initial Data
  useEffect(() => {
    MockBackend.fetchTiles(ORIGIN_LOC.lat, ORIGIN_LOC.lng).then(tiles => {
      const tileMap = new Map<string, HexTile>();
      tiles.forEach(t => tileMap.set(t.id, t));
      setGameState(prev => ({ ...prev, ownedTiles: tileMap }));
    });
  }, []);

  // --- Core Loop: Simulates GPS movement and Game Logic ---
  const tick = useCallback(() => {
     if (stateRef.current.status !== 'RUNNING') return;

     // 1. Simulate Movement (Walking in a circle around origin)
     // This creates a realistic path on the map
     const t = Date.now() / 2000;
     const speed = 4; // m/s (Jogging)
     
     const dx = Math.cos(t) * speed; 
     const dy = Math.sin(t) * speed;
     
     const newLoc = moveLatLng(stateRef.current.userLocation, dx, dy);
     
     // 2. Calculate Hex Position (Meters relative to Origin)
     const meters = latLngToMeters(newLoc.lat, newLoc.lng);
     const hex = metersToHex(meters.x, meters.y);
     const hexKey = getHexKey(hex);

     setGameState(prev => {
         const newPath = [...prev.currentPath];
         let newOwned = new Map(prev.ownedTiles);
         
         const isOwned = prev.ownedTiles.has(hexKey);
         const inPath = hasHex(newPath, hex);
         
         // Logic: Paper.io style
         if (!isOwned) {
             if (!inPath) {
                 newPath.push(hex);
             }
         } else {
             // Captured!
             if (newPath.length > 0) {
                 newPath.forEach(h => {
                     const k = getHexKey(h);
                     newOwned.set(k, { ...h, id: k, ownerId: 'user_001', timestamp: Date.now(), isContested: false });
                 });
                 newPath.length = 0;
                 MockBackend.submitCapture(newPath.map(h => getHexKey(h)));
             }
         }
         
         return {
             ...prev,
             userLocation: newLoc,
             currentPath: newPath,
             ownedTiles: newOwned,
             sessionDistance: prev.sessionDistance + Math.sqrt(dx*dx + dy*dy),
             sessionDuration: prev.sessionDuration + 1
         };
     });

  }, []);

  const startRun = () => {
      setGameState(prev => ({ ...prev, status: 'RUNNING' }));
      intervalRef.current = setInterval(tick, 1000); // 1 GPS point per second
  };

  const stopRun = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setGameState(prev => ({ ...prev, status: 'IDLE', currentPath: [] }));
  };

  useEffect(() => {
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return { gameState, startRun, stopRun };
};