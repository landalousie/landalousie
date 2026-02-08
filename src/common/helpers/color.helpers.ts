export const generateTailwindPalette = (hex: string) => {
  const base = parseHex(hex);
  if (!base) return { DEFAULT: hex, 500: hex };

  return {
    DEFAULT: hex,
    50: mix(base, { r: 255, g: 255, b: 255 }, 0.95),
    100: mix(base, { r: 255, g: 255, b: 255 }, 0.9),
    200: mix(base, { r: 255, g: 255, b: 255 }, 0.8),
    300: mix(base, { r: 255, g: 255, b: 255 }, 0.7),
    400: mix(base, { r: 255, g: 255, b: 255 }, 0.6),
    500: hex,
    600: mix(base, { r: 0, g: 0, b: 0 }, 0.1),
    700: mix(base, { r: 0, g: 0, b: 0 }, 0.2),
    800: mix(base, { r: 0, g: 0, b: 0 }, 0.3),
    900: mix(base, { r: 0, g: 0, b: 0 }, 0.4),
    950: mix(base, { r: 0, g: 0, b: 0 }, 0.5),
  };
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

const parseHex = (hex: string): RGB | null => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
};

const mix = (color: RGB, mixColor: RGB, weight: number): string => {
  const r = Math.round(color.r * (1 - weight) + mixColor.r * weight);
  const g = Math.round(color.g * (1 - weight) + mixColor.g * weight);
  const b = Math.round(color.b * (1 - weight) + mixColor.b * weight);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
