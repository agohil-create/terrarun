import React, { useState } from 'react';
import { MOCK_LEADERBOARD, THEME } from '../constants';

export const LeaderboardView: React.FC = () => {
    const [scope, setScope] = useState<'GLOBAL' | 'CLAN'>('GLOBAL');

    return (
        <div className="w-full h-full bg-void pt-16 pb-28 px-4 overflow-y-auto">
            <h1 className="text-3xl font-display font-bold text-white mb-1">RANKINGS</h1>
            <div className="flex space-x-4 mb-6 border-b border-white/10 pb-2">
                <button 
                    onClick={() => setScope('GLOBAL')}
                    className={`text-sm font-mono ${scope === 'GLOBAL' ? 'text-neon-cyan' : 'text-gray-500'}`}
                >
                    GLOBAL
                </button>
                <button 
                     onClick={() => setScope('CLAN')}
                    className={`text-sm font-mono ${scope === 'CLAN' ? 'text-neon-cyan' : 'text-gray-500'}`}
                >
                    CLAN
                </button>
            </div>

            <div className="space-y-3">
                {MOCK_LEADERBOARD.map((entry) => (
                    <div key={entry.rank} className="glass-panel rounded-xl p-4 flex items-center justify-between group hover:border-neon-cyan/50 transition-colors">
                        <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 flex items-center justify-center font-mono font-bold text-lg
                                ${entry.rank === 1 ? 'text-neon-cyan drop-shadow-[0_0_5px_#0FF0FC]' : 
                                  entry.rank === 2 ? 'text-neon-pink' : 'text-gray-400'}`
                            }>
                                #{entry.rank}
                            </div>
                            <div>
                                <div className="text-white font-bold">{entry.username}</div>
                                {entry.clanTag && <div className="text-[10px] text-gray-400">[{entry.clanTag}]</div>}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-mono text-neon-green">{entry.score}</div>
                            <div className={`text-[10px] ${entry.change === 'up' ? 'text-neon-green' : 'text-red-500'}`}>
                                {entry.change === 'up' ? '▲' : entry.change === 'down' ? '▼' : '-'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};