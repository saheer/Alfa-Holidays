import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENERIC_ERROR = 'Something went wrong. Please try again in a moment.';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');
  const errorId = useId();

  const fail = (msg) => {
    setError(msg);
    setStatus('error');
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'loading') return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) return fail('Enter a valid email address.');

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return fail(data.error || GENERIC_ERROR);
      }
      setStatus('success');
    } catch {
      fail(GENERIC_ERROR);
    }
  }

  return (
    <div className="mt-9 w-full max-w-md md:mt-12">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            role="status"
            className="flex min-h-[5.5rem] flex-col items-center justify-center gap-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-white" fill="none" aria-hidden="true">
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              <motion.path
                d="M7.5 12.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>
            <p className="text-lg font-extrabold tracking-wide">You&rsquo;re on the list.</p>
            <p className="text-sm text-white/80">
              We&rsquo;ll email you the moment Alfa Holidays opens.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="newsletter-email" className="mb-3 block text-sm font-semibold tracking-wide text-white/85">
              Discover our exclusive tour packages and destinations online very soon. Stay tuned!
            </label>

            <div className="flex items-center rounded-full border border-white/30 bg-white/10 p-1.5 backdrop-blur-md transition focus-within:border-white/70 focus-within:ring-2 focus-within:ring-white/25">
              <input
                id="newsletter-email"
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? errorId : undefined}
                disabled={status === 'loading'}
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-base text-white placeholder-white/55 outline-none"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-alfa-deep transition hover:bg-alfa-cyan hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending…' : 'Notify me'}
              </button>
            </div>

            <p
              id={errorId}
              role="alert"
              className="mt-2 min-h-[1.25rem] text-sm text-rose-200"
            >
              {status === 'error' ? error : ''}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
