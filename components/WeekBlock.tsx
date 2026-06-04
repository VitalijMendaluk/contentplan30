"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./ProgressBar";

interface WeekData {
  title: string;
  tasks: string[];
}

interface Props {
  weekKey: string;
  weekIndex: number;
  data: WeekData;
  checked: Record<string, boolean>;
  onToggle: (taskKey: string) => void;
  defaultOpen?: boolean;
}

const WEEK_COLORS = [
  { accent: "#FF0050", bg: "from-pink-500/10", border: "border-pink-500/30" },
  { accent: "#7C3AED", bg: "from-purple-500/10", border: "border-purple-500/30" },
  { accent: "#00F0FF", bg: "from-cyan-400/10", border: "border-cyan-400/30" },
  { accent: "#FF0050", bg: "from-pink-500/10", border: "border-pink-500/30" },
];

export default function WeekBlock({
  weekKey,
  weekIndex,
  data,
  checked,
  onToggle,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const color = WEEK_COLORS[weekIndex % WEEK_COLORS.length];

  const completedCount = data.tasks.filter(
    (_, i) => checked[`${weekKey}_${i}`]
  ).length;
  const total = data.tasks.length;
  const allDone = completedCount === total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: weekIndex * 0.1 }}
      className={`card-dark rounded-2xl overflow-hidden border ${color.border}`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left bg-gradient-to-r ${color.bg} to-transparent transition-colors hover:bg-opacity-80`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: color.accent + "33", color: color.accent }}
          >
            {weekIndex + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-sm leading-tight truncate">
              {data.title}
            </p>
            <div className="mt-1.5 pr-2">
              <ProgressBar completed={completedCount} total={total} size="sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-3 flex-shrink-0">
          {allDone && (
            <span className="text-cyan-400 text-xs font-bold">✓ ГОТОВО</span>
          )}
          <span
            className="text-gray-400 text-lg transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Tasks */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-1 flex flex-col gap-2">
              {data.tasks.map((task, i) => {
                const key = `${weekKey}_${i}`;
                const done = !!checked[key];
                return (
                  <motion.label
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      done
                        ? "bg-purple-500/10 border border-purple-500/20"
                        : "bg-[#130F25]/60 border border-transparent hover:border-purple-600/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => onToggle(key)}
                      className="mt-0.5"
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        done ? "text-gray-400 line-through" : "text-gray-200"
                      }`}
                    >
                      {task}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
