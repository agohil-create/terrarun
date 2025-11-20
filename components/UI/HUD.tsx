import React from 'react';
import { User, GameState } from '../../types';
import { THEME } from '../../constants';

interface Props {
    user: User;
    gameState: GameState;
}

export const HUD: React.FC<Props> = ({ user, gameState }) => {
    return (
        <div className="absolute top-0 left-0 right-0 p-4 z-40 pointer-events-none">
            <div className="flex justify-between items-start">
                
                {/* Left: Trust Score (Anti-Cheat) */}
                <div className="glass-panel rounded-lg p-2 flex flex-col items-start border-l-2 border-l-neon-green">
                    <span className="text-[8px] text-gray-400 font-mono uppercase">Trust Score</span>
                    <span className="text-sm font-bold font-mono text-neon-green">{user.trustScore}%</span>
                </div>

                {/* Center: Active Run Stats (Only when running) */}
                {gameState.status === 'RUNNING' && (
                    <div className="glass-panel rounded-lg px-4 py-2 flex flex-col items-center animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-display font-bold text-white">{(gameState.sessionDistance / 1000).toFixed(2)}</span>
                            <span className="text-xs text-gray-400">km</span>
                        </div>
                        <span className="text-[10px] text-neon-pink uppercase tracking-widest animate-pulse">Recording</span>
                    </div>
                )}

                {/* Right: Wallet */}
                <div className="glass-panel rounded-lg p-2 flex flex-col items-end border-r-2 border-r-neon-cyan">
                    <span className="text-[8px] text-gray-400 font-mono uppercase">RUNZ Token</span>
                    <div className="flex items-center space-x-1">
                        <span className="text-sm font-bold font-mono text-neon-cyan">1,250</span>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};