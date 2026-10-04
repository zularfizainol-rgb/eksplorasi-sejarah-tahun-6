import { useState } from 'react';
import { useGameStore } from './store/useGameStore';
import MainMenu from './components/MainMenu';
import MapScreen from './components/MapScreen';
import QuizScreen from './components/QuizScreen';
import CertificateScreen from './components/CertificateScreen';
import FloatingSymbols from './components/FloatingSymbols';
import { stationsData, finalStation } from './data/questions';
import { StationId } from './types';
import { AnimatePresence, motion } from 'motion/react';

type Screen = 'menu' | 'map' | 'quiz' | 'certificate';

export default function App() {
  const { gameState, leaderboard, login, logout, completeStation, submitFinalScore } = useGameStore();
  const [currentScreen, setCurrentScreen] = useState<Screen>(gameState.playerName ? 'map' : 'menu');
  const [activeStationId, setActiveStationId] = useState<StationId | null>(null);
  const [isPreviewCert, setIsPreviewCert] = useState(false);

  const handleStart = (name: string) => {
    login(name);
    setCurrentScreen('map');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('menu');
  };

  const handleSelectStation = (id: StationId) => {
    setActiveStationId(id);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (score: number) => {
    if (activeStationId === 'final') {
      submitFinalScore(score);
      // Wait a moment then show certificate
      setCurrentScreen('certificate');
    } else if (activeStationId) {
      completeStation(activeStationId, score);
      setCurrentScreen('map');
    }
  };

  const activeStation = activeStationId === 'final' 
    ? finalStation 
    : stationsData.find(s => s.id === activeStationId);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200">
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-400 to-rose-400 opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <FloatingSymbols />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full min-h-screen">
        <AnimatePresence mode="wait">
          {currentScreen === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
              <MainMenu onStart={handleStart} leaderboard={leaderboard} onPreviewCert={() => setIsPreviewCert(true)} />
            </motion.div>
          )}

          {currentScreen === 'map' && (
            <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
              <MapScreen 
                completedStations={gameState.completedStations}
                unlockedFinal={gameState.unlockedFinal}
                onSelectStation={handleSelectStation}
                onLogout={handleLogout}
                playerName={gameState.playerName}
                totalScore={gameState.totalScore}
              />
            </motion.div>
          )}

          {currentScreen === 'quiz' && activeStation && (
            <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="min-h-screen flex flex-col justify-center p-4">
              <QuizScreen 
                station={activeStation} 
                onComplete={handleQuizComplete}
                onBack={() => setCurrentScreen('map')}
              />
            </motion.div>
          )}

          {currentScreen === 'certificate' && (
            <motion.div key="cert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
              <CertificateScreen 
                playerName={gameState.playerName}
                totalScore={gameState.totalScore}
                onHome={() => {
                  logout(); // Reset progress when they start again
                  setCurrentScreen('menu');
                }}
              />
            </motion.div>
          )}

          {isPreviewCert && (
            <motion.div key="cert-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen absolute inset-0 z-50 bg-black/50">
              <CertificateScreen 
                playerName="Contoh Nama Murid"
                totalScore={200}
                onHome={() => setIsPreviewCert(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
