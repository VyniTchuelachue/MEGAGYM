import { useCallback, useEffect, useState } from 'react';
import { images } from '../data/images.js';
import { useLang } from '../lang.js';
import { clubNow, formatTime } from '../lib/hours.js';
import Button from './Button.jsx';
import Photo from './Photo.jsx';
import Poster from './Poster.jsx';

function Intensity({ level, label }) {
  return (
    <p className="flex items-center gap-3 text-sm text-white/70">
      <span className="max-sm:sr-only">{label}</span>
      <span aria-hidden="true" className="flex items-end gap-1">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            style={{ height: `${0.4 + step * 0.3}rem` }}
            className={`w-1.5 ${step <= level ? 'bg-jaune' : 'bg-white/20'}`}
          />
        ))}
      </span>
    </p>
  );
}

function Planning() {
  const { t, lang } = useLang();
  const today = clubNow().day + 1;
  const [day, setDay] = useState(today);
  const [state, setState] = useState({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    fetch('/api/schedule')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch(() => setState({ status: 'error' }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onTabKey = (event) => {
    const move = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!move) return;
    event.preventDefault();
    const next = ((day - 1 + move + 7) % 7) + 1;
    setDay(next);
    document.getElementById(`planning-tab-${next}`)?.focus();
  };

  const sessions =
    state.status === 'ready'
      ? state.data.sessions
          .filter((session) => session.day === day)
          .sort((a, b) => a.start.localeCompare(b.start))
      : [];

  return (
    <div id="planning" className="bg-carbone">
      <div className="wrap py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h3 className="text-4xl font-extrabold uppercase leading-none [font-stretch:62%] sm:text-5xl">
              {t.planning.title}
            </h3>
            <p className="mt-3 text-white/70">{t.planning.intro}</p>
          </div>

          <div role="tablist" aria-label={t.planning.title} className="flex w-full sm:w-auto">
            {t.days.short.map((label, index) => {
              const value = index + 1;
              const selected = value === day;
              return (
                <button
                  key={label}
                  id={`planning-tab-${value}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="planning-panel"
                  aria-label={value === today ? `${t.days.long[index]}, ${t.planning.today}` : t.days.long[index]}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setDay(value)}
                  onKeyDown={onTabKey}
                  className={`condensed relative flex-1 border-b-2 px-1 py-3 text-base transition-colors -outline-offset-3 sm:min-w-13 sm:flex-none sm:px-3 ${
                    selected ? 'border-jaune text-jaune' : 'border-white/15 text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                  {value === today && (
                    <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-jaune" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="planning-panel"
          role="tabpanel"
          aria-labelledby={`planning-tab-${day}`}
          aria-busy={state.status === 'loading'}
          className="mt-8 min-h-[19rem]"
        >
          {state.status === 'loading' && (
            <div role="status">
              <span className="sr-only">{t.planning.loading}</span>
              {[0, 1, 2].map((row) => (
                <div key={row} className="h-[4.75rem] border-t border-white/10 py-4">
                  <div className="h-full bg-white/5 motion-safe:animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {state.status === 'error' && (
            <div role="alert" className="border-l-4 border-jaune bg-noir p-6">
              <p className="max-w-[36rem] text-lg">{t.planning.error}</p>
              <Button variant="outline" onClick={load} className="mt-5">
                {t.planning.retry}
              </Button>
            </div>
          )}

          {state.status === 'ready' && sessions.length === 0 && (
            <p className="border-t border-white/10 py-6 text-lg text-white/80">{t.planning.empty}</p>
          )}

          {sessions.length > 0 && (
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {sessions.map((session) => {
                const info = state.data.classes[session.class];
                return (
                  <li
                    key={`${session.start}-${session.class}`}
                    className="grid grid-cols-[5.25rem_minmax(0,1fr)_auto] items-center gap-4 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto]"
                  >
                    <time className="text-4xl font-extrabold leading-none text-jaune [font-stretch:62%] sm:text-5xl">
                      {formatTime(session.start, lang)}
                    </time>
                    <p className="text-lg font-semibold leading-tight sm:text-xl">
                      {info.name[lang]}
                      <span className="mt-1 block text-sm font-normal text-white/65">
                        {session.duration} {t.planning.minutes}
                      </span>
                    </p>
                    <Intensity level={info.intensity} label={t.planning.intensity[info.intensity - 1]} />
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Classes() {
  const { t } = useLang();
  return (
    <section id="cours" className="bg-noir">
      <div className="relative isolate overflow-hidden">
        <Photo
          src={images.seance}
          alt={t.classes.alt}
          className="absolute inset-0 -z-20 size-full object-cover object-[60%_30%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noir/65 sm:hidden" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 hidden bg-linear-to-r from-noir from-15% via-noir/80 via-45% to-noir/15 sm:block"
        />
        <div className="wrap py-20 lg:py-28">
          <div className="w-full max-w-[27rem]">
            <Poster lines={t.classes.lines} />
            <p className="mt-6 text-lg leading-snug sm:text-xl">{t.classes.sub}</p>
            <Button href="#planning" className="mt-8">
              {t.classes.cta}
            </Button>
          </div>
        </div>
      </div>
      <Planning />
    </section>
  );
}
