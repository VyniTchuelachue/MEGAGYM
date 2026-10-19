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
| Which photo goes where | `src/data/images.js` |
| Logo | `src/components/Logo.jsx` |
| All text, in French and English | `src/content/fr.js`, `src/content/en.js` |
| Membership prices and registration fees | `src/data/plans.js` (plan texts are in `src/content/`) |
| Class timetable | `server/data/schedule.json` |
| Colours and type | `src/index.css` |
| Page sections | `src/components/` |

## Photos

The club's photos live as originals in `photos/club/`. To add or replace one, drop the JPEG there and run:

```bash
npm run images
```

This writes 640, 1280 and 1920 px versions to `public/images/club/` and lists them in `src/data/photo-sizes.json`, so phones download the small file. Then use the photo in `src/data/images.js` as `'club/<file name>'`.

## API

| Route | What it does |
| --- | --- |
| `GET /api/schedule` | The class timetable shown in "Planning de la semaine" |
| `POST /api/contact` | Saves a call-back request from the contact form |
| `GET /api/requests` | Lists saved requests. Needs `Authorization: Bearer <ADMIN_TOKEN>`; off until `ADMIN_TOKEN` is set |
| `GET /api/health` | Health check |

Call-back requests are appended to `server/data/requests.json` (not committed) and logged to the server console.

## Before going live

- **Photos** are the club's own, taken from its Ayila'a listing and from press coverage (Cameroon CEO, Actu Cameroun). Ask the club for the originals in full quality. The hammam photo is still a stock image, because no photo of the club's hammam was published.
- **The timetable** in `server/data/schedule.json` is an example. Replace it with the real classes and times.
- **The logo** is redrawn from the club's published logo, with the wordmark set in Poppins. Ask the club for its official SVG and swap it into `src/components/Logo.jsx`.
- Opening hours, phone number and rating come from the club's Google Maps listing; update `src/data/club.js` when they change.
