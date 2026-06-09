import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

// ─── Animations ──────────────────────────────────────────────────────────────

const pulseDot = keyframes`
  0%, 100% { box-shadow: 0 0 4px ${theme.colors.primary}; }
  50% { box-shadow: 0 0 10px ${theme.colors.primary}; }
`

// ─── Layout ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  position: relative;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${theme.spacing.xl};
  align-items: start;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

// ─── Photo ────────────────────────────────────────────────────────────────────

const PhotoCol = styled(motion.div)`
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 260px;
    margin: 0 auto;
  }
`

const PhotoFrame = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.06), ${theme.shadows.card};
`

const PhotoTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(45, 45, 45, 0.8);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
`

const WinDot = styled.span<{ color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

const WinTitle = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.08em;
`

const PhotoImgWrap = styled.div`
  overflow: hidden;
`

const ProfileImg = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  object-position: center top;
  aspect-ratio: 2/3;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.03);
  }
`

// ─── Right column ─────────────────────────────────────────────────────────────

const ContentCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

// ─── Unified Card ─────────────────────────────────────────────────────────────

const Card = styled.div`
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px ${theme.spacing.md};
  background: rgba(45, 45, 45, 0.7);
  border-bottom: 1px solid ${theme.colors.borderSubtle};
`

const HeaderDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`

const HeaderTitle = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.08em;
`

const CardBody = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

// Profile identity row
const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.borderSubtle};
`

const ProfileInfo = styled.div``

const ProfileName = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textPrimary};
  font-weight: 600;
`

const ProfileRole = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  margin-top: 2px;
`

const AvailableBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};

  span.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${theme.colors.primary};
    display: inline-block;
    animation: ${pulseDot} 2s ease-in-out infinite;
    flex-shrink: 0;
  }
`

// Bio text
const BioText = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.8;

  p + p { margin-top: ${theme.spacing.sm}; }

  strong { color: ${theme.colors.primary}; font-weight: 600; }
`

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.borderSubtle};
`

// Education block
const BlockLabel = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.sm};
`

const EduList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const EduItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};

  span.icon {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

const EduTitle = styled.div`
  color: ${theme.colors.textPrimary};
  font-weight: 500;
`

const EduSub = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.primary};
  margin-top: 1px;
`

// Tech tags
const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const TechTag = styled.span`
  font-size: ${theme.fontSizes.xs};
  padding: 3px 10px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.18);
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.primary};
  letter-spacing: 0.04em;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: rgba(0, 255, 136, 0.12);
    border-color: rgba(0, 255, 136, 0.4);
  }
`

// ─── Timeline ─────────────────────────────────────────────────────────────────

const Timeline = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.base};
  cursor: default;

  &:hover {
    border-color: ${theme.colors.border};
    background: rgba(26, 26, 26, 0.9);
    transform: translateX(3px);
  }
`

const TimelineIcon = styled.div<{ color?: string }>`
  font-size: 1rem;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color || theme.colors.primaryGlow};
  border-radius: ${theme.borderRadius.sm};
  border: 1px solid ${({ color }) => color ? color.replace('0.15', '0.35').replace('0.12', '0.35') : theme.colors.border};
`

const TimelineContent = styled.div``

const TimelineTitle = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textPrimary};
  font-weight: 500;
`

const TimelineSub = styled.div`
  font-size: 10px;
  color: ${theme.colors.textMuted};
  margin-top: 2px;
  line-height: 1.4;
`

// ─── Data ─────────────────────────────────────────────────────────────────────

const education = [
  {
    icon: '🎓',
    title: 'Bacharelado em Engenharia de Software',
    sub: 'Concluído',
  },
  {
    icon: '💻',
    title: 'Técnico em Informática',
    sub: 'Concluído — onde tudo começou',
  },
]

const technologies = [
  'Python', 'SQL', 'PostgreSQL', 'dbt', 'Apache Airflow',
  'Docker', 'Pandas', 'Power BI', 'Git', 'Linux', 'React', 'C#',
]

