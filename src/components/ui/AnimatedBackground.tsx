"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const AnimatedBackground = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className={`absolute inset-0 animate-gradient bg-gradient-to-br ${
          theme === "dark"
            ? "from-gray-900 via-blue-900 to-gray-800"
            : "from-blue-300 via-white to-blue-100"
        }`}
      />
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
};
