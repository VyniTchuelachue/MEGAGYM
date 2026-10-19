import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Photo from './Photo.jsx';

// A strip of unstaged photos from the club itself, so visitors see the real rooms and members.
export default function Gallery() {
  const { t } = useLang();
  return (
    <section aria-labelledby="galerie-titre" className="surface-light bg-craie pb-16 text-noir lg:pb-24">
      <div className="wrap flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 id="galerie-titre" className="text-4xl font-extrabold uppercase leading-none [font-stretch:62%] sm:text-5xl">
          {t.gallery.title}
        </h2>
        <p className="text-noir/70">{t.gallery.text}</p>
      </div>
      <ul className="mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:px-8 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-[max(2rem,calc((100%-78rem)/2+2rem))]">
        {images.gallery.map((src) => (
          <li key={src} className="w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
            <Photo
              src={src}
              alt={t.gallery.alts[src.slice('club/'.length)]}
              sizes="(min-width: 64rem) 17vw, (min-width: 40rem) 40vw, 70vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
