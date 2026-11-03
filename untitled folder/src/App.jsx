import { MotionConfig } from 'framer-motion';
import Background from './components/Background.jsx';
import Logo from './components/Logo.jsx';
import Hero from './components/Hero.jsx';

export default function App() {
  // reducedMotion="user" turns off transform/layout animations for people
  // who have "reduce motion" enabled in their OS.
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate min-h-[100svh] overflow-hidden">
        <Background />

        <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] md:px-12 md:pt-10">
          <Logo />
          <Hero />
        </div>
      </main>
    </MotionConfig>
  );
}
