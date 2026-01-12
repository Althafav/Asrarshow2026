"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";

type Lang = "en" | "ar" | "zh";

const LANGS: { code: Lang; label: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "EN", dir: "ltr" },
  { code: "ar", label: "AR", dir: "rtl" }
];

export default function LanguageToggle() {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current = useMemo(
    () => LANGS.find((l) => l.code === locale) ?? LANGS[0],
    [locale]
  );

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectLang = async (lang: Lang) => {
    setOpen(false);

    await router.push({ pathname, query }, asPath, { locale: lang });

    // Update document direction (important for Arabic)
    const selected = LANGS.find((l) => l.code === lang);
    if (selected) {
      document.documentElement.dir = selected.dir;
      document.documentElement.lang = lang;
    }
  };

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="group flex items-center gap-1 rounded-xl px-2 py-1 bg-[#06141f]/80 backdrop-blur text-white"
      >
        <span className="h-6 w-px bg-white/20" />

        <span className="text-xs font-semibold">{current.label}</span>

        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[#06141f]/95 border border-white/10 z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => selectLang(l.code)}
              className={`w-full px-4 text-white py-3 text-left text-sm hover:bg-white/5 ${
                l.code === locale ? "bg-white/5" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
