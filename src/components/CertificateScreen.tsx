import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateScreenProps {
  playerName: string;
  totalScore: number;
  onHome: () => void;
}

export default function CertificateScreen({ playerName, totalScore, onHome }: CertificateScreenProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('Sijil_Pahlawan_Sejarah.pdf');
    } catch (e) {
      console.error('Failed to generate PDF', e);
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative background elements for screen only, hidden on print */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 -z-10 print:hidden" />
      <div className="absolute w-[800px] h-[800px] bg-amber-500/20 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 print:hidden" />

      <motion.div 
        ref={certRef}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-full max-w-4xl bg-white relative shadow-2xl p-8 sm:p-12 md:p-16 flex flex-col justify-center items-center text-center min-h-[500px] md:min-h-[600px] print:shadow-none print:w-full print:min-h-screen print:max-w-none print:m-0"
        style={{ border: '20px solid #1e3a8a' }} // Deep blue border
      >
        {/* Inner gold border */}
        <div className="absolute inset-4 border-4 border-amber-400 opacity-50" />
        <div className="absolute inset-6 border border-amber-500 opacity-30" />

        <div className="mb-4 sm:mb-8 relative z-10">
          <div className="flex justify-center items-center gap-6 sm:gap-12 mx-auto mb-4 sm:mb-6">
            <img src="https://i.postimg.cc/x1yzrs3k/IMG-20220901-WA0001(1).jpg" alt="Logo SK AU Keramat" className="h-16 sm:h-24 md:h-28 object-contain" crossOrigin="anonymous" />
            <img src="https://i.postimg.cc/bYsF95Q0/IMG-20220901-WA0002(1).jpg" alt="Logo TS25" className="h-16 sm:h-24 md:h-28 object-contain" crossOrigin="anonymous" />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 uppercase tracking-widest font-serif">
            Sijil Pencapaian
          </h1>
          <p className="text-amber-600 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-2 sm:mt-4 text-xs sm:text-sm md:text-base">
            Eksplorasi Sejarah Tahun 6
          </p>
        </div>

        <div className="my-4 sm:my-8 relative z-10">
          <p className="text-slate-500 font-medium text-sm sm:text-lg md:text-xl italic mb-2 sm:mb-4">
            Dengan ini diperakui bahawa
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-indigo-900 border-b-2 border-slate-300 pb-2 inline-block px-4 sm:px-12 capitalize font-serif">
            {playerName}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mt-2 sm:mt-4 relative z-10 px-4">
          <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
            Telah berjaya menamatkan kesemua 10 stesen pembelajaran dan lulus Cabaran Utama dengan cemerlang, 
            mengumpul jumlah keseluruhan skor sebanyak <span className="font-black text-indigo-700">{totalScore}</span> mata.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 px-2 sm:px-12 relative z-10">
          <div className="text-center order-2 sm:order-1">
            <div className="w-32 sm:w-40 md:w-48 border-b-2 border-slate-400 mb-2 mx-auto" />
            <p className="text-slate-500 font-bold uppercase text-xs sm:text-sm tracking-wider">Tarikh</p>
            <p className="text-slate-800 font-semibold mt-1 text-sm sm:text-base">{new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-amber-400 rounded-full flex items-center justify-center text-white font-black text-center shadow-lg border-4 border-amber-200 transform rotate-12 shrink-0 order-1 sm:order-2">
            <span className="text-xs sm:text-sm leading-tight block">PAHLAWAN<br/>SEJARAH</span>
          </div>

          <div className="text-center order-3">
            <div className="w-32 sm:w-40 md:w-48 border-b-2 border-slate-400 mb-2 relative mx-auto">
              {/* Fake signature */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl text-indigo-900/40 font-serif italic -rotate-12 select-none">
                AI Studio
              </div>
            </div>
            <p className="text-slate-500 font-bold uppercase text-xs sm:text-sm tracking-wider">Pengesahan</p>
            <p className="text-slate-800 font-semibold mt-1 text-sm sm:text-base">Guru Sejarah Maya</p>
          </div>
        </div>
      </motion.div>

      {/* Controls - Hidden when printing */}
      <div className="mt-12 flex gap-6 print:hidden">
        <button 
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="px-8 py-4 bg-white text-indigo-900 rounded-full font-black text-lg hover:bg-slate-100 shadow-xl transition-all hover:-translate-y-1 flex items-center gap-3 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <span className="text-2xl">🖨️</span> {isGenerating ? 'Menjana PDF...' : 'Muat Turun PDF'}
        </button>
        <button 
          onClick={onHome}
          className="px-8 py-4 bg-indigo-600 text-white rounded-full font-black text-lg hover:bg-indigo-700 shadow-xl transition-all hover:-translate-y-1"
        >
          Kembali ke Menu
        </button>
      </div>

      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
        }
      `}</style>
    </div>
  );
}
