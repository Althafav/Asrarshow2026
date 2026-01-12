// Example: app/components/IframeEmbed.tsx or src/components/IframeEmbed.tsx
import React from "react";

export default function IframeEmbed({ src, title }: any) {
  return (
    <div className="w-full h-112.5">
      <iframe
        src={src}
        title={title}
        className="w-full h-full border-0 rounded-3xl"
        allowFullScreen
      ></iframe>
    </div>
  );
}
