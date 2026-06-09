export const theme = {
  colors: {
    // Base
    bg: '#0B0B0B',
    bgSecondary: '#1A1A1A',
    bgTertiary: '#2D2D2D',
    // Terminal green accents
    primary: '#00FF88',
    primaryDim: '#00CC6A',
    primaryGlow: 'rgba(0, 255, 136, 0.15)',
    primaryGlowStrong: 'rgba(0, 255, 136, 0.35)',
    // GTA SA green
    gtaGreen: '#38B000',
    gtaGreenDim: '#2D8A00',
    // Text
    textPrimary: '#EAEAEA',
    textSecondary: '#A0A0A0',
    textMuted: '#606060',
    // Accents
    orange: '#FF7A00',
    orangeDim: 'rgba(255, 122, 0, 0.15)',
    blue: '#4A9EFF',
    blueDim: 'rgba(74, 158, 255, 0.15)',
    // Borders
    border: 'rgba(0, 255, 136, 0.2)',
    borderHover: 'rgba(0, 255, 136, 0.5)',
    borderSubtle: 'rgba(255, 255, 255, 0.06)',
  },
  fonts: {
    mono: "'JetBrains Mono', 'Share Tech Mono', 'Courier New', monospace",
  },
  fontSizes: {
    xs: '0.65rem',
    sm: '0.75rem',
    base: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    '2xl': '1.75rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    '2xl': '64px',
    '3xl': '96px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  transitions: {
    fast: '0.15s ease',
    base: '0.25s ease',
    slow: '0.4s ease',
  },
  shadows: {
    glow: '0 0 20px rgba(0, 255, 136, 0.3)',
    glowStrong: '0 0 40px rgba(0, 255, 136, 0.5)',
    card: '0 4px 24px rgba(0, 0, 0, 0.6)',
    cardHover: '0 8px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 255, 136, 0.15)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

export type Theme = typeof theme
