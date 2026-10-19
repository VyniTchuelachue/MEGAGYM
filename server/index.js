import express from 'express';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { planIds } from '../src/data/plans.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'server', 'data');
const distDir = path.join(root, 'dist');
const requestsFile = path.join(dataDir, 'requests.json');

// `--port=` wins over the PORT variable so `npm run dev` always matches the Vite proxy.
const portFlag = process.argv.find((arg) => arg.startsWith('--port='));
const PORT = Number(portFlag?.split('=')[1] || process.env.PORT) || 5050;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const INTERESTS = ['abonnement', 'cours', 'coaching', 'hammam', 'autre'];

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/schedule', async (req, res, next) => {
  try {
    const schedule = JSON.parse(await readFile(path.join(dataDir, 'schedule.json'), 'utf8'));
    res.set('Cache-Control', 'public, max-age=300');
    res.json({ classes: schedule.classes, sessions: schedule.sessions });
  } catch (err) {
    next(err);
  }
});

// At most 5 requests per 10 minutes from one address.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  return false;
}

const clean = (value, max) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

function validate(body) {
  const errors = {};
  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2) errors.name = 'required';
  if (digits.length < 8 || digits.length > 15) errors.phone = 'invalid';
  const interest = INTERESTS.includes(body.interest) ? body.interest : 'autre';
  return {
    errors,
    value: {
      name,
      phone,
      interest,
      // Only a membership request carries a plan.
      plan: interest === 'abonnement' && planIds.includes(body.plan) ? body.plan : '',
      message: clean(body.message, 1000),
      lang: body.lang === 'en' ? 'en' : 'fr',
    },
  };
}

// Writes are chained so two requests arriving together cannot overwrite each other.
let writes = Promise.resolve();

function saveRequest(entry) {
  const write = writes.then(async () => {
    await mkdir(dataDir, { recursive: true });
    let list = [];
    try {
      list = JSON.parse(await readFile(requestsFile, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    list.push(entry);
    await writeFile(requestsFile, JSON.stringify(list, null, 2));
  });
  writes = write.catch(() => {});
  return write;
}

app.post('/api/contact', async (req, res, next) => {
  try {
    const body = req.body || {};
    // Hidden field that only bots fill in: answer as if it worked, store nothing.
    if (body.website) return res.status(201).json({ ok: true });

    if (rateLimited(req.ip)) return res.status(429).json({ error: 'rate_limited' });

    const { errors, value } = validate(body);
    if (Object.keys(errors).length) return res.status(422).json({ error: 'invalid', fields: errors });

    const entry = { id: randomUUID(), receivedAt: new Date().toISOString(), ...value };
    await saveRequest(entry);
    console.log(`[contact] ${entry.receivedAt} ${entry.name} (${entry.phone}) — ${entry.interest}${entry.plan ? ` (${entry.plan})` : ''}`);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.get('/api/requests', async (req, res, next) => {
  try {
    if (!ADMIN_TOKEN || req.get('authorization') !== `Bearer ${ADMIN_TOKEN}`) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    let list = [];
    try {
      list = JSON.parse(await readFile(requestsFile, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    res.json(list);
  } catch (err) {
    next(err);
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'not_found' });
});

// In production the same server also serves the built React app.
if (existsSync(path.join(distDir, 'index.html'))) {
  app.use('/assets', express.static(path.join(distDir, 'assets'), { immutable: true, maxAge: '1y' }));
  app.use(express.static(distDir, { index: false }));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') {
    return res.status(400).json({ error: 'bad_request' });
  }
  console.error(err);
  res.status(500).json({ error: 'server_error' });
});

app.listen(PORT, () => {
  console.log(`Megagym Fitness — serveur prêt sur http://localhost:${PORT}`);
});
