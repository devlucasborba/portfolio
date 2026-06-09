import { useState, useEffect, useCallback } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

// ─── Animations ──────────────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

// ─── Section Layout ───────────────────────────────────────────────────────────

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  position: relative;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.md};
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled(motion.div)`
  margin-bottom: ${theme.spacing['2xl']};
`

const Tag = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.primary};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: ${theme.spacing.sm};
`

const Title = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.textPrimary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  &::before {
    content: '##';
    color: ${theme.colors.primary};
    font-size: ${theme.fontSizes.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.xl};
  }
`

// ─── Main Grid ────────────────────────────────────────────────────────────────

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: ${theme.spacing.xl};
  align-items: start;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

// ─── Card Carousel ────────────────────────────────────────────────────────────

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const StackArea = styled.div`
  position: relative;
  height: 520px;

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 480px;
  }
`

const CardBase = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: default;
  transform-origin: bottom center;
  will-change: transform, opacity;
`

const CardTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  background: rgba(45, 45, 45, 0.8);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
  flex-shrink: 0;
`

const Dot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`

const CardTitleText = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.08em;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StatusBadge = styled.span<{ status: 'active' | 'wip' | 'planned' }>`
  font-size: ${theme.fontSizes.xs};
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.06em;
  flex-shrink: 0;

  ${({ status }) => status === 'active' && css`
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.4);
    color: #00FF88;
  `}
  ${({ status }) => status === 'wip' && css`
    background: rgba(255, 122, 0, 0.1);
    border: 1px solid rgba(255, 122, 0, 0.4);
    color: #FF7A00;
    animation: ${pulse} 2.5s ease-in-out infinite;
  `}
  ${({ status }) => status === 'planned' && css`
    background: rgba(74, 158, 255, 0.1);
    border: 1px solid rgba(74, 158, 255, 0.4);
    color: #4A9EFF;
  `}
`

const CardBody = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  overflow: hidden;
`

const ProjectName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textPrimary};
  font-weight: 600;

  span { color: ${theme.colors.primary}; }
`

const ProjectDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`

const SchemaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`

const SchemaCell = styled.div`
  background: ${theme.colors.bgTertiary};
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.sm};
  padding: 6px 8px;
  font-size: 10px;
  color: ${theme.colors.textMuted};
  text-align: center;

  code {
    color: ${theme.colors.primary};
    display: block;
    margin-top: 2px;
    font-size: 9px;
  }
`

const Highlights = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const HItem = styled.li`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  display: flex;
  gap: 6px;

  &::before { content: '▸'; color: ${theme.colors.primary}; flex-shrink: 0; }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const TechTag = styled.span`
  font-size: ${theme.fontSizes.xs};
  padding: 3px 10px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.15);
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.primary};
`

const CardFooter = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.borderSubtle};
  display: flex;
  gap: ${theme.spacing.sm};
  flex-shrink: 0;
`

const LinkBtn = styled(motion.a)`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid ${theme.colors.bgTertiary};
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transitions.fast};

  &:hover { color: ${theme.colors.primary}; border-color: ${theme.colors.border}; }
`

// ─── Navigation ───────────────────────────────────────────────────────────────

const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`

const NavBtn = styled(motion.button)<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.textSecondary};
  font-family: ${theme.fonts.mono};
  font-size: ${theme.fontSizes.xs};
  letter-spacing: 0.06em;
  transition: all ${theme.transitions.fast};
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};

  &:not(:disabled):hover {
    border-color: ${theme.colors.border};
    color: ${theme.colors.primary};
  }
`

const Dots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const DotBtn = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => $active ? '20px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${({ $active }) => $active ? theme.colors.primary : theme.colors.bgTertiary};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.base};
  box-shadow: ${({ $active }) => $active ? `0 0 8px ${theme.colors.primary}` : 'none'};

  &:hover { background: ${theme.colors.primaryDim}; }
`

const Counter = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.1em;
`

// ─── README Panel ─────────────────────────────────────────────────────────────

const ReadmePanel = styled(motion.div)`
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 600px;

  @media (max-width: ${theme.breakpoints.lg}) {
    height: 500px;
  }
`

const ReadmeTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  background: rgba(45, 45, 45, 0.8);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
  flex-shrink: 0;
`

const ReadmeTitleText = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.08em;
  flex: 1;
