import React from 'react';
import { User } from '../types';
import { NeonButton } from '../components/UI/NeonButton';

interface Props {
    user: User;
}

export const ProfileView: React.FC<Props> = ({ user }) => {
    return (
        <div className="w-full h-full bg-void pt-16 pb-28 px-4 overflow-y-auto">
             <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full border-2 border-neon-cyan p-1 mb-4 shadow-[0_0_20px_rgba(15,240,252,0.2)]">
                    <img src={user.avatarUrl} className="w-full h-full rounded-full bg-surface" alt="avatar" />
                </div>
                <h1 className="text-2xl font-display font-bold text-white">{user.username}</h1>
                <div className="flex space-x-2 mt-2">
                    <span className="px-2 py-0.5 bg-neon-purple/20 text-neon-purple text-[10px] font-mono border border-neon-purple/50 rounded">
                        LVL {user.level}
                    </span>
                    <span className="px-2 py-0.5 bg-surface text-gray-400 text-[10px] font-mono border border-white/10 rounded">
                        {user.walletAddress}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-panel p-4 rounded-lg">
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Total Distance</div>
                    <div className="text-xl font-mono text-white">{(user.stats.totalDistance / 1000).toFixed(1)}<span className="text-sm text-gray-500">km</span></div>
                </div>
                <div className="glass-panel p-4 rounded-lg">
                    <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Owned Area</div>
                    <div className="text-xl font-mono text-white">{(user.stats.totalArea / 10000).toFixed(2)}<span className="text-sm text-gray-500">ha</span></div>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                <NeonButton variant="cyan" className="w-full">View Territories</NeonButton>
                <NeonButton variant="pink" className="w-full">Claim Season Rewards</NeonButton>
            </div>
        </div>
    );
};