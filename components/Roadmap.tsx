"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeekBlock from "./WeekBlock";
import ProgressBar from "./ProgressBar";
import MilestoneModal from "./MilestoneModal";

interface WeekData {
  title: string;
  tasks: string[];
}

interface RoadmapData {
  week1: WeekData;
  week2: WeekData;
  week3: WeekData;
  week4: WeekData;
}

interface Props {
  roadmap: RoadmapData;
  userName: string;
  niche: string;
  onReset: () => void;
}

const STORAGE_KEY_PREFIX = "tiktok_roadmap_";
const MILESTONES = [25, 50, 75, 100];

export default function Roadmap({ roadmap, userName, niche, onReset }: Props) {
  const storageKey = `${STORAGE_KEY_PREFIX}${userName.toLowerCase().replace(/\s+/g, "_")}`;

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [shownMilestones, setShownMilestones] = useState<Set<number>>(new Set());
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setChecked(parsed.checked || {});
        setShownMilestones(new Set(parsed.shownMilestones || []));
      }
    } catch {}
  }, [storageKey]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          checked,
          shownMilestones: Array.from(shownMilestones),
        })
      );
    } catch {}
  }, [checked, shownMilestones, storageKey]);

  const weeks = [
    { key: "week1", data: roadmap.week1 },
    { key: "week2", data: roadmap.week2 },
    { key: "week3", data: roadmap.week3 },
    { key: "week4", data: roadmap.week4 },
  ];

  const totalTasks = weeks.reduce((acc, w) => acc + w.data.tasks.length, 0);
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const checkMilestones = useCallback(
    (newPct: number) => {
      for (const m of MILESTONES) {
        if (newPct >= m && !shownMilestones.has(m)) {
          setShownMilestones((prev) => new Set(Array.from(prev).concat(m)));
          setActiveMilestone(m);
          break;
        }
      }
    },
    [shownMilestones]
  );

  const handleToggle = (taskKey: string) => {
    setChecked((prev) => {
      const next = { ...prev, [taskKey]: !prev[taskKey] };
      const newCompleted = Object.values(next).filter(Boolean).length;
      const newPct = Math.round((newCompleted / totalTasks) * 100);
      checkMilestones(newPct);
      return next;
    });
  };

  const handleReset = () => {
    setChecked({});
    setShownMilestones(new Set());
    setShowResetConfirm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 pt-6 pb-20 max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">
          ‹ Наставник Віталік
        </p>
        <h1 className="text-4xl font-black uppercase leading-tight">
          <span className="gradient-text-pink">РОА</span>
          <span className="gradient-text-cyan">ДМАП</span>
          <span className="text-white"> 1–30</span>
        </h1>
        <p className="text-gray-300 text-sm mt-1">
          <span className="text-white font-semibold">{userName}</span> ·{" "}
          <span className="text-purple-400">{niche}</span>
        </p>
      </div>

      {/* Global progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-dark rounded-2xl p-5 mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-sm">Загальний прогрес</span>
          <span className={`text-lg font-black ${pct === 100 ? "gradient-text-cyan" : "gradient-text-pink"}`}>
            {pct}%
          </span>
        </div>
        <ProgressBar completed={completedTasks} total={totalTasks} label={`Виконано завдань`} />
      </motion.div>

      {/* Week blocks */}
      <div className="flex flex-col gap-3 mb-6">
        {weeks.map(({ key, data }, i) => (
          <WeekBlock
            key={key}
            weekKey={key}
            weekIndex={i}
            data={data}
            checked={checked}
            onToggle={handleToggle}
            defaultOpen={i === 0}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
        >
          🔄 Скинути прогрес
        </button>
        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-500/10 transition-colors"
        >
          ← Змінити нішу
        </button>
      </div>

      {/* Reset confirm */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(13,10,26,0.85)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-dark rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <p className="text-xl mb-2">⚠️</p>
              <h3 className="text-white font-bold text-lg mb-2">Скинути прогрес?</h3>
              <p className="text-gray-400 text-sm mb-5">
                Всі позначені завдання будуть скинуті. Цю дію не можна відмінити.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-xl border border-purple-500/30 text-purple-400 text-sm font-medium"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium"
                >
                  Скинути
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MilestoneModal
        milestone={activeMilestone}
        onClose={() => setActiveMilestone(null)}
      />
    </motion.div>
  );
}