`

const ReadmeBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.75;
  color: ${theme.colors.textSecondary};

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: ${theme.colors.bgTertiary}; border-radius: 2px; }

  /* Markdown styles */
  h1, h2, h3 {
    color: ${theme.colors.textPrimary};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
    line-height: 1.3;
    &::before { color: ${theme.colors.primary}; margin-right: 6px; }
  }
  h1 { font-size: ${theme.fontSizes.lg}; &::before { content: '#'; } }
  h2 { font-size: ${theme.fontSizes.md}; &::before { content: '##'; } }
  h3 { font-size: ${theme.fontSizes.base}; &::before { content: '###'; } }

  p { margin: ${theme.spacing.sm} 0; }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }

  code {
    background: ${theme.colors.bgTertiary};
    color: ${theme.colors.primary};
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 0.85em;
  }

  pre {
    background: ${theme.colors.bg};
    border: 1px solid ${theme.colors.borderSubtle};
    border-radius: ${theme.borderRadius.sm};
    padding: ${theme.spacing.md};
    overflow-x: auto;
    margin: ${theme.spacing.md} 0;

    code {
      background: transparent;
      padding: 0;
      color: ${theme.colors.textSecondary};
      font-size: ${theme.fontSizes.xs};
    }
  }

  ul, ol {
    padding-left: ${theme.spacing.lg};
    margin: ${theme.spacing.sm} 0;
  }

  li {
    margin: 3px 0;
    &::marker { color: ${theme.colors.primary}; }
  }

  blockquote {
    border-left: 3px solid ${theme.colors.primary};
    padding-left: ${theme.spacing.md};
    color: ${theme.colors.textMuted};
    margin: ${theme.spacing.sm} 0;
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 1px solid ${theme.colors.borderSubtle};
    margin: ${theme.spacing.md} 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: ${theme.fontSizes.xs};
    margin: ${theme.spacing.md} 0;
  }

  th {
    color: ${theme.colors.primary};
    border-bottom: 1px solid ${theme.colors.border};
    padding: 6px 10px;
    text-align: left;
  }

  td {
    padding: 5px 10px;
    border-bottom: 1px solid ${theme.colors.borderSubtle};
  }

  img { max-width: 100%; border-radius: ${theme.borderRadius.sm}; }
`

// ─── Image Modal ─────────────────────────────────────────────────────────────

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  cursor: zoom-out;
`

const ModalImg = styled(motion.img)`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 255, 136, 0.08);
  cursor: default;
`

const ModalClose = styled(motion.button)`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.bgSecondary};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.textSecondary};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  &:hover { color: ${theme.colors.primary}; border-color: ${theme.colors.primary}; }
`

const ReadmeImgWrapper = styled.span`
  display: block;
  cursor: zoom-in;
  transition: opacity ${theme.transitions.fast};
  &:hover { opacity: 0.85; }
  img { pointer-events: none; }
`

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <ModalClose
          onClick={(e) => { e.stopPropagation(); onClose() }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </ModalClose>
        <ModalImg
          src={src}
          alt={alt}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        />
      </ModalOverlay>
    </AnimatePresence>
  )
}

// ─── Skeleton / Error ─────────────────────────────────────────────────────────

const ReadmeSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
`

const SkeletonLine = styled.div<{ width?: string }>`
  height: 12px;
  width: ${({ width }) => width || '100%'};
  background: linear-gradient(90deg, ${theme.colors.bgSecondary} 25%, ${theme.colors.bgTertiary} 50%, ${theme.colors.bgSecondary} 75%);
  background-size: 200% 100%;
  border-radius: 3px;
  animation: ${shimmer} 1.5s infinite;
`

const ReadmeError = styled.div`
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSizes.sm};

  span { color: ${theme.colors.primary}; display: block; margin-bottom: ${theme.spacing.sm}; }
`

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string
  name: string
  desc: string
  highlights: string[]
  tags: string[]
  status: 'active' | 'wip' | 'planned'
  statusLabel: string
  github: string
  readmeUrl: string
  schema?: { label: string; code: string }[]
}

