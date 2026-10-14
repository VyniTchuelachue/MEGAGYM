import { club } from '../data/club.js';
import { useLang } from '../lang.js';
import { formatTime, useClubStatus } from '../lib/hours.js';
import Button from './Button.jsx';
import { OpenStatus } from './ClubLinks.jsx';
import Poster from './Poster.jsx';

export default function Location() {
  const { t, lang } = useLang();
  const { day } = useClubStatus();
  return (
    <section id="acces" className="surface-light bg-white text-noir">
      <div className="wrap grid gap-10 py-16 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-16 lg:py-24">
        <div>
          <Poster lines={t.location.lines} surface="light" />
          <p className="mt-7 text-lg leading-relaxed">{t.location.text}</p>

          <div className="mt-9 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="condensed text-xl">{t.location.hoursTitle}</h3>
            <OpenStatus className="text-sm" />
          </div>
          <table className="mt-3 w-full border-t-2 border-noir">
            <tbody>
              {t.location.hours.map((row) => {
                const { open, close } = club.hours[row.days[0]];
                const today = row.days.includes(day);
                return (
                  <tr key={row.label} className={`border-b border-noir/15 ${today ? 'bg-jaune font-bold' : ''}`}>
                    <th scope="row" className="px-3 py-3 text-left font-[inherit]">
                      {row.label}
                    </th>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {t.location.range(formatTime(open, lang), formatTime(close, lang))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button href={club.mapsUrl} target="_blank" rel="noreferrer" variant="dark" className="mt-8">
            {t.location.cta}
          </Button>
        </div>

        <iframe
          src={club.mapsEmbed}
          title={t.location.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full border-0 grayscale lg:h-full lg:min-h-[30rem]"
        />
      </div>
    </section>
  );
}
