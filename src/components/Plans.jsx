import { plans } from '../data/plans.js';
import { useLang } from '../lang.js';
import { formatPrice } from '../lib/format.js';
import Button from './Button.jsx';
import { Check } from './Icons.jsx';
import Poster from './Poster.jsx';

// Each plan sits on its own surface, the same black / white / yellow the
// page sections use, instead of three identical boxes.
const looks = {
  standard: {
    card: 'border-2 border-noir bg-white text-noir',
    muted: 'text-noir/70',
    check: 'text-noir',
    button: 'dark',
  },
  vip: {
    card: 'surface-dark border-2 border-noir bg-noir text-white',
    muted: 'text-white/70',
    check: 'text-jaune',
    button: 'primary',
  },
};

export default function Plans({ onAsk }) {
  const { t, lang } = useLang();
  return (
    <div id="tarifs" className="pb-16 lg:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-t-2 border-noir pt-8">
        <h3 className="text-4xl font-extrabold uppercase leading-none [font-stretch:62%] sm:text-5xl">
          {t.plans.title}
        </h3>
        <p className="max-w-[34rem] leading-relaxed">{t.plans.intro}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const copy = t.plans.items[plan.id];
          const look = looks[plan.id];
          return (
            <article key={plan.id} className={`flex flex-col p-7 lg:p-8 ${look.card}`}>
              <div className="flex items-center justify-between gap-4">
                <h4 className="condensed text-2xl">{copy.name}</h4>
                {copy.badge && (
                  <span className="condensed bg-jaune px-2.5 py-1 text-xs text-noir">{copy.badge}</span>
                )}
              </div>
              <p className={`mt-2 leading-snug ${look.muted}`}>{copy.tagline}</p>

              <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
                <span className="text-6xl font-extrabold leading-none [font-stretch:62%] sm:text-7xl">
                  {formatPrice(plan.price, lang)}
                </span>
                <span className="font-semibold">{t.plans.perMonth}</span>
              </p>
              <p className={`mt-2 text-sm ${look.muted}`}>
                {t.plans.registration(formatPrice(plan.registration, lang))}
              </p>

              <ul className="mt-6 space-y-3 border-t border-current/15 pt-6">
                {copy.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-snug">
                    <Check className={`mt-px size-5 shrink-0 ${look.check}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 lg:mt-auto lg:pt-8">
                <Button
                  href="#contact"
                  variant={look.button}
                  onClick={() => onAsk('abonnement', plan.id)}
                  className="w-full"
                >
                  {copy.cta}
                </Button>
              </div>
            </article>
          );
        })}

        <article className="surface-yellow flex flex-col bg-jaune p-7 text-noir md:col-span-2 lg:col-span-1 lg:p-8">
          <Poster as="h4" lines={t.plans.offer.lines} surface="yellow" className="max-w-[20rem]" />
          <p className="mt-6 text-lg leading-snug">{t.plans.offer.text}</p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Button href="#contact" variant="dark" onClick={() => onAsk('abonnement')} className="w-full md:w-auto lg:w-full">
              {t.plans.offer.cta}
            </Button>
          </div>
        </article>
      </div>

      <p className="mt-5 max-w-[48rem] text-sm text-noir/70">{t.plans.note}</p>
    </div>
  );
}
