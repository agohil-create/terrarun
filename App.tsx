import React, { useState } from 'react';
import { ControlDeck } from './components/UI/ControlDeck';
import { DashboardView } from './views/DashboardView';
import { LeaderboardView } from './views/LeaderboardView';
import { ProfileView } from './views/ProfileView';
import { useGameEngine } from './hooks/useGameEngine';
import { ViewState } from './types';
import { CURRENT_USER } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('MAP');
  const { gameState, startRun, stopRun } = useGameEngine();

  const handleToggleRun = () => {
      if (gameState.status === 'RUNNING') {
          stopRun();
      } else {
          startRun();
          setView('MAP'); // Force map view on start
      }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-void text-white overflow-hidden">
      
      {/* View Router */}
      <main className="absolute inset-0">
          {view === 'MAP' && <DashboardView gameState={gameState} user={CURRENT_USER} />}
          {view === 'LEADERBOARD' && <LeaderboardView />}
          {view === 'CLANS' && <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono">CLAN SYSTEM OFFLINE</div>}
          {view === 'PROFILE' && <ProfileView user={CURRENT_USER} />}
      </main>

      {/* Global Nav */}
      <ControlDeck 
        currentView={view} 
        runStatus={gameState.status}
        onViewChange={setView}
        onToggleRun={handleToggleRun}
      />

    </div>
  );
};

export default App;