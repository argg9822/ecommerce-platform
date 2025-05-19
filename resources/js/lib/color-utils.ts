// utils/color-utils.ts
export function isValidHex(color: string): boolean {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
}

export function hexToRgb(hex: string): string {
  if (!isValidHex(hex)) return "";

  // Expandir formato corto (#RGB) a completo (#RRGGBB)
  const fullHex = hex.length === 4 
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;

  const r = parseInt(fullHex.slice(1, 3), 16);
  const g = parseInt(fullHex.slice(3, 5), 16);
  const b = parseInt(fullHex.slice(5, 7), 16);

  return `${r}, ${g}, ${b}`;
}