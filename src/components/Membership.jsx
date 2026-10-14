import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import { icons } from './Icons.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

export default function Membership({ onAsk }) {
  const { t } = useLang();
  return (
    <section id="abonnement" className="surface-light bg-craie text-noir">
      <div className="wrap grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16 lg:py-24">
        <div>
          <Poster lines={t.membership.lines} surface="light" />
          <p className="mt-7 text-lg leading-relaxed">{t.membership.text}</p>
          <Button href="#contact" variant="dark" onClick={() => onAsk('abonnement')} className="mt-8">
            {t.membership.cta}
          </Button>
        </div>

        <div className="surface-dark grid bg-noir text-white sm:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
          <Photo
            src={images.abonnement}
            alt={t.membership.alt}
            sizes="(min-width: 64rem) 35vw, (min-width: 40rem) 55vw, 100vw"
            className="h-64 w-full object-cover object-top sm:h-full sm:min-h-[22rem]"
          />
          <div className="p-7 lg:p-9">
            <h3 className="condensed text-lg text-jaune">{t.membership.includedTitle}</h3>
            <ul className="mt-6 space-y-6">
              {t.membership.included.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li key={item.text} className="flex items-center gap-4">
                    <Icon className="size-8 shrink-0 text-jaune" />
                    <span className="leading-snug">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
