import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

export default function Logo() {
  return (
    <motion.header
      className="self-center"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
    >
      <img
        src={logo}
        alt="Alfa Holidays"
        width="468"
        height="217"
        className="h-auto w-20 drop-shadow-[0_2px_12px_rgba(0,20,70,0.4)] sm:w-24 md:w-36"
      />
    </motion.header>
  );
}
