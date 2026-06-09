import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useFirstVisit } from '@/hooks/useFirstVisit'
import { useSound } from '@/hooks/useSound'

// ─── Animations ──────────────────────────────────────────────────────────────

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const scanline = keyframes`
  0% { top: -5%; }
  100% { top: 105%; }
`

// ─── Styled Components ────────────────────────────────────────────────────────

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.md};
    align-items: flex-start;
    padding-top: 100px;
  }
`

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`

const GradientOrb = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

const ScanlineEffect = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(transparent, rgba(0, 255, 136, 0.06), transparent);
  animation: ${scanline} 6s linear infinite;
  pointer-events: none;
`

const Terminal = styled(motion.div)`
  width: 100%;
  max-width: 760px;
  position: relative;
  z-index: 1;
`

const TerminalWindow = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  backdrop-filter: blur(8px);
  box-shadow:
    0 0 0 1px rgba(0, 255, 136, 0.05),
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(0, 255, 136, 0.04);
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 12px ${theme.spacing.md};
  background: rgba(45, 45, 45, 0.8);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
`

const Dot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: inline-block;
  flex-shrink: 0;
`

const TitleText = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.1em;
  flex: 1;
  text-align: center;
  margin-right: 36px;
`

const Body = styled.div`
  padding: ${theme.spacing.xl};
  font-size: ${theme.fontSizes.base};
  line-height: 2;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
    font-size: ${theme.fontSizes.sm};
  }
`

const Line = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  min-height: 1.6em;
`

const Prompt = styled.span`
  color: ${theme.colors.primary};
  flex-shrink: 0;
  user-select: none;
`

const Command = styled.span`
  color: ${theme.colors.textSecondary};
`

const Output = styled.span<{ highlight?: boolean; orange?: boolean; blue?: boolean }>`
  color: ${({ highlight, orange, blue }) =>
    highlight ? theme.colors.primary
    : orange ? theme.colors.orange
    : blue ? theme.colors.blue
    : theme.colors.textPrimary};
  font-weight: ${({ highlight }) => highlight ? '600' : '400'};
  ${({ highlight }) => highlight && `text-shadow: 0 0 12px ${theme.colors.primary};`}
`

const Cursor = styled.span`
  display: inline-block;
  width: 9px;
  height: 1.1em;
  background: ${theme.colors.primary};
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1.1s step-end infinite;
  box-shadow: 0 0 6px ${theme.colors.primary};
`

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.borderSubtle};
  margin: ${theme.spacing.sm} 0;
`

const Actions = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.sm};
  }
`

const Btn = styled(motion.a)<{ variant?: 'primary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px 22px;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fonts.mono};
  letter-spacing: 0.06em;
  transition: all ${theme.transitions.base};
  position: relative;
  overflow: hidden;

  ${({ variant }) => variant === 'primary' ? `
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    &:hover {
      background: rgba(0, 255, 136, 0.2);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
      color: ${theme.colors.primary};
    }
  ` : `
    background: transparent;
    border: 1px solid ${theme.colors.bgTertiary};
    color: ${theme.colors.textSecondary};
    &:hover {
      border-color: ${theme.colors.textSecondary};
      color: ${theme.colors.textPrimary};
    }
  `}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.06), transparent);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }
  &:hover::before {
    transform: translateX(100%);
  }
`

// ─── Terminal lines config ────────────────────────────────────────────────────

interface TermLine {
  type: 'command' | 'output' | 'blank' | 'divider'
  cmd?: string
  out?: string
  highlight?: boolean
  orange?: boolean
  blue?: boolean
  delay: number
}

const LINES: TermLine[] = [
  { type: 'command', cmd: 'whoami', delay: 0 },
  { type: 'output', out: 'Lucas Borba', highlight: true, delay: 400 },
  { type: 'blank', delay: 500 },
  { type: 'command', cmd: 'role', delay: 600 },
  { type: 'output', out: 'Data Engineer', highlight: true, delay: 1000 },
  { type: 'blank', delay: 1100 },
  { type: 'command', cmd: 'location', delay: 1200 },
  { type: 'output', out: 'Brazil 🇧🇷', orange: true, delay: 1600 },
  { type: 'blank', delay: 1700 },
  { type: 'command', cmd: 'current_focus', delay: 1800 },
  { type: 'output', out: 'Data Engineering | Data Warehousing | ETL | Analytics', blue: true, delay: 2200 },
  { type: 'blank', delay: 2300 },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  const isFirst = useFirstVisit()
  const { playHover, playClick } = useSound()
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
      }, isFirst ? line.delay : 0)
    })
  }, [isFirst])

  const lastLineVisible = visibleLines.includes(LINES.length - 1)

  const { displayed: lastCmd } = useTypewriter('_', {
    enabled: isFirst && lastLineVisible,
    delay: 200,
    speed: 80,
  })

  return (
    <Section id="hero">
      <GridBg />
      <GradientOrb />
      <ScanlineEffect />

      <Terminal
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <TerminalWindow>
          <TitleBar>
            <Dot color="#FF5F56" />
            <Dot color="#FFBD2E" />
            <Dot color="#27C93F" />
            <TitleText>lucas@portfolio: ~</TitleText>
          </TitleBar>

          <Body>
            {LINES.map((line, i) => {
              if (!visibleLines.includes(i)) return null
              if (line.type === 'blank') return <div key={i} style={{ height: '0.4em' }} />
              if (line.type === 'divider') return <Divider key={i} />

              return (
                <Line
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {line.type === 'command' ? (
                    <>
                      <Prompt>$</Prompt>
                      <Command>{line.cmd}</Command>
                    </>
                  ) : (
                    <Output highlight={line.highlight} orange={line.orange} blue={line.blue}>
                      {line.out}
                    </Output>
                  )}
                </Line>
              )
            })}

            {lastLineVisible && (
              <Line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Prompt>$</Prompt>
                <span>{lastCmd}</span>
                <Cursor />
              </Line>
            )}
          </Body>
        </TerminalWindow>

        <Actions
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: lastLineVisible ? 1 : 0, y: lastLineVisible ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Btn
            variant="primary"
            href="#projects"
            onMouseEnter={playHover}
            onClick={(e) => {
              e.preventDefault()
              playClick()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>▶</span> Ver Projetos
          </Btn>
          <Btn
            href="https://github.com/devlucasborba"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={() => playClick()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>◈</span> GitHub
          </Btn>
          <Btn
            href="https://www.linkedin.com/in/devlucasborba"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={() => playClick()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>◇</span> LinkedIn
          </Btn>
        </Actions>
      </Terminal>
    </Section>
  )
}
