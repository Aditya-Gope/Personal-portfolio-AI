import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedName: React.FC = () => {
  const letters = 'Aditya'.split('');

  return (
    <div className="relative inline-flex flex-col items-center select-none py-1">
      {/* Background ambient pulsating neon blur */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-cyber-cyan/30 via-cyber-violet/30 to-cyber-pink/30 blur-2xl rounded-full pointer-events-none"
      />

      <div className="relative flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {/* Animated ADITYA letters */}
        <div className="flex items-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: [0, -6, 0],
                opacity: 1,
              }}
              transition={{
                y: {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.12,
                },
                opacity: {
                  duration: 0.4,
                  delay: index * 0.08,
                },
              }}
              whileHover={{
                scale: 1.25,
                y: -12,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
              className="inline-block text-4xl sm:text-5xl md:text-6xl font-black tracking-tight cursor-pointer font-display transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #38BDF8 25%, #8B5CF6 50%, #EC4899 75%, #00F0FF 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'flowGradient 4s ease infinite',
                filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.45))',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* PERSONAL AI tag with cyber pill style */}
        <motion.span
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 font-display drop-shadow-lg"
        >
          Personal AI
        </motion.span>
      </div>

      {/* Cyber energy scanline underline */}
      <div className="relative w-48 sm:w-64 h-[2px] mt-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-glow-cyan"
        />
      </div>
    </div>
  );
};
