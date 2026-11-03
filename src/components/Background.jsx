import { motion } from 'framer-motion';
import desktopBg from '../assets/images/bg-desktop.jpg';
import mobileBg from '../assets/images/bg-mobile.jpg';

/**
 * Responsive CSS background.
 * - Portrait viewports  -> mobile image
 * - Landscape viewports -> desktop image (Tailwind's `landscape:` variant)
 * Both URLs are passed as CSS variables, so the browser only downloads the
 * image that actually applies.
 */
export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#04193d]" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-cover bg-no-repeat bg-[position:90%_center] bg-[image:var(--bg-mobile)] landscape:bg-center landscape:bg-[image:var(--bg-desktop)]"
        style={{
          '--bg-mobile': `url(${mobileBg})`,
          '--bg-desktop': `url(${desktopBg})`,
        }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dark luxury gradient: deep navy at the edges, lighter through the middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030f27]/75 via-[#05204d]/30 to-[#030f27]/60" />
      {/* Extra scrim directly behind the type block */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_42%,rgba(3,15,39,0.55),transparent_75%)]" />
    </div>
  );
}
