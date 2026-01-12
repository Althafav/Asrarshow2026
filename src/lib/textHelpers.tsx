// src/lib/textHelpers.tsx
import React from "react";

export function highlightWord(text: any) {
  if (!text || typeof text !== "string") return text;

  const parts = text.split(/(ASRAR)/i);

  return parts.map((part, index) =>
    part.toLowerCase() === "asrar" ? (
      <span key={index} style={{ color: "#FCE690" }}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}
