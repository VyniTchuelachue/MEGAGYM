import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import Button from './Button.jsx';
import { icons } from './Icons.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative isolate overflow-hidden bg-noir">
      <Photo
        src={images.hero}
        alt={t.hero.alt}
        eager
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noir/60 sm:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-noir from-20% via-noir/75 via-50% to-noir/10 sm:block"
      />

      <div className="wrap flex min-h-[32rem] flex-col justify-center py-16 sm:min-h-[38rem] lg:min-h-[42rem] lg:py-24">
        <div className="w-full max-w-[29rem]">
          <Poster as="h1" lines={t.hero.lines} animate />
          <p className="mt-6 max-w-[23rem] text-xl leading-snug sm:text-2xl">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#club">{t.hero.primary}</Button>
            <Button href="#abonnement" variant="outline">
              {t.hero.secondary}
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-carbone">
        <ul className="wrap grid gap-y-6 py-7 md:grid-cols-3 md:divide-x md:divide-white/10">
          {t.features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <li key={feature.title} className="flex items-start gap-4 md:px-8 md:first:pl-0 md:last:pr-0">
                <Icon className="mt-0.5 size-9 shrink-0 text-jaune" />
                <p className="text-sm leading-relaxed text-white/75">
                  <strong className="block text-base text-white">{feature.title}</strong>
                  {feature.text}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
