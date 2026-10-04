import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Station, Question } from '../types';
import { timerAudio } from '../utils/audio';

interface QuizScreenProps {
  station: Station;
  onComplete: (score: number) => void;
  onBack: () => void;
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizScreen({ station, onComplete, onBack }: QuizScreenProps) {
  // Shuffle questions when station starts
  const questions = useMemo(() => {
    // Only take 20 questions if there are more
    return shuffleArray(station.questions).slice(0, 20);
  }, [station.id]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const isFinal = station.id === 'final';
  
  const question = questions[currentQuestionIdx];

  useEffect(() => {
    if (showResult || isAnswered) {
      timerAudio.stopTicking();
      return;
    }
    
    timerAudio.startTicking();
    setTimeLeft(15);
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      timerAudio.stopTicking();
    };
  }, [currentQuestionIdx, showResult, isAnswered]);

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    timerAudio.stopTicking();
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    timerAudio.stopTicking();

    if (idx === question.correctAnswer) {
      setScore(prev => prev + 1); // 1 point per correct answer
    }

    setTimeout(() => {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const isPassed = percentage >= 50;

    const handleRestart = () => {
      setCurrentQuestionIdx(0);
      setSelectedOption(null);
      setScore(0);
      setIsAnswered(false);
      setShowResult(false);
      setTimeLeft(15);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white/90 backdrop-blur rounded-3xl shadow-2xl border-4 border-indigo-100 max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          {isPassed ? (
            <div className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-green-200">
              <span className="text-6xl">🏆</span>
            </div>
          ) : (
            <div className="w-32 h-32 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-red-200">
              <span className="text-6xl">💪</span>
            </div>
          )}
          <h2 className="text-4xl font-extrabold text-slate-800 mb-2">
            {isPassed ? 'Tahniah!' : 'Cuba Lagi!'}
          </h2>
          <p className="text-slate-600 text-lg">Anda telah menamatkan stesen {station.title}</p>
        </motion.div>

        <div className="text-6xl font-black text-indigo-600 mb-8 bg-indigo-50 py-6 px-12 rounded-2xl shadow-inner border-2 border-indigo-100">
          {score} / {questions.length}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-200 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            Mula Semula
          </button>
          <button
            onClick={() => onComplete(score)}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            {isFinal ? 'Tebus Sijil Anda!' : 'Kembali ke Peta'}
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIdx) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => {
            timerAudio.stopTicking();
            onBack();
          }}
          className="px-4 py-2 bg-white text-slate-600 rounded-full font-bold hover:bg-slate-100 shadow flex items-center gap-2 transition-colors"
        >
          Kembali
        </button>
        <div className="px-6 py-2 bg-white/80 backdrop-blur rounded-full shadow font-bold text-indigo-800">
          Soalan {currentQuestionIdx + 1} / {questions.length}
        </div>
        
        {/* Timer UI */}
        <div className={`px-6 py-2 rounded-full shadow font-black tracking-widest flex items-center gap-2 transition-colors ${timeLeft <= 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-400 text-amber-900'}`}>
          <span>⏱️</span> {timeLeft}s
        </div>

        <div className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow font-bold tracking-widest">
          SKOR: {score}
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur rounded-full h-4 mb-8 overflow-hidden shadow-inner border border-white/50">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIdx}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 leading-tight">
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              let btnClass = "bg-slate-50 border-2 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300";
              
              if (isAnswered) {
                if (idx === question.correctAnswer) {
                  btnClass = "bg-green-100 border-2 border-green-500 text-green-800 shadow-lg shadow-green-100/50";
                } else if (idx === selectedOption) {
                  btnClass = "bg-red-100 border-2 border-red-500 text-red-800";
                } else {
                  btnClass = "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-5 rounded-2xl text-xl font-semibold transition-all ${btnClass} flex items-center justify-between`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === question.correctAnswer && (
                    <span className="text-green-600 text-2xl">✓</span>
                  )}
                  {isAnswered && idx === selectedOption && idx !== question.correctAnswer && (
                    <span className="text-red-600 text-2xl">✗</span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
