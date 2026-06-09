import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

const Section = styled.section`
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl} ${theme.spacing['2xl']};

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
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const TerminalWindow = styled(motion.div)`
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
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
  padding: ${theme.spacing.xl};
  line-height: 2;
  font-size: ${theme.fontSizes.sm};

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`

const CmdLine = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
`

const Prompt = styled.span`
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: 10px ${theme.spacing.md};
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  transition: all ${theme.transitions.base};
  text-decoration: none;

  &:hover {
    border-color: ${theme.colors.border};
    background: rgba(0, 255, 136, 0.03);
    transform: translateX(4px);
  }
`

const ContactIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
`

const ContactLabel = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  display: block;
`

const ContactValue = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  display: block;
`

const CursorBlink = styled.span`
  display: inline-block;
  width: 8px;
  height: 0.9em;
  background: ${theme.colors.primary};
  vertical-align: text-bottom;
  animation: ${blink} 1.1s step-end infinite;
`

const CTAPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const CTACard = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: rgba(26, 26, 26, 0.6);
  border: 1px solid ${theme.colors.borderSubtle};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.base};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.border};
    background: rgba(26, 26, 26, 0.9);
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.08);
  }
`

const CTAIcon = styled.div<{ color?: string }>`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.sm};
  background: ${({ color }) => color || theme.colors.primaryGlow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
`

const CTAContent = styled.div``

const CTATitle = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textPrimary};
  font-weight: 500;
`

const CTASub = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  margin-top: 2px;
`

const Footer = styled.div`
  text-align: center;
  margin-top: ${theme.spacing['2xl']};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.borderSubtle};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};

  span { color: ${theme.colors.primary}; }
`

const contacts = [
  { label: 'email', value: 'devlucasborba@gmail.com', href: 'mailto:devlucasborba@gmail.com', icon: '✉️' },
  { label: 'github', value: 'github.com/devlucasborba', href: 'https://github.com/devlucasborba', icon: '◈' },
  { label: 'linkedin', value: 'linkedin.com/in/devlucasborba', href: 'https://www.linkedin.com/in/devlucasborba', icon: '◇' },
]

const ctas = [
  {
    icon: '📄',
    title: 'Download CV',
    sub: 'Currículo em PDF atualizado',
    href: 'https://raw.githubusercontent.com/devlucasborba/resume/main/cv_br_lucas_borba.pdf',
    color: theme.colors.primaryGlow,
  },
  {
    icon: '💼',
    title: 'Oportunidades',
    sub: 'Aberto a posições de Data Engineer',
    href: 'mailto:devlucasborba@gmail.com',
    color: theme.colors.orangeDim,
  },
  {
    icon: '🤝',
    title: 'Colaboração',
    sub: 'Projetos open source e freelance',
    href: 'mailto:devlucasborba@gmail.com',
    color: theme.colors.blueDim,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
}

export function Contact() {
  const { playHover, playClick } = useSound()

  return (
    <Section id="contact">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tag>// contact --info</Tag>
          <Title>Contato</Title>
        </SectionHeader>

        <Grid>
          <TerminalWindow
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TitleBar>
              <Dot color="#FF5F56" />
              <Dot color="#FFBD2E" />
              <Dot color="#27C93F" />
              <TitleText>contact.sh</TitleText>
            </TitleBar>
            <Body>
              <CmdLine>
                <Prompt>$</Prompt>
                <span>contact --list</span>
              </CmdLine>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {contacts.map(c => (
                  <ContactItem
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    variants={itemVariants}
                    onMouseEnter={playHover}
                    onClick={playClick}
                    whileHover={{ x: 4 }}
                  >
                    <ContactIcon>{c.icon}</ContactIcon>
                    <div>
                      <ContactLabel>{c.label}:</ContactLabel>
                      <ContactValue>{c.value}</ContactValue>
                    </div>
                  </ContactItem>
                ))}
              </motion.div>

              <CmdLine style={{ marginTop: theme.spacing.md, marginBottom: 0 }}>
                <Prompt>$</Prompt>
                <CursorBlink />
              </CmdLine>
            </Body>
          </TerminalWindow>

          <CTAPanel
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {ctas.map((cta, i) => (
              <CTACard
                key={i}
                href={cta.href}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={playHover}
                onClick={playClick}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <CTAIcon color={cta.color}>{cta.icon}</CTAIcon>
                <CTAContent>
                  <CTATitle>{cta.title}</CTATitle>
                  <CTASub>{cta.sub}</CTASub>
                </CTAContent>
              </CTACard>
            ))}
          </CTAPanel>
        </Grid>

        <Footer>
          <p>
            Feito com <span>♥</span> por Lucas Borba — {new Date().getFullYear()}
          </p>
          <p style={{ marginTop: '4px' }}>
            <span>$</span> echo &quot;Powered by React + TypeScript + passion for data&quot;
          </p>
        </Footer>
      </Container>
    </Section>
  )
}
