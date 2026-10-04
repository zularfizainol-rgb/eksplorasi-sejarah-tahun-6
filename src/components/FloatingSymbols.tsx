import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const SYMBOLS = ['👑', '🏰', '📜', '🏺', '🧭', '🗺️', '⚔️', '🛡️', '⛵', '🗿', '🛖', '🏹', '🐅', '🌴', '🪙', '🐘', '🌺'];

export default function FloatingSymbols() {
  const [symbols, setSymbols] = useState<Array<{ id: number; symbol: string; x: number; y: number; delay: number; scale: number; rotation: number }>>([]);

  useEffect(() => {
    // Generate static random positions on mount to avoid hydration mismatch
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.8 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));
    setSymbols(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-4xl sm:text-5xl opacity-40 drop-shadow-md"
          initial={{ 
            left: `${item.x}%`, 
            top: `${item.y}%`, 
            rotate: item.rotation,
            scale: item.scale
          }}
          animate={{ 
            y: [0, -30, 0],
            rotate: [item.rotation, item.rotation + 15, item.rotation]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
}
