"use client";

import { motion } from "framer-motion";

const dots = ["●", "●", "●"];

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-pink-500 mb-6"
      />

      <h2 className="text-2xl font-bold text-white mb-2">
        Будуємо твій план...
      </h2>
      <p className="text-gray-400 text-sm mb-6 text-center max-w-xs">
        Gemini AI аналізує твою нішу і складає персональний роадмап на 30 днів
      </p>

      <div className="flex gap-2">
        {dots.map((dot, i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="text-pink-500 text-xl"
          >
            {dot}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
