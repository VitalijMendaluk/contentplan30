"use client";

import { motion, AnimatePresence } from "framer-motion";

const MILESTONES: Record<number, { emoji: string; title: string; text: string }> = {
  25: {
    emoji: "🔥",
    title: "25% виконано!",
    text: "Чудовий початок! Ти вже на чверті шляху. Продовжуй у тому ж дусі!",
  },
  50: {
    emoji: "⚡",
    title: "Половина зроблена!",
    text: "Ти на середині шляху! Це вже серйозний результат. Не зупиняйся!",
  },
  75: {
    emoji: "🚀",
    title: "75% — майже там!",
    text: "Залишилось зовсім небагато! Ти показуєш неймовірний прогрес!",
  },
  100: {
    emoji: "🏆",
    title: "Роадмап завершено!",
    text: "Вітаємо! Ти пройшов весь 30-денний план! Час виходити на новий рівень!",
  },
};

interface Props {
  milestone: number | null;
  onClose: () => void;
}

export default function MilestoneModal({ milestone, onClose }: Props) {
  const data = milestone ? MILESTONES[milestone] : null;

  return (
    <AnimatePresence>
      {milestone && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(13,10,26,0.85)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="card-dark rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
          >
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-400/10 pointer-events-none" />

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="text-6xl mb-4"
            >
              {data.emoji}
            </motion.div>

            <h3 className="text-2xl font-black text-white mb-3">{data.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{data.text}</p>

            <button
              onClick={onClose}
              className="gradient-btn w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide"
            >
              Продовжити 💪
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
