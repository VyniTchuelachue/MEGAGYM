import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

export default function Coaching({ onAsk }) {
  const { t } = useLang();
  return (
    <section id="coaching" className="surface-light bg-white text-noir">
      <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16 lg:py-24">
        <Photo
          src={images.coaching}
          alt={t.coaching.alt}
          sizes="(min-width: 64rem) 60vw, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />
        <div>
          <Poster lines={t.coaching.lines} surface="light" />
          <p className="mt-7 text-lg leading-relaxed">{t.coaching.text}</p>
          <Button href="#contact" variant="dark" onClick={() => onAsk('coaching')} className="mt-8">
            {t.coaching.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
