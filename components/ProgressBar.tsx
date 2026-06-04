"use client";

import { motion } from "framer-motion";

interface Props {
  completed: number;
  total: number;
  label?: string;
  size?: "sm" | "md";
}

export default function ProgressBar({
  completed,
  total,
  label,
  size = "md",
}: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-gray-400 ${size === "sm" ? "text-xs" : "text-sm"}`}
          >
            {label}
          </span>
          <span
            className={`font-bold ${size === "sm" ? "text-xs" : "text-sm"} ${
              pct === 100 ? "text-cyan-400" : "text-white"
            }`}
          >
            {completed}/{total}
          </span>
        </div>
      )}
      <div
        className={`w-full bg-purple-900/40 rounded-full overflow-hidden ${
          size === "sm" ? "h-1.5" : "h-2.5"
        }`}
      >
        <motion.div
          className="h-full progress-bar-fill rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
