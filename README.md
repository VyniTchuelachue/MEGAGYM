# Megagym Fitness — website

Website for Megagym Fitness (B'ssadi Galleries, Bonamoussadi, Douala).
React 19 + Tailwind CSS 4 (built with Vite) on the front, Node.js + Express on the back. French by default, with an English version.

## Run it

```bash
npm install
npm run dev
```

The site opens on http://localhost:5173. The API runs on http://localhost:5050 and Vite forwards `/api` to it.

For production, build the site and let the Node server serve everything on one port:

```bash
npm run build
npm start
```

`npm start` listens on `PORT` (5050 if unset). Copy `.env.example` to `.env` to set it.

## Where things are

| To change | Edit |
| --- | --- |
| Phone, WhatsApp, social links, map, opening hours | `src/data/club.js` |
| Photos | `src/data/images.js` |
| All text, in French and English | `src/content/fr.js`, `src/content/en.js` |
| Class timetable | `server/data/schedule.json` |
| Colours and type | `src/index.css` |
| Page sections | `src/components/` |

## API

| Route | What it does |
| --- | --- |
| `GET /api/schedule` | The class timetable shown in "Planning de la semaine" |
| `POST /api/contact` | Saves a call-back request from the contact form |
| `GET /api/requests` | Lists saved requests. Needs `Authorization: Bearer <ADMIN_TOKEN>`; off until `ADMIN_TOKEN` is set |
| `GET /api/health` | Health check |

Call-back requests are appended to `server/data/requests.json` (not committed) and logged to the server console.

## Before going live

- **Photos** are free stock images from Unsplash. Put the club's own photos in `public/images/` and point `src/data/images.js` at them (for example `hero: '/images/hero.jpg'`).
- **The timetable** in `server/data/schedule.json` is an example. Replace it with the real classes and times.
- **The logo** is set in type (`src/components/Logo.jsx`). Swap in the club's logo file when you have it.
- Opening hours, phone number and rating come from the club's Google Maps listing; update `src/data/club.js` when they change.
