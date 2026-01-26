"use client";

import { useEffect } from "react";
import { useDarkModeStore } from "./darkMode";

export default function DarkModeToggle() {
  const darkMode = useDarkModeStore((s) => s.darkMode);
  const init = useDarkModeStore((s) => s.init);
  const toggle = useDarkModeStore((s) => s.toggle);

  useEffect(() => {
    init();
  }, [init]);
  if (darkMode === undefined) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Dark mode change"
      style={{
        padding: "0.5rem 0.5rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
        background: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#222",
        cursor: "pointer",
      }}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
