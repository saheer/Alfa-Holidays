// Minimal Node/Express server:
//  - serves the production build (dist/) with an SPA fallback
//  - exposes an optional POST /api/subscribe endpoint (stores emails in a JSON file)
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');
const dataFile = path.join(__dirname, 'subscribers.json');

const app = express();
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/subscribe', (req, res) => {
  const email = String(req.body?.email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  const list = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile, 'utf8')) : [];
  if (!list.includes(email)) {
    list.push(email);
    fs.writeFileSync(dataFile, JSON.stringify(list, null, 2));
  }
  res.json({ ok: true });
});

app.use(express.static(dist, { maxAge: '7d', index: false }));
app.get('*', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(dist, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Alfa Holidays running on http://localhost:${port}`));
