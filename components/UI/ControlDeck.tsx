import React from 'react';
import { ViewState, RunStatus } from '../../types';
import { NeonButton } from './NeonButton';
import { THEME } from '../../constants';

interface Props {
    currentView: ViewState;
    runStatus: RunStatus;
    onViewChange: (v: ViewState) => void;
    onToggleRun: () => void;
}

export const ControlDeck: React.FC<Props> = ({ currentView, runStatus, onViewChange, onToggleRun }) => {
    
    const NavItem = ({ view, label, icon }: { view: ViewState, label: string, icon: any }) => (
        <button 
            onClick={() => onViewChange(view)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${currentView === view ? 'text-white' : 'text-gray-500'}`}
        >
            <div className={`w-6 h-6 ${currentView === view ? 'drop-shadow-[0_0_5px_#fff]' : ''}`}>
               {icon}
            </div>
            <span className="text-[10px] font-mono">{label}</span>
        </button>
    );

    return (
        <div className="absolute bottom-0 left-0 right-0 h-24 z-50 pointer-events-none">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/90 to-transparent pointer-events-none"></div>
            
            {/* Interactive Area */}
            <div className="absolute bottom-0 w-full h-20 glass-panel border-b-0 rounded-t-3xl px-6 flex justify-between items-center pointer-events-auto">
                
                <NavItem 
                    view="LEADERBOARD" 
                    label="RANK" 
                    icon={<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>} 
                />
                
                <NavItem 
                    view="CLANS" 
                    label="CLAN" 
                    icon={<svg fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>} 
                />

                {/* Spacer for FAB */}
                <div className="w-20"></div>

                <NavItem 
                    view="MAP" 
                    label="MAP" 
                    icon={<svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>} 
                />

                <NavItem 
                    view="PROFILE" 
                    label="ID" 
                    icon={<svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>} 
                />
            </div>

            {/* Floating Action Button (Start Run) */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
                <NeonButton 
                    variant={runStatus === 'RUNNING' ? 'pink' : 'cyan'} 
                    size="xl"
                    pulsing={runStatus === 'IDLE'}
                    onClick={onToggleRun}
                    className={`rounded-full border-4 bg-[#0A0A0F] shadow-[0_0_30px_rgba(15,240,252,0.3)] ${runStatus === 'RUNNING' ? 'shadow-[0_0_30px_rgba(255,0,168,0.4)]' : ''}`}
                >
                    {runStatus === 'RUNNING' ? 'STOP' : 'GO'}
                </NeonButton>
            </div>
        </div>
    );
};