const PROJECTS: Project[] = [
  {
    id: 'dw-pipeline',
    name: 'DW Pipeline Star Schema',
    desc: 'Pipeline de Engenharia de Dados para modelagem dimensional com Star Schema. Fluxo completo de ETL com tabela Fato e Dimensões.',
    highlights: [
      'Modelagem dimensional com Star Schema',
      'Tabela Fato e múltiplas Dimensões',
      'Pipeline ETL automatizado',
      'Queries SQL otimizadas para analytics',
      'Data Warehouse estruturado',
    ],
    tags: ['Python', 'SQL', 'PostgreSQL', 'ETL', 'Star Schema', 'Data Warehouse'],
    status: 'active',
    statusLabel: 'Ativo',
    github: 'https://github.com/devlucasborba/dw-pipeline-star-schema',
    readmeUrl: 'https://raw.githubusercontent.com/devlucasborba/dw-pipeline-star-schema/master/README.md',
    schema: [
      { label: 'Fato Vendas', code: 'fact_sales' },
      { label: 'Dim Produto', code: 'dim_product' },
      { label: 'Dim Cliente', code: 'dim_customer' },
      { label: 'Dim Tempo', code: 'dim_date' },
    ],
  },
]

// ─── Card z-position variants ─────────────────────────────────────────────────

const getCardStyle = (offset: number) => {
  if (offset === 0) return { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 10, opacity: 1 }
  if (offset === 1) return { x: 14, y: 10, rotate: 2.5, scale: 0.96, zIndex: 6, opacity: 0.75 }
  if (offset === 2) return { x: 26, y: 18, rotate: 5, scale: 0.92, zIndex: 3, opacity: 0.5 }
  return { x: 34, y: 24, rotate: 7, scale: 0.88, zIndex: 1, opacity: 0.3 }
}

// ─── README hook ─────────────────────────────────────────────────────────────

