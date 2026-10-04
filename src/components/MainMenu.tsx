import { motion } from 'motion/react';
import { LeaderboardEntry } from '../types';

interface MainMenuProps {
  onStart: (name: string) => void;
  leaderboard: LeaderboardEntry[];
  onPreviewCert?: () => void;
}

export default function MainMenu({ onStart, leaderboard, onPreviewCert }: MainMenuProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('playerName') as string;
    if (name && name.trim().length > 0) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 flex flex-col justify-center relative overflow-hidden"
        >
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 leading-tight mb-4">
              Eksplorasi Sejarah
            </h1>
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full font-bold tracking-widest text-sm uppercase mb-6">
              Tahun 6 KSSR
            </div>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Uji pengetahuan sejarah anda, terokai 10 stesen pembelajaran, dan menangi sijil pencapaian!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="playerName" className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Nama Penuh</label>
              <input
                type="text"
                id="playerName"
                name="playerName"
                required
                maxLength={50}
                placeholder="Masukkan nama penuh anda..."
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xl py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Mula Pengembaraan!
            </button>
          </form>

          {onPreviewCert && (
            <button 
              onClick={onPreviewCert} 
              className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>📄</span> Lihat Contoh Sijil
            </button>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 flex flex-col"
        >
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
            <span className="text-4xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Papan Pendahulu</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {leaderboard.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                <span className="text-5xl mb-4">🌟</span>
                <p className="text-white font-medium">Belum ada rekod. Jadilah yang pertama mencipta sejarah!</p>
              </div>
            ) : (
              leaderboard.map((entry, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-4 rounded-2xl ${
                    idx === 0 ? 'bg-amber-500/20 border border-amber-500/50' : 
                    idx === 1 ? 'bg-slate-300/20 border border-slate-300/50' : 
                    idx === 2 ? 'bg-amber-700/20 border border-amber-700/50' : 
                    'bg-white/5 border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                      idx === 0 ? 'bg-amber-500 text-amber-900' : 
                      idx === 1 ? 'bg-slate-300 text-slate-800' : 
                      idx === 2 ? 'bg-amber-700 text-amber-100' : 
                      'bg-white/10 text-white/50'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="font-bold text-white text-lg">{entry.name}</span>
                  </div>
                  <span className="font-black text-indigo-300 font-mono text-xl">{entry.score}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
