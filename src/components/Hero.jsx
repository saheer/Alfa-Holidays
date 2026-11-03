import { motion } from 'framer-motion';
import Newsletter from './Newsletter.jsx';

const EASE = [0.22, 1, 0.36, 1];

// One orchestrated sequence: sub-header -> heading -> divider lines -> tagline -> newsletter.
const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.5, staggerChildren: 0.28 } },
};

const rise = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE },
  },
};

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

const line = (origin) => ({
  hidden: { scaleX: 0, originX: origin },
  show: { scaleX: 1, originX: origin, transition: { duration: 1.1, ease: EASE } },
});

export default function Hero() {
  return (
    <motion.section
      className="flex flex-1 flex-col items-center justify-center pb-[12svh] pt-6 text-center md:pb-[4svh]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Sub-header: tracking tightens slightly as it fades in */}
      <motion.p
        className="text-[0.8rem] font-extrabold uppercase tracking-[0.4em] text-white sm:text-base md:text-xl md:tracking-[0.45em]"
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.7em' },
          show: {
            opacity: 1,
            letterSpacing: '0.42em',
            transition: { duration: 1.4, ease: EASE },
          },
        }}
      >
        Alfa Holidays
      </motion.p>

      {/* Main heading */}
      <motion.h1
        className="mt-2 whitespace-nowrap text-[10.5vw] font-black uppercase leading-[1.05] tracking-tight drop-shadow-[0_6px_28px_rgba(0,40,110,0.35)] md:mt-3 md:text-[7vw] 2xl:text-[8rem]"
        variants={rise}
      >
        <span className="text-white">Coming </span>
        <motion.span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              'linear-gradient(100deg,#12c6ff 0%,#12c6ff 40%,#b8f0ff 50%,#12c6ff 60%,#12c6ff 100%)',
            backgroundSize: '250% 100%',
          }}
          // A single light sweep across "SOON" after it appears, then it rests.
          initial={{ backgroundPositionX: '100%' }}
          animate={{ backgroundPositionX: '0%' }}
          transition={{ duration: 2.2, delay: 1.9, ease: 'easeInOut' }}
        >
          Soon
        </motion.span>
      </motion.h1>

      {/* Tagline with divider lines */}
      <motion.div
        className="mt-3 flex w-full max-w-[min(92vw,62rem)] items-center justify-center gap-3 md:mt-5 md:gap-6"
        variants={fade}
      >
        <motion.span
          className="h-px flex-1 bg-white/80 md:max-w-[14rem]"
          variants={line('100%')}
        />
        <motion.p
          className="whitespace-nowrap text-[3.6vw] font-semibold italic tracking-[0.08em] text-white sm:text-xl md:text-[2vw] 2xl:text-3xl"
          variants={rise}
        >
          Your journey begins here.
        </motion.p>
        <motion.span
          className="h-px flex-1 bg-white/80 md:max-w-[14rem]"
          variants={line('0%')}
        />
      </motion.div>

      <motion.div className="flex w-full justify-center" variants={fade}>
        <Newsletter />
      </motion.div>
    </motion.section>
  );
}
