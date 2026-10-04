import { motion } from 'motion/react';
import { stationsData, finalStation } from '../data/questions';
import { getIcon } from '../utils/icons';
import { StationId } from '../types';

interface MapScreenProps {
  completedStations: StationId[];
  unlockedFinal: boolean;
  onSelectStation: (id: StationId) => void;
  onLogout: () => void;
  playerName: string;
  totalScore: number;
}

export default function MapScreen({ 
  completedStations, 
  unlockedFinal, 
  onSelectStation, 
  onLogout,
  playerName,
  totalScore
}: MapScreenProps) {
  return (
    <div className="min-h-screen p-4 sm:p-8 relative">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mb-12 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Eksplorasi Sejarah Tahun 6
          </h1>
          <p className="text-slate-500 font-medium">Pemain: <span className="text-indigo-600 font-bold">{playerName}</span></p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-amber-100 border-2 border-amber-300 text-amber-800 px-6 py-2 rounded-full font-black text-xl shadow-inner">
            🏆 {totalScore} Mata
          </div>
          <button 
            onClick={onLogout}
            className="text-slate-500 hover:text-red-500 font-bold px-4 py-2 bg-slate-100 hover:bg-red-50 rounded-full transition-colors"
          >
            Keluar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-800 drop-shadow-sm mb-4">Peta Pembelajaran</h2>
          <p className="text-slate-700 font-bold text-lg">Pilih stesen untuk mula menjawab. Lengkapkan ke-10 stesen untuk membuka Cabaran Utama!</p>
          <div className="mt-4 inline-block bg-white/60 backdrop-blur px-6 py-2 rounded-full text-indigo-900 font-bold border border-white/60 shadow-sm">
            Progress: {completedStations.filter(id => id !== 'final').length} / 10 Stesen Selesai
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {stationsData.map((station, index) => {
            const isCompleted = completedStations.includes(station.id);
            const Icon = getIcon(station.iconName);
            
            return (
              <motion.button
                key={station.id}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectStation(station.id)}
                className={`relative group flex flex-col items-center p-6 rounded-3xl transition-all shadow-xl border-4 text-left overflow-hidden h-full ${
                  isCompleted 
                    ? 'bg-white border-green-400' 
                    : 'bg-white/95 border-indigo-100 hover:border-indigo-400'
                }`}
              >
                {isCompleted && (
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-400 rotate-12 flex items-end justify-center pb-2 z-10">
                    <span className="text-white font-bold text-sm rotate-[-12deg]">SELESAI</span>
                  </div>
                )}
                
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg ${station.color} transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={40} strokeWidth={2.5} />
                </div>
                
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-1 block">Stesen {index + 1}</span>
                  <h3 className="font-extrabold text-slate-800 leading-tight mb-2">{station.title}</h3>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Final Station */}
        <div className="flex justify-center pb-20">
          <motion.div
            initial={false}
            animate={{ 
              scale: unlockedFinal ? [1, 1.05, 1] : 1,
            }}
            transition={{ repeat: unlockedFinal ? Infinity : 0, duration: 2 }}
            className={`w-full max-w-2xl rounded-3xl p-1 ${unlockedFinal ? 'bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 shadow-2xl shadow-yellow-500/50' : 'bg-slate-300/50 border-4 border-slate-300 border-dashed'}`}
          >
            <div className={`w-full h-full p-8 rounded-[22px] flex flex-col md:flex-row items-center gap-8 ${unlockedFinal ? 'bg-white' : 'bg-slate-200/90 backdrop-blur'}`}>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner ${unlockedFinal ? 'bg-amber-100 text-amber-500' : 'bg-slate-300 text-slate-500'}`}>
                {(() => {
                  const Icon = unlockedFinal ? getIcon(finalStation.iconName) : getIcon('Lock');
                  return <Icon size={64} />;
                })()}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className={`text-3xl font-black mb-2 ${unlockedFinal ? 'text-amber-600' : 'text-slate-500'}`}>
                  {finalStation.title}
                </h3>
                <p className={`font-medium mb-6 ${unlockedFinal ? 'text-slate-600' : 'text-slate-400'}`}>
                  {unlockedFinal 
                    ? finalStation.description 
                    : 'Kunci Stesen ini hanya akan terbuka setelah anda menyelesaikan kesemua 10 stesen di atas.'}
                </p>
                <button
                  disabled={!unlockedFinal}
                  onClick={() => onSelectStation('final')}
                  className={`px-8 py-4 rounded-xl font-bold text-xl transition-all w-full md:w-auto ${
                    unlockedFinal 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1' 
                      : 'bg-slate-300 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {unlockedFinal ? 'Mula Cabaran Terakhir!' : 'Terkunci'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
