import { motion } from 'framer-motion';
import desktopBg from '../assets/images/bg-desktop.jpg';
import mobileBg from '../assets/images/bg-mobile.jpg';

/**
 * Art-directed background.
 * - Landscape / square viewports  -> desktop image (2528x1696)
 * - Portrait viewports            -> mobile image  (1788x2400)
 * The browser downloads only the one it needs, and each image is only ever
 * cropped slightly (object-cover), never stretched.
 */
export default function Background() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <motion.picture
        className="block h-full w-full"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <source media="(min-aspect-ratio: 1/1)" srcSet={desktopBg} />
        <img
          src={mobileBg}
          alt=""
          fetchpriority="high"
          decoding="async"
          // Mobile: keep the plane (top-right) and the town (right) in frame.
          className="h-full w-full object-cover object-[60%_center] md:object-center"
        />
      </motion.picture>

      {/* Soft scrim behind the type so it stays legible on any screen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_35%_at_50%_38%,rgba(6,52,128,0.35),transparent_70%)]" />
    </div>
  );
}
