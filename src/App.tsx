import { GlobalStyles } from '@/styles/GlobalStyles'
import { Navigation } from '@/components/Navigation/Navigation'
import { Particles } from '@/components/Particles/Particles'
import { SoundToggle } from '@/components/SoundToggle/SoundToggle'
import { Hero } from '@/components/Hero/Hero'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import { Roadmap } from '@/components/Roadmap/Roadmap'
import { Stack } from '@/components/Stack/Stack'
import { Contact } from '@/components/Contact/Contact'

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Particles />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Roadmap />
        <Stack />
        <Contact />
      </main>
      <SoundToggle />
    </>
  )
}
