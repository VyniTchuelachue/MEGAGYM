import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

export default function About() {
  const { t } = useLang();
  return (
    <section id="club" className="surface-light bg-craie text-noir">
      <div className="wrap py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Poster lines={t.about.lines} surface="light" />
            <p className="mt-7 text-lg leading-relaxed">{t.about.text}</p>
            <Button href="#espaces" variant="dark" className="mt-8">
              {t.about.cta}
            </Button>
          </div>
          <Photo
            src={images.club}
            alt={t.about.alt}
            sizes="(min-width: 64rem) 60vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-3 lg:mt-16">
          {t.about.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse border-t-2 border-noir pt-4">
              <dt className="mt-1">{fact.label}</dt>
              <dd className="text-4xl font-extrabold uppercase [font-stretch:62%] sm:text-5xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