const journey = [
  { icon: '💻', title: 'Full Stack', sub: 'React + C# — aplicações web robustas', color: 'rgba(74, 158, 255, 0.15)' },
  { icon: '⚙️', title: 'Backend & APIs', sub: 'C# .NET, arquitetura e integração', color: 'rgba(74, 158, 255, 0.15)' },
  { icon: '🔀', title: 'Transição para Dados', sub: 'Migração estratégica para DE', color: 'rgba(255, 122, 0, 0.15)' },
  { icon: '🏗️', title: 'Data Engineering', sub: 'Pipelines ETL, DW, Star Schema', color: 'rgba(0, 255, 136, 0.12)' },
  { icon: '📊', title: 'Analytics Eng.', sub: 'dbt, Data Lakes, métricas de negócio', color: 'rgba(0, 255, 136, 0.12)' },
  { icon: '🚀', title: 'Próximos passos', sub: 'Streaming, Lakehouse, Cloud', color: 'rgba(168, 85, 247, 0.12)' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function About() {
  const { playHover } = useSound()

  return (
    <Section id="about">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tag>// about_me</Tag>
          <Title>Sobre Mim</Title>
        </SectionHeader>

        <Grid>
          {/* ── Photo ── */}
          <PhotoCol
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <PhotoFrame>
              <PhotoTitleBar>
                <WinDot color="#FF5F56" />
                <WinDot color="#FFBD2E" />
                <WinDot color="#27C93F" />
                <WinTitle>profile.jpg</WinTitle>
              </PhotoTitleBar>
              <PhotoImgWrap>
                <ProfileImg src={`${import.meta.env.BASE_URL}images/profile.jpg`} alt="Lucas Borba" />
              </PhotoImgWrap>
            </PhotoFrame>
          </PhotoCol>

          {/* ── Content ── */}
          <ContentCol
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Unified card */}
            <Card>
              <CardHeader>
                <HeaderDot color="#FF5F56" />
                <HeaderDot color="#FFBD2E" />
                <HeaderDot color="#27C93F" />
                <HeaderTitle>profile.sh</HeaderTitle>
              </CardHeader>

              <CardBody>
                {/* Identity */}
                <ProfileRow>
                  <ProfileInfo>
                    <ProfileName>Lucas Borba</ProfileName>
                    <ProfileRole>Data Engineer</ProfileRole>
                    <AvailableBadge>
                      <span className="dot" />
                      disponível para oportunidades
                    </AvailableBadge>
                  </ProfileInfo>
                </ProfileRow>

                {/* Bio */}
                <BioText>
                  <p>
                    Desenvolvedor com background em <strong>Full Stack</strong> — React, TypeScript e C# —
                    que encontrou sua verdadeira paixão na <strong>Engenharia de Dados</strong>.
                  </p>
                  <p>
                    Hoje foco em construir pipelines confiáveis, modelagem dimensional com <strong>Star Schema</strong>
                    {' '}e transformações escaláveis que transformam dados brutos em insights acionáveis.
                  </p>
                </BioText>

                <Divider />

                {/* Education */}
                <div>
                  <BlockLabel>// formação</BlockLabel>
                  <EduList>
                    {education.map((e) => (
                      <EduItem key={e.title}>
                        <span className="icon">{e.icon}</span>
                        <div>
                          <EduTitle>{e.title}</EduTitle>
                          <EduSub>{e.sub}</EduSub>
                        </div>
                      </EduItem>
                    ))}
                  </EduList>
                </div>

                <Divider />

                {/* Technologies */}
                <div>
                  <BlockLabel>// stack</BlockLabel>
                  <TechRow>
                    {technologies.map(t => (
                      <TechTag key={t} onMouseEnter={playHover}>{t}</TechTag>
                    ))}
                  </TechRow>
                </div>
              </CardBody>
            </Card>

            {/* Journey timeline */}
            <Timeline
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {journey.map((item, i) => (
                <TimelineItem
                  key={i}
                  variants={itemVariants}
                  onMouseEnter={playHover}
                >
                  <TimelineIcon color={item.color}>{item.icon}</TimelineIcon>
                  <TimelineContent>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineSub>{item.sub}</TimelineSub>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </ContentCol>
        </Grid>
      </Container>
    </Section>
  )
}
