import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import { useSound } from '@/hooks/useSound'

const navLinks = [
  { label: 'home', href: '#hero' },
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'stack', href: '#stack' },
  { label: 'contact', href: '#contact' },
]

const Nav = styled(motion.nav)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 ${theme.spacing.xl};
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all ${theme.transitions.base};

  ${({ $scrolled }) => $scrolled && css`
    background: rgba(11, 11, 11, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${theme.colors.border};
  `}

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
  }
`

const Logo = styled.a`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.primary};
  font-weight: 600;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  span.prompt {
    color: ${theme.colors.textMuted};
  }

  &:hover {
    color: ${theme.colors.primary};
    text-shadow: 0 0 12px ${theme.colors.primary};
  }
`

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  list-style: none;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const NavLink = styled.a`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  letter-spacing: 0.08em;
  position: relative;
  padding: 4px 0;
  transition: color ${theme.transitions.fast};

  &::before {
    content: './';
    color: ${theme.colors.primary};
    opacity: 0;
    transition: opacity ${theme.transitions.fast};
    margin-right: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${theme.colors.primary};
    transition: width ${theme.transitions.base};
    box-shadow: 0 0 6px ${theme.colors.primary};
  }

  &:hover {
    color: ${theme.colors.primary};
    &::before { opacity: 1; }
    &::after { width: 100%; }
  }
`

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${theme.colors.textSecondary};
    transition: all ${theme.transitions.base};
  }

  &:hover span {
    background: ${theme.colors.primary};
  }
`

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(11, 11, 11, 0.97);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const MobileLink = styled.a`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.md};
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.borderSubtle};
  transition: color ${theme.transitions.fast};

  &::before { content: '$ '; color: ${theme.colors.primary}; }

  &:hover { color: ${theme.colors.primary}; }
`

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { playHover, playClick } = useSound()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    playClick()
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav
        $scrolled={scrolled}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Logo href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>
          <span className="prompt">~</span>
          <span>/lucas-borba</span>
        </Logo>

        <Links>
          {navLinks.map(link => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                onMouseEnter={playHover}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </Links>

        <Hamburger
          onClick={() => { setMobileOpen(o => !o); playClick() }}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </Hamburger>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map(link => (
              <MobileLink
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </MobileLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}
