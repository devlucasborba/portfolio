import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    color-scheme: dark;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background-color: ${theme.colors.bg};
    color: ${theme.colors.textPrimary};
    font-family: ${theme.fonts.mono};
    font-size: ${theme.fontSizes.base};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.bgTertiary};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryDim};
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.primaryGlow};
    color: ${theme.colors.primary};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    &:hover { color: ${theme.colors.textPrimary}; }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.mono};
    border: none;
    background: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }


  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 136, 0.2); }
    50% { box-shadow: 0 0 25px rgba(0, 255, 136, 0.5); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
`
