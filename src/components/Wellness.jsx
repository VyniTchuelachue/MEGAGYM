import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

export default function Wellness({ onAsk }) {
  const { t } = useLang();
  return (
    <section id="bien-etre" className="overflow-x-clip bg-noir">
      <div className="wrap grid items-stretch gap-10 lg:grid-cols-[minmax(0,23rem)_minmax(0,1fr)] lg:gap-16">
        <div className="pt-16 lg:py-28">
          <Poster lines={t.wellness.lines} />
          <p className="mt-7 text-lg leading-relaxed">{t.wellness.text}</p>
          <p className="mt-4 border-l-2 border-jaune pl-4 text-white/75">{t.wellness.detail}</p>
          <Button href="#contact" onClick={() => onAsk('hammam')} className="mt-8">
            {t.wellness.cta}
          </Button>
        </div>
        <Photo
          src={images.hammam}
          alt={t.wellness.alt}
          sizes="(min-width: 64rem) 60vw, 100vw"
          className="-mx-5 h-72 w-[calc(100%+2.5rem)] max-w-none object-cover sm:-mx-8 sm:h-96 sm:w-[calc(100%+4rem)] lg:mx-0 lg:h-full lg:w-[calc(100%+max(2rem,(100vw-78rem)/2+2rem))]"
        />
      </div>
    </section>
  );
}
