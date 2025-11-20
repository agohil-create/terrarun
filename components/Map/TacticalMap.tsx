import React, { useEffect, useRef } from 'react';
import { GameState, HexTile } from '../../types';
import { getHexLatLngCorners } from '../../utils/geo';
import { THEME } from '../../constants';

interface Props {
    gameState: GameState;
}

// We access the global L variable provided by the CDN script
declare const L: any;

export const TacticalMap: React.FC<Props> = ({ gameState }) => {
    const mapRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    
    const layersRef = useRef<{
        owned: any,
        path: any,
        user: any,
        grid: any
    }>({ owned: null, path: null, user: null, grid: null });

    // 1. Initialize Map
    useEffect(() => {
        if (!mapContainerRef.current) return;
        if (mapRef.current) return; // Already init

        // Init Leaflet
        const map = L.map(mapContainerRef.current, {
            center: [gameState.userLocation.lat, gameState.userLocation.lng],
            zoom: 17,
            zoomControl: false,
            attributionControl: false, // We'll add custom or small one
            scrollWheelZoom: false, // Keep it game-like
        });

        // Dark Matter Tiles (Free, Cyberpunk friendly)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Layer Groups
        layersRef.current.owned = L.layerGroup().addTo(map);
        layersRef.current.path = L.layerGroup().addTo(map);
        layersRef.current.grid = L.layerGroup().addTo(map); // For debugging or static grid

        // User Marker (Custom Div Icon for Neon Glow)
        const userIcon = L.divIcon({
            className: 'custom-user-marker',
            html: `
                <div class="relative flex items-center justify-center w-6 h-6">
                    <div class="absolute w-12 h-12 bg-[#0FF0FC] rounded-full opacity-20 animate-pulse"></div>
                    <div class="absolute w-4 h-4 bg-[#0A0A0F] border-2 border-[#0FF0FC] rounded-full z-10"></div>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const marker = L.marker([gameState.userLocation.lat, gameState.userLocation.lng], { icon: userIcon }).addTo(map);
        layersRef.current.user = marker;

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // 2. Update Map State on Game Tick
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // A. Update User Position & Camera
        const { lat, lng } = gameState.userLocation;
        layersRef.current.user.setLatLng([lat, lng]);
        
        // Smooth Pan (only if distance is significant to avoid jitter)
        map.panTo([lat, lng], { animate: true, duration: 1.0 });

        // B. Update Owned Tiles
        layersRef.current.owned.clearLayers();
        Array.from(gameState.ownedTiles.values()).forEach((tile: HexTile) => {
            const corners = getHexLatLngCorners(tile.q, tile.r);
            L.polygon(corners, {
                color: THEME.Cyan,
                weight: 1,
                opacity: 0.5,
                fillColor: THEME.Cyan,
                fillOpacity: 0.2,
            }).addTo(layersRef.current.owned);
        });

        // C. Update Current Path
        layersRef.current.path.clearLayers();
        
        // Draw the Trail Polygons
        gameState.currentPath.forEach((hex) => {
            const corners = getHexLatLngCorners(hex.q, hex.r);
            L.polygon(corners, {
                color: THEME.Pink,
                weight: 0, // No border for breadcrumbs, just glow
                fillColor: THEME.Pink,
                fillOpacity: 0.4
            }).addTo(layersRef.current.path);
        });

        // Draw the Line connecting them
        if (gameState.currentPath.length > 0) {
             // Calculate centers for line
             // Note: simplistic approach, connecting centers of hexes
             // Ideally we track actual GPS trace in game state, but this is hex-based game
            // For demo visual, let's just not draw the line, the hexes look cooler
        }

    }, [gameState]);

    return (
        <div className="absolute inset-0 bg-void z-0">
            <div ref={mapContainerRef} className="w-full h-full mix-blend-lighten opacity-90" />
            
            {/* Grid Overlay Effect (CSS) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(10,10,15,0)_2px,transparent_2px),linear-gradient(90deg,rgba(10,10,15,0)_2px,transparent_2px)] bg-[size:40px_40px] opacity-20"></div>
        </div>
    );
};