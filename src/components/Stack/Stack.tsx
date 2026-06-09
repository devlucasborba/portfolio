import styled from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  background: linear-gradient(180deg, transparent, rgba(0, 255, 136, 0.015), transparent);

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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const SkillCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.7);
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  cursor: default;
  transition: all ${theme.transitions.base};

  &:hover {
    border-color: ${theme.colors.border};
    background: rgba(26, 26, 26, 0.95);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.card};
  }
`

const SkillIcon = styled.div<{ color: string }>`
  width: 38px;
  height: 38px;
  border-radius: ${theme.borderRadius.sm};
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`

const SkillInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const SkillName = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SkillCmd = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  margin-top: 1px;
`

const LevelBar = styled.div<{ level: number; color: string }>`
  height: 2px;
  background: ${theme.colors.bgTertiary};
  border-radius: 1px;
  margin-top: 6px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ level }) => level}%;
    background: ${({ color }) => color};
    border-radius: 1px;
    transition: width 0.6s ease;
  }
`

// ─── Data ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string
  cmd: string
  icon: string
  level: number
  color: string
  bgColor: string
}

const SKILLS: Skill[] = [
  { name: 'Python', cmd: 'python --version', icon: '🐍', level: 80, color: theme.colors.primary, bgColor: theme.colors.primaryGlow },
  { name: 'SQL', cmd: 'sql --query', icon: '🗄️', level: 85, color: theme.colors.primary, bgColor: theme.colors.primaryGlow },
  { name: 'PostgreSQL', cmd: 'psql --connect', icon: '🐘', level: 75, color: theme.colors.blue, bgColor: theme.colors.blueDim },
  { name: 'Docker', cmd: 'docker ps', icon: '🐳', level: 65, color: theme.colors.blue, bgColor: theme.colors.blueDim },
  { name: 'Apache Airflow', cmd: 'airflow dags list', icon: '🌪️', level: 60, color: theme.colors.orange, bgColor: theme.colors.orangeDim },
  { name: 'dbt', cmd: 'dbt run', icon: '🔧', level: 65, color: theme.colors.orange, bgColor: theme.colors.orangeDim },
  { name: 'Power BI', cmd: 'powerbi --report', icon: '📊', level: 70, color: '#F2C80F', bgColor: 'rgba(242, 200, 15, 0.12)' },
  { name: 'Git', cmd: 'git status', icon: '🌿', level: 85, color: theme.colors.orange, bgColor: theme.colors.orangeDim },
  { name: 'Linux', cmd: 'uname -a', icon: '🐧', level: 75, color: theme.colors.primary, bgColor: theme.colors.primaryGlow },
  { name: 'Pandas', cmd: 'import pandas', icon: '🐼', level: 80, color: theme.colors.primary, bgColor: theme.colors.primaryGlow },
  { name: 'React', cmd: 'npx create-react-app', icon: '⚛️', level: 80, color: theme.colors.blue, bgColor: theme.colors.blueDim },
  { name: 'C#', cmd: 'dotnet run', icon: '💜', level: 75, color: '#A855F7', bgColor: 'rgba(168, 85, 247, 0.12)' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export function Stack() {
  const { playHover } = useSound()

  return (
    <Section id="stack">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tag>// cat stack.json</Tag>
          <Title>Stack Tecnológica</Title>
        </SectionHeader>

        <Grid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SKILLS.map(skill => (
            <SkillCard
              key={skill.name}
              variants={itemVariants}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.02 }}
            >
              <SkillIcon color={skill.bgColor}>{skill.icon}</SkillIcon>
              <SkillInfo>
                <SkillName>{skill.name}</SkillName>
                <SkillCmd>{skill.cmd}</SkillCmd>
                <LevelBar level={skill.level} color={skill.color} />
              </SkillInfo>
            </SkillCard>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
