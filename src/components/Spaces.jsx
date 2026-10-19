import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Photo from './Photo.jsx';

// Where each card crops its photo, so the subject stays in frame.
const focus = {
  musculation: 'object-[25%_50%]',
  cardio: 'object-center',
  cours: 'object-center',
};

export default function Spaces() {
  const { t } = useLang();
  return (
    <section id="espaces" className="surface-light bg-craie pb-16 text-noir lg:pb-24">
      <div className="wrap">
        <h2 className="sr-only">{t.spaces.title}</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {t.spaces.items.map((item) => (
            <li
              key={item.key}
              className="surface-dark relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-noir p-6 text-white sm:aspect-[16/9] md:aspect-[4/5] lg:p-7"
            >
              <Photo
                src={images[item.key]}
                alt={item.alt}
                sizes="(min-width: 48rem) 33vw, 100vw"
                className={`absolute inset-0 -z-20 size-full object-cover ${focus[item.key]}`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-t from-noir from-10% via-noir/55 via-45% to-transparent"
              />
              <h3 className="text-4xl font-extrabold uppercase leading-none [font-stretch:62%]">{item.title}</h3>
              <p className="mt-2 max-w-[23rem] leading-snug text-white/90">{item.text}</p>
              {item.link && (
                <a
                  href={item.link.href}
                  className="condensed mt-4 self-start text-jaune underline-offset-4 hover:underline"
                >
                  {item.link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
