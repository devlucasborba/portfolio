import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.md};
  }
`

const Container = styled.div`
  max-width: 1100px;
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

const TerminalWindow = styled(motion.div)`
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  max-width: 680px;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  background: rgba(45, 45, 45, 0.6);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
`

const Dot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

const TitleText = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.08em;
`

const Body = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  line-height: 2.2;
  font-size: ${theme.fontSizes.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
  }
`

const CmdLine = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.sm};
`

const Prompt = styled.span`
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const ProjectList = styled(motion.ul)`
  list-style: none;
  padding-left: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`

const ProjectItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 4px 0;
  color: ${theme.colors.textPrimary};
  cursor: default;

  &:hover span.name {
    color: ${theme.colors.primary};
    text-shadow: 0 0 8px rgba(0, 255, 136, 0.4);
  }

  span.arrow { color: ${theme.colors.primary}; font-size: 10px; }
  span.num { color: ${theme.colors.textMuted}; font-size: ${theme.fontSizes.xs}; }
`

const CursorBlink = styled.span`
  display: inline-block;
  width: 8px;
  height: 0.9em;
  background: ${theme.colors.primary};
  vertical-align: text-bottom;
  animation: ${blink} 1.1s step-end infinite;
  margin-left: 2px;
`

const upcoming = [
  { name: 'data-lake-house', desc: 'Arquitetura Lakehouse com Delta Lake' },
  { name: 'streaming-pipeline', desc: 'Ingestão em tempo real com Kafka' },
  { name: 'analytics-dashboard', desc: 'Dashboard BI com métricas de negócio' },
  { name: 'customer-360', desc: 'Visão unificada de cliente com CDP' },
  { name: 'dbt-project', desc: 'Transformações SQL com dbt core' },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export function Roadmap() {
  const { playHover } = useSound()

  return (
    <Section id="roadmap">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tag>// upcoming</Tag>
          <Title>Roadmap</Title>
        </SectionHeader>

        <TerminalWindow
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TitleBar>
            <Dot color="#FF5F56" />
            <Dot color="#FFBD2E" />
            <Dot color="#27C93F" />
            <TitleText>roadmap.sh</TitleText>
          </TitleBar>

          <Body>
            <CmdLine>
              <Prompt>$</Prompt>
              <span>ls upcoming-projects/</span>
            </CmdLine>

            <ProjectList
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {upcoming.map((p, i) => (
                <ProjectItem
                  key={p.name}
                  variants={itemVariants}
                  onMouseEnter={playHover}
                >
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="arrow">▸</span>
                  <span className="name">{p.name}</span>
                  <span style={{ color: theme.colors.textMuted, fontSize: theme.fontSizes.xs }}>
                    — {p.desc}
                  </span>
                </ProjectItem>
              ))}
            </ProjectList>

            <CmdLine>
              <Prompt>$</Prompt>
              <CursorBlink />
            </CmdLine>
          </Body>
        </TerminalWindow>
      </Container>
    </Section>
  )
}
