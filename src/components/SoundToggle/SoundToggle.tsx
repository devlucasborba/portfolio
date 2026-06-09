import { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSoundEnabled, setSoundEnabled } from '@/hooks/useSound'

const Button = styled(motion.button)`
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 200;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${theme.colors.bgSecondary};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${theme.spacing.md};
    right: ${theme.spacing.md};
    width: 38px;
    height: 38px;
    font-size: 16px;
  }
`

const Tooltip = styled(motion.span)`
  position: absolute;
  right: 52px;
  background: ${theme.colors.bgSecondary};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.xs};
  padding: 4px 8px;
  border-radius: ${theme.borderRadius.sm};
  white-space: nowrap;
  pointer-events: none;
`

export function SoundToggle() {
  const [enabled, setEnabled] = useState(useSoundEnabled)
  const [showTip, setShowTip] = useState(false)

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    setSoundEnabled(next)
  }

  return (
    <Button
      onClick={toggle}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={enabled ? 'Desativar sons' : 'Ativar sons'}
      aria-label={enabled ? 'Desativar sons' : 'Ativar sons'}
    >
      {enabled ? '🔊' : '🔇'}
      {showTip && (
        <Tooltip
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
        >
          {enabled ? 'sons: ON' : 'sons: OFF'}
        </Tooltip>
      )}
    </Button>
  )
}