function useReadme(url: string) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setContent(null)
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error()
        return r.text()
      })
      .then(text => { setContent(text); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [url])

  return { content, loading, error }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Projects() {
  const { playHover, playClick } = useSound()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [modalImg, setModalImg] = useState<{ src: string; alt: string } | null>(null)

  const activeProject = PROJECTS[activeIndex]
  const { content: readme, loading: readmeLoading, error: readmeError } = useReadme(activeProject.readmeUrl)

  const goNext = useCallback(() => {
    if (activeIndex >= PROJECTS.length - 1) return
    playClick()
    setDirection(1)
    setActiveIndex(i => i + 1)
  }, [activeIndex, playClick])

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) return
    playClick()
    setDirection(-1)
    setActiveIndex(i => i - 1)
  }, [activeIndex, playClick])

  const goTo = useCallback((i: number) => {
    playClick()
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
  }, [activeIndex, playClick])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotate: dir > 0 ? 8 : -8, scale: 0.9 }),
    center: { x: 0, opacity: 1, rotate: 0, scale: 1, zIndex: 10 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, rotate: dir > 0 ? -12 : 12, scale: 0.85 }),
  }

  return (
    <Section id="projects">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tag>// ls -la ~/projects</Tag>
          <Title>Projetos</Title>
        </SectionHeader>

        <MainGrid>
          {/* ── Left: Card Carousel ── */}
          <CarouselWrapper>
            <StackArea>
              {/* Background shadow cards */}
              {PROJECTS.slice(activeIndex + 1, activeIndex + 3).map((_, i) => {
                const style = getCardStyle(i + 1)
                return (
                  <motion.div
                    key={`shadow-${activeIndex + i + 1}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(26,26,26,0.7)',
                      border: `1px solid ${theme.colors.borderSubtle}`,
                      borderRadius: theme.borderRadius.lg,
                      zIndex: style.zIndex,
                    }}
                    animate={{ x: style.x, y: style.y, rotate: style.rotate, scale: style.scale, opacity: style.opacity }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )
              })}

              {/* Active card */}
              <AnimatePresence custom={direction} mode="popLayout">
                <CardBase
                  key={activeProject.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  onMouseEnter={playHover}
                  style={{ zIndex: 10 }}
                >
                  <CardTitleBar>
                    <Dot color="#FF5F56" />
                    <Dot color="#FFBD2E" />
                    <Dot color="#27C93F" />
                    <CardTitleText>~/projects/{activeProject.id}</CardTitleText>
                    <StatusBadge status={activeProject.status}>● {activeProject.statusLabel}</StatusBadge>
                  </CardTitleBar>

                  <CardBody>
                    <ProjectName>
                      <span>$</span> {activeProject.name}
                    </ProjectName>
                    <ProjectDesc>{activeProject.desc}</ProjectDesc>

                    {activeProject.schema && (
                      <SchemaGrid>
                        {activeProject.schema.map(s => (
                          <SchemaCell key={s.code}>
                            {s.label}<code>{s.code}</code>
                          </SchemaCell>
                        ))}
                      </SchemaGrid>
                    )}

                    <Highlights>
                      {activeProject.highlights.map(h => <HItem key={h}>{h}</HItem>)}
                    </Highlights>

                    <Tags>
                      {activeProject.tags.map(t => <TechTag key={t}>{t}</TechTag>)}
                    </Tags>
                  </CardBody>

                  <CardFooter>
                    <LinkBtn
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      ◈ GitHub
                    </LinkBtn>
                  </CardFooter>
                </CardBase>
              </AnimatePresence>
            </StackArea>

            {/* Navigation */}
            <NavRow>
              <NavBtn
                disabled={activeIndex === 0}
                onClick={goPrev}
                onMouseEnter={playHover}
                whileHover={activeIndex > 0 ? { scale: 1.04 } : {}}
                whileTap={activeIndex > 0 ? { scale: 0.96 } : {}}
              >
                ← prev
              </NavBtn>

              <Dots>
                {PROJECTS.map((_, i) => (
                  <DotBtn
                    key={i}
                    $active={i === activeIndex}
                    onClick={() => goTo(i)}
                    onMouseEnter={playHover}
                    title={PROJECTS[i].name}
                  />
                ))}
              </Dots>

              <Counter>{String(activeIndex + 1).padStart(2, '0')}/{String(PROJECTS.length).padStart(2, '0')}</Counter>

              <NavBtn
                disabled={activeIndex >= PROJECTS.length - 1}
                onClick={goNext}
                onMouseEnter={playHover}
                whileHover={activeIndex < PROJECTS.length - 1 ? { scale: 1.04 } : {}}
                whileTap={activeIndex < PROJECTS.length - 1 ? { scale: 0.96 } : {}}
              >
                next →
              </NavBtn>
            </NavRow>
          </CarouselWrapper>

          {/* ── Right: README Panel ── */}
          <AnimatePresence mode="wait">
            <ReadmePanel
              key={activeProject.id + '-readme'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ReadmeTitleBar>
                <Dot color="#FF5F56" />
                <Dot color="#FFBD2E" />
                <Dot color="#27C93F" />
                <ReadmeTitleText>
                  README.md — {activeProject.name}
                </ReadmeTitleText>
              </ReadmeTitleBar>

              <ReadmeBody>
                {readmeLoading && (
                  <ReadmeSkeleton>
                    <SkeletonLine width="60%" />
                    <SkeletonLine width="90%" />
                    <SkeletonLine width="75%" />
                    <SkeletonLine width="85%" />
                    <SkeletonLine width="50%" />
                    <SkeletonLine width="95%" />
                    <SkeletonLine width="70%" />
                    <SkeletonLine width="80%" />
                  </ReadmeSkeleton>
                )}

                {readmeError && (
                  <ReadmeError>
                    <span>$ cat README.md</span>
                    cat: README.md: No such file or directory
                  </ReadmeError>
                )}

                {!readmeLoading && !readmeError && readme && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      img: ({ src, alt }) => {
                        const rawSrc = src
                          ? src.replace(
                              /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//,
                              'https://raw.githubusercontent.com/$1/$2/'
                            )
                          : src
                        if (!rawSrc) return null
                        return (
                          <ReadmeImgWrapper
                            onClick={() => setModalImg({ src: rawSrc, alt: alt ?? '' })}
                            title="Clique para ampliar"
                          >
                            <img
                              src={rawSrc}
                              alt={alt ?? ''}
                              style={{ maxWidth: '100%', borderRadius: '6px', margin: '8px 0', display: 'block' }}
                            />
                          </ReadmeImgWrapper>
                        )
                      },
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                )}
              </ReadmeBody>
            </ReadmePanel>
          </AnimatePresence>
        </MainGrid>
      </Container>

      {modalImg && (
        <ImageModal
          src={modalImg.src}
          alt={modalImg.alt}
          onClose={() => setModalImg(null)}
        />
      )}
    </Section>
  )
}
