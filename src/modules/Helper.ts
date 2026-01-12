export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function lightenColor(hex: string, amount: number = 30) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(hex, 16);

  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x00ff) + amount;

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function toVeryLight(hex: string, factor: number = 0.85) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }

  const num = parseInt(hex, 16);

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // push each channel toward 255 (white)
  const newR = Math.round(r + (255 - r) * factor);
  const newG = Math.round(g + (255 - g) * factor);
  const newB = Math.round(b + (255 - b) * factor);

  return (
    "#" +
    ((1 << 24) + (newR << 16) + (newG << 8) + newB)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
}



