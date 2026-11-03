import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

export default function Logo() {
  return (
    <motion.header
      className="self-start md:self-center"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
    >
      <img
        src={logo}
        alt="Alfa Holidays"
        width="468"
        height="217"
        className="h-auto w-24 drop-shadow-[0_2px_12px_rgba(0,30,90,0.35)] sm:w-28 md:w-36"
      />
    </motion.header>
  );
}
