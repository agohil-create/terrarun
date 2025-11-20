import React from 'react';
import { TacticalMap } from '../components/Map/TacticalMap';
import { HUD } from '../components/UI/HUD';
import { GameState, User } from '../types';

interface Props {
    gameState: GameState;
    user: User;
}

export const DashboardView: React.FC<Props> = ({ gameState, user }) => {
    return (
        <div className="relative w-full h-full">
            <HUD user={user} gameState={gameState} />
            <TacticalMap gameState={gameState} />
            
            {/* Notifications / Toasts Area */}
            <div className="absolute top-24 left-0 right-0 px-4 flex flex-col space-y-2 items-center pointer-events-none">
                {/* Example Toast */}
                {gameState.currentPath.length > 5 && (
                   <div className="glass-panel rounded px-3 py-1 text-xs text-neon-pink border border-neon-pink/30 animate-pulse">
                       LOOP DETECTED - CLOSE TO CAPTURE
                   </div>
                )}
            </div>
        </div>
    );
};