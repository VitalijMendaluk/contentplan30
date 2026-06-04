"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NICHES = [
  "Мережевий маркетинг",
  "БАДи та здоров'я",
  "Косметика та краса",
  "Одяг та аксесуари",
  "Послуги та експертність",
  "Інше",
];

interface Props {
  onSubmit: (name: string, niche: string) => void;
  loading: boolean;
}

export default function OnboardingForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [customNiche, setCustomNiche] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const niche = selectedNiche === "Інше" ? customNiche : selectedNiche;
    if (!name.trim() || !niche.trim()) return;
    onSubmit(name.trim(), niche.trim());
  };

  const isValid =
    name.trim() &&
    selectedNiche &&
    (selectedNiche !== "Інше" || customNiche.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-start px-4 pt-8 pb-16"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm mb-3 tracking-widest uppercase">
          ‹ Наставник Віталік
        </p>
        <h1 className="text-6xl sm:text-7xl font-black leading-none uppercase tracking-tight mb-2">
          <span className="text-white">СТАРТ </span>
          <span className="gradient-text-pink">ТІК</span>
          <span className="gradient-text-cyan">ТОК</span>
        </h1>
        <h2 className="text-5xl sm:text-6xl font-black uppercase tracking-tight mb-4">
          <span className="gradient-text-pink italic">РОА</span>
          <span className="gradient-text-cyan italic">ДМАП</span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-sm mx-auto leading-relaxed">
          Введи своє ім&apos;я і нішу — отримай персональний план на 30 днів
        </p>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="card-dark rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1 h-5 bg-pink-500 rounded-full inline-block" />
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Дані для старту
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-white font-bold text-xs tracking-widest uppercase mb-2">
              Твоє ім&apos;я
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наприклад: Аліна, Сергій..."
              className="w-full bg-[#1A1430] border border-purple-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              disabled={loading}
            />
          </div>

          {/* Niche select */}
          <div>
            <label className="block text-white font-bold text-xs tracking-widest uppercase mb-2">
              Твоя ніша
            </label>
            <div className="grid grid-cols-1 gap-2">
              {NICHES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedNiche(n)}
                  disabled={loading}
                  className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                    selectedNiche === n
                      ? "border-purple-500 bg-purple-500/20 text-white glow-purple"
                      : "border-purple-600/20 bg-[#1A1430] text-gray-300 hover:border-purple-500/50 hover:text-white"
                  }`}
                >
                  {selectedNiche === n && (
                    <span className="mr-2 text-purple-400">✓</span>
                  )}
                  {n}
                </button>
              ))}
            </div>

            {selectedNiche === "Інше" && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                type="text"
                value={customNiche}
                onChange={(e) => setCustomNiche(e.target.value)}
                placeholder="Вкажи свою нішу..."
                className="mt-3 w-full bg-[#1A1430] border border-purple-600/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                disabled={loading}
              />
            )}
          </div>

          <motion.button
            type="submit"
            disabled={!isValid || loading}
            whileTap={{ scale: 0.98 }}
            className={`gradient-btn rounded-xl py-4 font-bold text-white text-base tracking-wide mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
          >
            {loading ? "⏳ Будуємо твій план..." : "⚡ ЗГЕНЕРУВАТИ РОАДМАП"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
